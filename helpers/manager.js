const {client} = require('../bot.js')

function fetchMember(data, guild) {
    if (data.startsWith('<@') || !isNaN(data)) {
        if (data.startsWith('<@')) {
            var memberId = data.slice(3, data.length - 1)
        } else if (!isNaN(data)) {
            var memberId = data
        }
        
        try{
            const fetchedMember = guild.members.fetch(memberId)
            return fetchedMember
        } catch(error) {
            console.log(error)
            return 'That member does not exists!'
        }

    } else {
        return 'Thats not a valid id!'
    }
}
module.exports = {fetchMember}