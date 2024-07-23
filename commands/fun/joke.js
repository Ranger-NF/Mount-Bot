const { Command } = require('@sapphire/framework');
const fetch = require('node-fetch');
const {pgamerxApiKey} = require('../../main.json');

module.exports = class JokeCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: 'joke',
			group: 'fun',
			memberName: 'joke',
			description: 'returns a simple joke!',
		});
	}
	async messageRun(message, args) {
		message.channel.send("Joke API is down :(");
		// const headers = {
		// 	"x-api-key" : pgamerxApiKey
		// }

		// let jokeRequest = await fetch(`https://api.pgamerx.com/v3/joke/pun`, {method: "GET", headers: headers});
		// let jokeRes = await jokeRequest.json();
		// let type = jokeRes['type']
		// if (type === 'twopart') {
		// 	let question = jokeRes['setup']
		// 	let answer = jokeRes['delivery']
		// 	message.channel.send(`${question}\n||${answer}||`)
		// } else {
		// 	let starightJoke = jokeRes['joke']
		// 	message.channel.send(starightJoke);
		// };
	}
}