const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'request',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: ['req'],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'Make a request of a department. EZL COMMAND ONLY!',
      quotedStringSupport: false,
      usage: '<translate|pr|stream|website|design|news> <req:str> [...]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [dep, req]) {
    if (msg.guild.id !== '282541228904546305') return msg.channel.send('Sorry this is a command only meant for EZL Staff Server.')
    const final = await req.join(' ')
    switch (dep) {
      case 'translate':
        await this.client.channels.get('277391272770273282').send(final)
        return msg.channel.send('Your message has been sent to the translators. Thank you.')
      case 'pr':
        await this.client.channels.get('313686770925436938').send(final)
        return msg.channel.send('Your message has been sent to the PR Team. Thank you.')
      case 'stream':
        await this.client.channels.get('334777433561628673').send(final)
        return msg.channel.send('Your message has been sent to the streame team. Thank you.')
      case 'website':
        await this.client.channels.get('352116741809373187').send(final)
        return msg.channel.send('Your message has been sent to the web developers. Thank you.')
      case 'design':
        await this.client.channels.get('277939552167919616').send(final)
        return msg.channel.send('Your message has been sent to the designers. Thank you.')
      case 'news':
        await this.client.channels.get('281511307885412354').send(final)
        return msg.channel.send('Your message has been sent to the news team. Thank you.')
      default:
        return msg.channel.send('Sorry, this is a EZL Command Only :smiley:')
    }
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
