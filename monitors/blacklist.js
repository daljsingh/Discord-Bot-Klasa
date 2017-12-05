const { Monitor } = require('klasa')

module.exports = class extends Monitor {
  constructor (...args) {
    super(...args, {
      name: 'blacklist',
      enabled: true,
      ignoreBots: true,
      ignoreSelf: true
    })
  }

  async run (msg) {
    if (!msg.guild) return
    const { blacklistWords } = await msg.guild.settings
    if (!msg.deletable || blacklistWords.length < 1) return
    const words = await msg.content.toLowerCase().split(' ')
    const badWords = []
    for (const word of words) {
      if (!blacklistWords.includes(word)) continue
      badWords.push(word)
    }
    if (!badWords.length > 0) return
    if (msg.content.length < 1800) await msg.author.send(`I deleted the message below because you used a word that is not allowed. : **${badWords.join(', ')}**\n\n${msg.content}`)
    else {
      await msg.author.send(`I deleted the message below because you used a word that is not allowed. : **${badWords.join(', ')}**`)
      await msg.author.send(msg.content)
    }
    return msg.delete()
  }

  async init () {
    if (!this.client.settings.guilds.schema.blacklistWords) {
      await this.client.settings.guilds.add('blacklistWords', { type: 'String', array: true })
    }
  }
}
