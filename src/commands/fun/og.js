import { Command } from '@sapphire/framework';
import { EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { convertTime } from '../../helpers/math.js';
import { read } from 'jimp';
// import { greyscale } from 'jimp';

export default class ogCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: 'og',
			group: 'fun',
			memberName: 'og',
			description: 'Shows off whose more og'
		});
	}
	async messageRun(message, args){
		let member1 = message.member;
		let member2 = message.mentions.members.first();

		if (member2 == undefined) {
			message.channel.send('Try mentioning a user next time')
		} else {
			var ogMember = (member1.joinedTimestamp < member2.joinedTimestamp) ? member1 : member2;
			var nonOg = (member1.joinedTimestamp > member2.joinedTimestamp) ? member1 : member2;

			let ogTime = nonOg.joinedTimestamp - ogMember.joinedTimestamp;
			let convertedTime = convertTime(ogTime);

			const joinedTimeStamp = `${convertedTime.days} days and ${convertedTime.hours} hours!`

			const avatar = ogMember.user.avatarURL({format:'png'})
			let background = await read(avatar)
			let greyscale_bg = background.grayscale();
			const blackNWhite = greyscale_bg.contrast(0);
			const crown = await read('./overlays/og_badge.png')
			blackNWhite.composite(crown, 0 , 0)
			blackNWhite.write('./manipulated/og.png')

			const attachment = new AttachmentBuilder('./manipulated/og.png');

			let ogEmbed = new new EmbedBuilder()
				.setColor('WHITE')
				.setTitle('OG scale')
				.setDescription(`${ogMember.user.username} is cooler than ${nonOg.user.username}`)
				.addField(`They have a difference of more than ${joinedTimeStamp}!`, '\u200B')
				.attachFiles(attachment)
				.setImage('attachment://og.png')
				.setFooter(`Command invoked by ${message.author.tag}`, message.author.avatarURL());

			message.channel.send({embeds: [ogEmbed], files: [attachment]});
		}
	}
}