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
        let argsArray = args.argString.split(' ');
        let commandName = argsArray[1];
        let commands = this.client.registry.findCommands();
        for (let command of commands) {
            if (command[0] == commandName) {
                var reloadingCmd = command
                break
            }
        }
        try {
            reloadingCmd[1].reload()
            console.log(`[INFO] - ${reloadingCmd[0]} has been reloaded`)
            args.say("command reloaded!")
        } catch (error) {
            console.log(error);
        }
    }
}