
const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'say',
      enabled: true,
      runIn: ['text', 'group'],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: ['MANAGE_MESSAGES'],
      requiredSettings: [],
      description: 'Make the Bot say things',
      quotedStringSupport: false,
      usage: '[content:string] [...]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [...content]) {
    if (msg.deletable) msg.delete()
    if (!content) return msg.reply(`You need to give the bot a message to send! Ex: CheezDoodles🧀`)
    return msg.channel.send(content.join(' '))
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
