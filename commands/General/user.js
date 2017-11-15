const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'user',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'Find out information about a user by @ them.',
      quotedStringSupport: false,
      usage: '[usr:user]',
      usageDelim: undefined,
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [usr]) {
    const embed = new this.client.methods.Embed()
      .setTitle(`User Info of ${usr.username}`)
      .setAuthor(this.client.user.username, this.client.user.avatarURL())
      .setColor(0x00AE86)
      .setThumbnail(`${usr.displayAvatarURL()}`)
      .setDescription(`**Created On:** ${usr.createdAt}`)
      .setFooter('EZL - The League For Everyone', this.client.user.avatarURL())
      .setURL('https://discord.me/EZL')
      .addField('Status',
        `**Game:** ${usr.presence.game}\n**Status:** ${usr.presence.status}`)
    return msg.reply({ embed })
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
