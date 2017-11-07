const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'coinflip',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: ['coin'],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'Flips a (pseudo) fair coin.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: undefined,
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [...params]) {
    return msg.reply(`You flipped ${Math.random() > 0.5 ? 'Heads' : 'Tails'}.`)
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
