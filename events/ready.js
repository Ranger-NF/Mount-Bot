const discord = require('discord.js');
const math = require('../math.js');

module.exports= {
	name: 'ready',
	execute (client) {
		console.log(`[INFO] - ${client.user.username} logged on!`)
		const statusChannel = client.channels.cache.get('815850620938485801');

		let theTime = math.convertTime(Date.now());
		let readyTime = `${theTime.hours}:${theTime.mins}`
		const readyEmbed = new discord.MessageEmbed()
			.setColor('#75FF3A')
			.setThumbnail(client.user.avatarURL('png'))
			.setTitle(`${client.user.username} is on!`)
			.addFields(
				{name:'Time', value:readyTime})
		statusChannel.send(readyEmbed)
	},
}