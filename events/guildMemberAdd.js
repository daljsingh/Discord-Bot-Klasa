const { Event } = require('klasa')

module.exports = class extends Event {
  constructor (...args) {
    super(...args, { name:'guildMemberAdd', enabled: true })
  }

  async run (member) {

    const guildDb = await this.client.providers.get('json').get('guilds', member.guild.id)
    const { welcomeChannel, welcomeMessage } = guildDb
    if (!welcomeChannel) await this.client.providers.get('json').update('guilds', member.guild.id, { welcomeChannel: null })
    if (!welcomeMessage) await this.client.providers.get('json').update('guilds', member.guild.id, { welcomeMessage: null })
    if (!welcomeChannel) return
    return this.client.channels.get(welcomeChannel).send(`${member}, ${welcomeMessage}`)
  }

  async init () {
    if (!this.client.settings.guilds.schema.welcomeChannel) {
      await this.client.settings.guilds.add('welcomeChannel', { type: 'TextChannel' })
    }
    if (!this.client.settings.guilds.schema.welcomeMessage) {
      await this.client.settings.guilds.add('welcomeMessage', { type: 'String' })
    }
  }
}
