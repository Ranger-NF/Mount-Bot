const {Command} = require('@sapphire/framework');

module.exports = class ReloadCommand extends Command {
    constructor(context, options){
        super(context,{
            ...options,
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

        if (reloadingCmd == undefined && argsArray != [ '' ]) {
            args.reply(`${commandName} is not an available command`)
        } else {
            try {
                reloadingCmd[1].reload()
                console.log(`[INFO] - ${reloadingCmd[0]} has been reloaded`)
                args.say("command reloaded!")
            } catch (error) {
                console.log(error);
            }
        }
    }
}