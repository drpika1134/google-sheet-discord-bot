const Discord = require('discord.js')

var client = new Discord.Client()
client.once('ready', () => {
    console.log('Ready!')
})

client.on('message', message => {
    var args
    var command
    if (message.content.startsWith("+")) {
        args = message.content
            .slice(1)
            .trim()
            .split(' ')
        command = args.shift().toLowerCase()
    } else {
        return
    }

    try {
        var commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args)
    } catch (error) {
        console.log(error)
    }

})

client.login(process.env.clientToken)