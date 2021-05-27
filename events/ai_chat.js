const fetch = require('node-fetch');
const { pggamerxApiKey } = require('../main.json')

module.exports= {
	name: 'message',
	async execute (message) {
		const msg = message.content.toLowerCase()
		if (msg.startsWith('mount ')) {
			let content = msg.substr(6)
			const headers = {"x-api-key" : pgamerxApiKey}
			let aiChatRes = await fetch(`https://api.pgamerx.com/v3/ai/response?dev_name=Ranger&bot_name=Mount&language=en&type=stable&message=${content}`, {method: "GET", headers: headers});
			let value = await aiChatRes.json();
			let response = value[0]['message']
			message.say(response);
		}
	},
}