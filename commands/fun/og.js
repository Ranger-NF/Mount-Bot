const {Command} = require('discord.js-commando');
const discord = require('discord.js');
const math = require('../../helpers/math.js');
const jimp = require('jimp');
const { greyscale } = require('jimp');

module.exports = class ogCommand extends Command {
	constructor(client){
		super(client,{
			name: 'og',
			group: 'fun',
			memberName: 'og',
			description: 'shows off whose more og'
		});
	}
	async run(message, args){
		let member1 = message.member;
		let member2 = message.mentions.members.first();

		var ogMember = (member1.joinedTimestamp < member2.joinedTimestamp) ? member1 : member2;
		var nonOg = (member1.joinedTimestamp > member2.joinedTimestamp) ? member1 : member2;

		let ogTime = nonOg.joinedTimestamp - ogMember.joinedTimestamp;
		let convertedTime = math.convertTime(ogTime);

		const joinedTimeStamp = `${convertedTime.days} days and ${convertedTime.hours} hours!`

		const avatar = ogMember.user.avatarURL({format:'png'})
		let background = await jimp.read(avatar)
		let greyscale_bg = background.grayscale();
		const blackNWhite = greyscale_bg.contrast(0);
		const crown = await jimp.read('./overlays/og_badge.png')
		blackNWhite.composite(crown, 0 , 0)
		blackNWhite.write('./manipulated/og.png')

		const attachment = new discord.MessageAttachment('./manipulated/og.png', 'og.png');

		let ogEmbed = new discord.MessageEmbed()
			.setColor('WHITE')
			.setTitle('OG scale')
			.setDescription(`${ogMember.user.username} is cooler than ${nonOg.user.username}`)
			.addField(`They have a difference of more than ${joinedTimeStamp}!`, '\u200B')
			.attachFiles(attachment)
			.setImage('attachment://og.png')
			.setFooter(`Command invoked by ${message.author.tag}`, message.author.avatarURL());

		message.say(ogEmbed);
	}
}