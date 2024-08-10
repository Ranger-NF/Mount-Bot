import {
  ApplicationCommandRegistry,
  Args,
  Command,
  CommandOptions,
} from "@sapphire/framework";
import { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { EmbedBuilder, Message } from "discord.js";
import "dotenv/config";

export default class HelpCommand extends Command {
  constructor(
    context: Command.LoaderContext,
    options: CommandOptions | undefined,
  ) {
    super(context, {
      ...options,
      name: "help",
      description: "A descriptive help command",
    });
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand((builder: SlashCommandBuilder) =>
      builder.setName(this.name).setDescription(this.description),
    );
  }

  prepareHelpEmbed(): EmbedBuilder {
    let commands = [
      ["help", "A descriptive help command"],
      ["emojify", "Turns characters to emojis"],
      ["og", "Shows off whose more og"],
    ];

    let commandsInfo: { name: string; value: string }[] = [];

    for (let command of commands) {
      commandsInfo.push({ name: command[0], value: command[1] });
    }

    const helpEmbed = new EmbedBuilder()
      .setTitle("Help")
      .setDescription(
        `\`Usage: ${process.env.PREFIX} <command> <input(s)>\`\nCommands available:`,
      )
      .addFields(commandsInfo)
      .setThumbnail(this.container.client.user!.avatarURL())
      .setColor("#22770F");

    return helpEmbed;
  }

  chatInputRun(interaction: ChatInputCommandInteraction) {
    const embed = this.prepareHelpEmbed();
    interaction.reply({ embeds: [embed] });
  }

  messageRun(message: Message, args: Args) {
    const embed = this.prepareHelpEmbed();
    message.channel.send({ embeds: [embed] });
  }
}
