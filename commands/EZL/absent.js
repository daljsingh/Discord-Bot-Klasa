const { Command } = require('klasa')
const config = require('../../config/config.json')
module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'absent',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: ['abs'],
      permLevel: 0,
      botPerms: ['MANAGE_ROLES'],
      requiredSettings: [],
      description: 'Make a request of a department. EZL COMMAND ONLY!',
      quotedStringSupport: false,
      usage: '<reason|urgent> <reas:str> [...]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [abs, ...reas]) {
    if (msg.guild.id !== '389269211018428426') return msg.channel.send('Sorry this is a command only meant for EZL Staff Server.')
    const final = await reas.join(' ')
    switch (abs) {
      case 'reason':
        await this.client.channels.get('389554937853509633').send(final)
        return msg.channel.send('Worked! Have Fun!')
        break
        return msg.channel.send('Sorry, this is a EZL Command Only :smiley:')
    }
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}