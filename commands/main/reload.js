const {Command} = require('discord.js-commando');

module.exports = class ReloadCommand extends Command {
    constructor(client){
        super(client,{
            name: 'reload',
            description: 'reloads the specified command',
            memberName: 'reload',
            group: 'main',
            ownerOnly: true
        });
    }
    run(args) {
        console.log(args.argString)
        let argsArray = args.argString.split(' ');
        let commandName = argsArray[0];
        let commands = this.client.registry.findCommands();
        for (const command of commands) {
            if (command[0] == commandName) {
                command.reload()
            }
        }
        args.say('reloaded')
    }
}