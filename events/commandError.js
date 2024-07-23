module.exports = {
    name: 'commandError',
    execute(command, err , message, ) {

        console.log(`[ERROR] - error occured in ${command.name}
        ${err} : ${message}`)
    }
}