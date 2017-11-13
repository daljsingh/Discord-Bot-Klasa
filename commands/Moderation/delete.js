const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'delete',
      enabled: true,
      runIn: ['text'],
      cooldown: 0,
      aliases: ['d'],
      permLevel: 7,
      botPerms: ['MANAGE_MESSAGES'],
      requiredSettings: [],
      description: 'This will remove X amount of messages sent in a channel.',
      quotedStringSupport: false,
      usage: '<amount:int{2,100}>',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [amount]) {
    return msg.channel.bulkDelete(amount, true)
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
