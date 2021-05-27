const fetch = require('node-fetch');
const { client } = require('../bot');
const { pgamerxApiKey } = require('../main.json')

module.exports= {
	name: 'message',
	async execute (message) {
		const msg = message.content.toLowerCase()
		if (msg.startsWith('mount ' ) || message.mentions.has(client.user)) {
			
			if (msg.includes('invite')) {
				message.say('https://discord.com/api/oauth2/authorize?client_id=796625057391837185&permissions=117760&scope=bot');
			} else {
				let content = msg.substr(6)
				const headers = {"x-api-key" : pgamerxApiKey}
				let aiChatRes = await fetch(`https://api.pgamerx.com/v3/ai/response?dev_name=Ranger&bot_name=Mount&language=en&type=stable&message=${content}`, {method: "GET", headers: headers});
				let value = await aiChatRes.json();
				let response = value[0]['message']
				message.say(response);
			}
			
		}
	},
}