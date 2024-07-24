const {token, prefix, ownerId} = require('./main.json');
const { SapphireClient } = require('@sapphire/framework');
const { GatewayIntentBits } = require('discord.js');

const client = new SapphireClient({
	intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
	loadMessageCommandListeners: true
  });

module.exports ={client};

client.login(token);