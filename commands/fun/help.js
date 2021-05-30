const { Command } = require('discord.js-commando');
const discord = require('discord.js');
const { prefix } = require('../../main.json');

module.exports = class HelpCommand extends Command {
    constructor(client){
        super(client, {
            name: 'help',
            memberName: 'help',
            group: 'fun',
            description: 'A descriptive help command'
        });
    }
    run(message) {
        let commands = this.client.registry.findCommands()
        let commandsInfo = [];

        for (let command of commands) {
            if (command[1].hidden === false) {
            commandsInfo.push({name: command[1].name, value: command[1].description});
            }
        }
        const helpEmbed = new discord.MessageEmbed()
            .setTitle('Help')
            .setDescription(`\`Usage: ${prefix} <command> <input(s)>\`\nCommands available:`)
            .addFields(commandsInfo)
            .setThumbnail(this.client.user.avatarURL())
            .setColor('#22770F')
            .setFooter(`Command invoked by ${message.author.tag}`, message.author.avatarURL())

        message.say(helpEmbed);
    }

}