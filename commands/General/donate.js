const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'donate',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: ['EMBED_LINKS'],
      requiredSettings: [],
      description: 'Wanting to donate to help EZL grow and achieve its vision? Here is how you can make it possible.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: undefined,
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [...params]) {
    const embed = new this.client.methods.Embed()
      .setTitle('Are you interested in donating to EZL?')
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
      .setColor(0x00AE86)
      .setDescription('If you wish to help donate to EZL and make it grow and achieve its vision. 😃')
      .setFooter('© Esports Zodiac League LLC (EZL)', this.client.user.displayAvatarURL())
      .setTimestamp()
      .setURL('http://ezlgg.com')
      .addField('PayPal',
        'If you wish to use our [PayPal](http://paypal.me/EZL_Official).')
      .addField('Becoming A Patron', 'If you wish to become a Patron and gain all the rewards and benefits as well please check out [Patreon](https://www.patreon.com/user?u=5949452)')
    msg.channel.send({ embed })
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
