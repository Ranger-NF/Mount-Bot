import { ApplicationCommandRegistry, Args, Command } from "@sapphire/framework";
import {
  ChatInputCommandInteraction,
  Message,
  Options,
  SlashCommandBuilder,
} from "discord.js";

export default class EmojifyCommand extends Command {
  constructor(context: Command.LoaderContext, options: Options) {
    super(context, {
      ...options,
      name: "emojify",
      description: "Turns characters to emojis",
    });
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand((builder: SlashCommandBuilder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((option) =>
          option
            .setName("sentence")
            .setDescription("The sentence to emojify")
            .setRequired(true),
        ),
    );
  }

  emojify(sentence: String[]): string {
    let emojis: string[] = [];

    for (let wordToEmojify of sentence) {
      // Regex for finding alphanumeric characters
      const letterOrNum = /^[0-9a-zA-Z]+$/;
      const writtenNumber = {
        0: "zero",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
      };

      for (const character of wordToEmojify) {
        const smallCharacter = character.toLowerCase();

        if (smallCharacter.match(letterOrNum) || smallCharacter == " ") {
          if (!Number.isNaN(Number(smallCharacter)) && smallCharacter !== " ") {
            let emojiNumber = writtenNumber[smallCharacter];
            emojis.push(`:${emojiNumber}:`);
          } else {
            let discordEmoji = `:regional_indicator_${smallCharacter}:`;

            if (discordEmoji === `:regional_indicator_ :`) {
              emojis.push(" ");
            } else {
              emojis.push(discordEmoji);
            }
          }
        } else {
          return `\`${smallCharacter}\` cannot be turned in to an emoji!`;
        }
      }

      emojis.push(" ");
    }

    return emojis.join(" ");
  }

  chatInputRun(interaction: ChatInputCommandInteraction) {
    const sentenceToEmojify: string = interaction.options.getString(
      "sentence",
      true,
    );
    const emojifiedSentence: string = this.emojify(
      sentenceToEmojify.split(" "),
    );

    interaction.reply({
      content: emojifiedSentence,
    });
  }

  async messageRun(message: Message, args: Args) {
    let sentenceToEmojify: string[] = [];
    let wordToEmojify: string | null = args.next();

    while (wordToEmojify != null) {
      sentenceToEmojify.push(wordToEmojify);
      wordToEmojify = args.next();
    }

    let emojifiedSentence = this.emojify(sentenceToEmojify);

    message.channel.send(emojifiedSentence);
  }
}
