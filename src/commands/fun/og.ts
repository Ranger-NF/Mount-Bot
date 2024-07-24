import { Args, Command } from '@sapphire/framework';
import { EmbedBuilder, AttachmentBuilder, Message, GuildMember, Colors } from 'discord.js';
import { convertTime } from '../../helpers/math.js';
import { read } from 'jimp';

export default class ogCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: 'og',
			description: 'Shows off whose more og'
		});
	}
	async messageRun(message: Message, args: Args){
		let member1: GuildMember = message.member!;
		let member2: GuildMember

		if (message.mentions.members == null) {
			message.channel.send('Try mentioning a user next time')
			return
		}

		member2 = message.mentions.members.last()!; // TODO: Change it to pick the correct mention (as currently the bot is invoked by mentioning it)

		var ogMember = (member1.joinedTimestamp! < member2.joinedTimestamp!) ? member1 : member2;
		var nonOg = (member1.joinedTimestamp! > member2.joinedTimestamp!) ? member1 : member2;

		let ogTime = nonOg.joinedTimestamp! - ogMember.joinedTimestamp!;
		let convertedTime = convertTime(ogTime);

		const joinedTimeStamp = `${convertedTime.days} days and ${convertedTime.hours} hours!`

		const avatar = ogMember.user.avatarURL({extension:'png'})!
		let background = await read(avatar)
		let greyscale_bg = background.grayscale();
		const blackNWhite = greyscale_bg.contrast(0);
		const crown = await read('src/overlays/og_badge.png')
		blackNWhite.composite(crown, 0 , 0)
		blackNWhite.write('src/manipulated/og.png')

		const attachment = new AttachmentBuilder('src/manipulated/og.png');

		let ogEmbed = new EmbedBuilder()
			.setColor(Colors.White)
			.setTitle('OG scale')
			.setDescription(`${ogMember.user.username} is cooler than ${nonOg.user.username}`)
			.addFields([{name: `They have a difference of more than ${joinedTimeStamp}!`, value: '\u200B'}])
			.setImage('attachment://og.png')
			.setFooter({text: `Command invoked by ${message.author.tag}`, iconURL: message.author.avatarURL()!});

		message.channel.send({embeds: [ogEmbed], files: [attachment]});
		
	}
}