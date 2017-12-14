const { Command } = require('klasa')
const heroStats   = require('../../heroStats.json')
const config      = require('../../config/config.json')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'hero',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: ['EMBED_LINKS'],
      requiredSettings: [],
      description: 'Learn about the hero\'s of vainglory',
      quotedStringSupport: false,
      usage: '[type:str]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [type]) {
    msg.delete()
    const hero = heroStats[type.toLowerCase()]
    const allowedTypes = config.heroes
    if (!allowedTypes.includes(type)) return msg.reply(`That is not a valid type. Valid types are ${allowedTypes.join(', ')}`)
    const embed = new this.client.methods.Embed()
      .setColor(0x00AE86)
      .setURL('https://ezlgg.com/discord')
      .setTitle('Come Join The EZL Discord Server')
      .setFooter(`© Esports Zodiac League LLC (EZL)`)
      .setAuthor(`Vainglory Hero: ${hero} `, this.client.user.displayAvatarURL())
      .addField('Health Stats', `Level 1: ${hero.health.l1}\nLevel 12: ${hero.health.l12}`)
    return msg.reply({ embed })
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
