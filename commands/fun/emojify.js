const { Command } = require('discord.js-commando');

module.exports = class EmojifyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'emojify',
			group: 'fun',
			memberName: 'emojify',
			description: 'Turns characters to emojis',
		});
	}
	run(message, args) {
	let emojis = [];
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
	for (const word of args) {
		for (const characters of word) {
			const smallCharacters = characters.toLowerCase()

			if (!isNaN(smallCharacters) && smallCharacters !== ' ') {
				let emojiNumber = writtenNumber[smallCharacters];
				emojis.push(`:${emojiNumber}:`)
			} else {
				let discordEmoji = `:regional_indicator_${smallCharacters}:`

				if (discordEmoji === `:regional_indicator_ :`) {
					emojis.push(' ')
				} else {
					emojis.push(discordEmoji);
				}	
			}
		}
	}
	message.say(emojis.join(' '));
	}
}