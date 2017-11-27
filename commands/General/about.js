const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'about',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: ['status'],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'Learn about the bot and see its stats.',
      quotedStringSupport: false,
      usage: '',
      usageDelim: undefined,
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [...params]) {
    const embed = new this.client.methods.Embed()
      .setTitle('About EZLBot - The Bot For Everyone!')
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
      .setColor(0x00AE86)
      .setDescription('Hi, I\'m EZLBot, a growing community bot that has new features added regularly. For now I control VG soon I will control the world. 😃')
      .setFooter('<3 MadGlory, SEMC, Discord', this.client.user.displayAvatarURL())
      .setURL('https://discord.me/EZL')
      .addField('What can I do?',
        'For a look at what I can do type **$help**.')
      .addField('Talk To My Developers!', 'Come join us [here](https://discord.me/ezl). You can also contact us directly by using the contact command. Type **$help contact**.')
      .addField('Bot Status', `Servers: ${this.client.guilds.size}\nUsers: ${this.client.users.size}\nLast Updated: ${Math.floor(((((this.client.uptime / 1000) / 60) / 60) / 24))} Days ${Math.floor((((this.client.uptime / 1000) / 60) / 60))} Hours ${Math.floor(((this.client.uptime / 1000) / 60))} Minutes`, true)
      .addField('Donations', 'To support us please type **$donate**. <3', true)
    return msg.reply({ embed })
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
