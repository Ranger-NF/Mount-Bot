const { Command } = require('@sapphire/framework');
const {EmbedBuilder} = require('discord.js');
const { prefix } = require('../../main.json');

module.exports = class HelpCommand extends Command {
    constructor(context, options){
        super(context, {
            ...options,
            name: 'help',
            memberName: 'help',
            group: 'main',
            description: 'A descriptive help command'
        });
    }
    messageRun(message, args) {
        let commands = [
            ['help', 'A descriptive help command'],
            ['emojify', 'Turns characters to emojis'],
            ['og', 'Shows off whose more og'],
        ]

        let commandsInfo = [];

        for (let command of commands) {
            commandsInfo.push({name: command[0], value: command[1]});
        }

        const helpEmbed = new EmbedBuilder()
            .setTitle('Help')
            .setDescription(`\`Usage: ${prefix} <command> <input(s)>\`\nCommands available:`)
            .addFields(commandsInfo)
            .setThumbnail(this.container.client.user.avatarURL())
            .setColor('#22770F')
            .setFooter({ text: `Command invoked by ${message.author.tag}`, iconURL: message.author.avatarURL()})

        message.channel.send({embeds: [helpEmbed]});
    }

}