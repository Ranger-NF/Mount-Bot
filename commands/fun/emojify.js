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
	for (const word of args) {
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
				message.reply(`\`${smallCharacter}\` cannot be turned in to an emoji!`)
			}
		}
	}
	message.say(emojis.join(' '));
	}
}