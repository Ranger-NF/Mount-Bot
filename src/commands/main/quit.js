import { Command } from '@sapphire/framework';
import { client } from '../../index';

export default class quitCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			aliases: ['l'],
			name: 'quit',
			group: 'main',
			ownerOnly: true,
			hidden: true,
			memberName: 'quit',
			description: 'logouts the bot'
		});
	}
	run(){
		console.log(`\n[INFO] - ${client.user.username} is logging out!`)
		client.destroy();
	}
}