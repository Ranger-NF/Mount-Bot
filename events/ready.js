const {prefix} = require('../main');

module.exports= {
	name: 'ready',
	execute (client) {
		console.log(`[INFO] - ${client.user.username} logged on!`)
		client.user.setActivity(`${prefix} help`, { type: 'WATCHING' });
	},
}