import 'dotenv/config'
import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

const client = new SapphireClient({
	intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
	loadMessageCommandListeners: true
  });

export default client;

client.login(process.env.TOKEN);
