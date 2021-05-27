const {Command} = require('discord.js-commando');
const { client } = require('../../bot.js')

module.exports = class quitCommand extends Command {
	constructor(client){
		super(client,{
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