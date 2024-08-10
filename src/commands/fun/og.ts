import { ApplicationCommandRegistry, Args, Command } from "@sapphire/framework";
import {
  EmbedBuilder,
  AttachmentBuilder,
  Message,
  GuildMember,
  Colors,
  Options,
  User,
  APIInteractionGuildMember,
} from "discord.js";
import { convertTime } from "../../helpers/math.js";
import { read } from "jimp";
import { SlashCommandBuilder } from "discord.js";
import { ChatInputCommandInteraction } from "discord.js";

type EnumDictionary<KeyType extends number, Value> = {
  [Key in KeyType]: Value;
};

enum MemberType {
  EarlyComer,
  LateComer,
}

export default class ogCommand extends Command {
  constructor(context: Command.LoaderContext, options: Options) {
    super(context, {
      ...options,
      name: "og",
      description: "Shows off whose more og",
    });
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand((builder: SlashCommandBuilder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The target you want to compete with")
            .setRequired(true),
        ),
    );
  }

  evaluateMembers(
    firstMember: GuildMember | APIInteractionGuildMember,
    secondMember: GuildMember | APIInteractionGuildMember,
  ): EnumDictionary<MemberType, GuildMember | APIInteractionGuildMember> {
    const joiningTimeOfFirst: number = firstMember.joinedTimestamp!;
    const joiningTimeOfSecond: number = secondMember.joinedTimestamp!;

    if (joiningTimeOfFirst < joiningTimeOfSecond) {
      return {
        [MemberType.EarlyComer]: firstMember,
        [MemberType.LateComer]: secondMember,
      };
    } else {
      return {
        [MemberType.EarlyComer]: secondMember,
        [MemberType.LateComer]: firstMember,
      };
    }
  }

  findTimeDifference(
    earlyComer: GuildMember | APIInteractionGuildMember,
    lateComer: GuildMember | APIInteractionGuildMember,
  ): number {
    return lateComer.joinedTimestamp! - earlyComer.joinedTimestamp!;
  }

  async buildEmbed(
    differentiatedMembers: EnumDictionary<
      MemberType,
      GuildMember | APIInteractionGuildMember
    >,
    joinTimeDifference: number,
  ): Promise<{
    embeds: [EmbedBuilder];
    files: [AttachmentBuilder];
  }> {
    const earlyComer: GuildMember | APIInteractionGuildMember =
      differentiatedMembers[MemberType.EarlyComer];
    const lateComer: GuildMember | APIInteractionGuildMember =
      differentiatedMembers[MemberType.LateComer];

    const formattedTime = convertTime(joinTimeDifference);
    const formattedJoinTimeDifference = `${formattedTime.days} days and ${formattedTime.hours} hours!`;

    const avatar = earlyComer.user.avatar!;
    const background = await read(
      `https://cdn.discordapp.com/avatars/${earlyComer.user.id}/${avatar}.png`,
    );
    let greyscale_bg = background.grayscale();
    const blackNWhite = greyscale_bg.contrast(0);

    const crown = await read("src/overlays/og_badge.png");
    blackNWhite.composite(crown, 0, 0);
    blackNWhite.write("src/manipulated/og.png");

    const attachment = new AttachmentBuilder("src/manipulated/og.png");

    let ogEmbed = new EmbedBuilder()
      .setColor(Colors.White)
      .setTitle("OG scale")
      .setDescription(
        `${earlyComer.user.username} is cooler than ${lateComer.user.username}`,
      )
      .addFields([
        {
          name: `They have a difference of more than ${formattedJoinTimeDifference}!`,
          value: "\u200B",
        },
      ])
      .setImage("attachment://og.png");

    return {
      embeds: [ogEmbed],
      files: [attachment],
    };
  }

  async prepareOgEmbed(
    firstMember: GuildMember | APIInteractionGuildMember,
    secondMember: GuildMember | APIInteractionGuildMember,
  ): Promise<{
    embeds: [EmbedBuilder];
    files: [AttachmentBuilder];
  }> {
    const categorisedMembers = this.evaluateMembers(firstMember, secondMember);
    const timeDifference = this.findTimeDifference(
      categorisedMembers[MemberType.EarlyComer],
      categorisedMembers[MemberType.LateComer],
    );

    const ogContent = await this.buildEmbed(categorisedMembers, timeDifference);
    return ogContent;
  }

  async chatInputRun(interaction: ChatInputCommandInteraction) {
    const targetUser: User = interaction.options.getUser("target", true);

    const targetGuildMember: GuildMember | undefined =
      await interaction.guild?.members.fetch({
        user: targetUser,
      });

    if (!targetGuildMember) {
      interaction.reply({
        content: "No such user",
      });

      return;
    }

    const contentToSend = await this.prepareOgEmbed(
      interaction.member!,
      targetGuildMember,
    );

    interaction.reply(contentToSend);
  }

  async messageRun(message: Message, args: Args) {
    let member1: GuildMember = message.member!;
    let member2: GuildMember;

    if (message.mentions.members == null) {
      message.channel.send("Try mentioning a user next time");
      return;
    }

    member2 = message.mentions.members.last()!; // TODO: Change it to pick the correct mention (as currently the bot is invoked by mentioning it)

    const contentToSend = await this.prepareOgEmbed(member1, member2);

    message.channel.send(contentToSend);
  }
}
