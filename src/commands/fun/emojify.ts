import { Args, Command } from '@sapphire/framework';
import { Message } from "discord.js";

export default class EmojifyCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: 'emojify',
			group: 'fun',
			memberName: 'emojify',
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
		
		while (args.next() != null) {
			let argsAsString = await args.pick('string');

			let fullSentence = argsAsString.split(' ');
			console.log(fullSentence)
	
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
			for (const word of fullSentence) {
				for (const character of word) {
					const smallCharacter = character.toLowerCase()
	
					if (smallCharacter.match(letterOrNum) || smallCharacter == ' ') {
						if (!isNaN(smallCharacter) && smallCharacter !== ' ') {
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
			}
			message.channel.send(emojis.join(' '));
		}
	}

	// async chatInputRun(interaction) {

	// 	let emojis = [];
	// 	let argsAsString = await args.pick('string');

	// 	let fullSentence = argsAsString.split(' ');

	// 	// Regex for finding alphanumeric characters
	// 	const letterOrNum = /^[0-9a-zA-Z]+$/;
	// 	const writtenNumber = {
	// 		0: "zero",
	// 		1: "one",
	// 		2: "two",
	// 		3: "three",
	// 		4: "four",
	// 		5: "five",
	// 		6: "six",
	// 		7: "seven",
	// 		8: "eight",
	// 		9: "nine"
	// 	}
	// 	for (const word of fullSentence) {
	// 		for (const character of word) {
	// 			const smallCharacter = character.toLowerCase()

	// 			if (smallCharacter.match(letterOrNum) || smallCharacter == ' ') {
	// 				if (!isNaN(smallCharacter) && smallCharacter !== ' ') {
	// 					let emojiNumber = writtenNumber[smallCharacter];
	// 					emojis.push(`:${emojiNumber}:`)
	// 				} else {
	// 					let discordEmoji = `:regional_indicator_${smallCharacter}:`
		
	// 					if (discordEmoji === `:regional_indicator_ :`) {
	// 						emojis.push(' ')
	// 					} else {
	// 						emojis.push(discordEmoji);
	// 					}	
	// 				}
	// 			}  else {
	// 				message.channel.send(`\`${smallCharacter}\` cannot be turned in to an emoji!`)
	// 			}
	// 		}

	// 		emojis.push(' ')
	// 	}
	// 	message.channel.send(emojis.join(' '));

	// }
}