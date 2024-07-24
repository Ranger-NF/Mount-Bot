import { Args, Command } from '@sapphire/framework';
import { Message } from "discord.js";

export default class EmojifyCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: 'emojify',
			description: 'Turns characters to emojis',
		});
	}

	registerApplicationCommands(registry) {
		registry.registerChatInputCommand((builder) =>
			builder
			.setName(this.name)
			.setDescription(this.description)
		);
	}

	async messageRun(message: Message, args: Args) {
		let emojis: string[] = [];
		let wordToEmojify: string | null = args.next()

		while (wordToEmojify!= null) {
	
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
				9: "nine"
			}

			for (const character of wordToEmojify) {
				const smallCharacter = character.toLowerCase()

				if (smallCharacter.match(letterOrNum) || smallCharacter == ' ') {

					if (!Number.isNaN(Number(smallCharacter)) && smallCharacter !== ' ') {
						let emojiNumber = writtenNumber[smallCharacter];
						emojis.push(`:${emojiNumber}:`)
					} else {
						let discordEmoji = `:regional_indicator_${smallCharacter}:`
		
						if (discordEmoji === `:regional_indicator_ :`) {
							emojis.push(' ')
						} else {
							emojis.push(discordEmoji);
						}	
					}
				}  else {
					message.channel.send(`\`${smallCharacter}\` cannot be turned in to an emoji!`)
				}
			}
	
			emojis.push(' ')

			wordToEmojify = args.next()
		}

		message.channel.send(emojis.join(' '));
	}
}
