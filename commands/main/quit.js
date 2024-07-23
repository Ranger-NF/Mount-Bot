const {Command} = require('@sapphire/framework');
const { client } = require('../../bot.js')

module.exports = class quitCommand extends Command {
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