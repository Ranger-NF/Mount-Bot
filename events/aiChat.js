const fetch = require('node-fetch');
const { client } = require('../bot');
const { pgamerxApiKey } = require('../main.json')

module.exports= {
	name: 'message',
	async execute (message) {
		async function chatRes(content) {
			if (msg.includes('invite')) {
				return 'https://discord.com/api/oauth2/authorize?client_id=796625057391837185&permissions=117760&scope=bot';
			} else {
				try {
					const headers = {"x-api-key" : pgamerxApiKey}
					let aiChatRes = await fetch(`https://api.pgamerx.com/v3/ai/response?dev_name=Ranger&bot_name=Mount&language=en&type=stable&message=${content}`, {method: "GET", headers: headers});
					let value = await aiChatRes.json();
					let response = value[0]['message']
					return response
				} catch {
					return 'uhm- Something went wrong ||Yikes||'
				}
			}
		}
		const msg = message.content.toLowerCase()
		if (msg.startsWith('mount ' ) || message.mentions.has(client.user)) {
			
			if (message.mentions.has(client.user)) {
				if (message.content.startsWith('<@!796625057391837185>')) {
					let content = msg.substr(21);
					message.say(await chatRes(content));
				} else {
					message.say(await chatRes(msg));
				}
			} else {
				let content = msg.substr(6);
				message.say(await chatRes(content));
			}
			
		}
	},
}