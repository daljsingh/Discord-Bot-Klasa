const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'vgpro',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'Learn about VGPRO',
      quotedStringSupport: false,
      usage: '[type:str]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [type]) {
    const allowedTypes = ['bugs', 'errors', 'ideas', 'idea', 'suggestions', 'suggestion']
    if (!allowedTypes.includes(type)) return msg.reply(`That is not a valid type. Valid types are ${allowedTypes.join(', ')}`)
    const embed = new this.client.methods.Embed()
      .setColor(0x00AE86)
      .setURL('https://ezlgg.com/discord')
      .setTitle('Come Join The EZL Discord Server')
      .setFooter(`© Esports Zodiac League LLC (EZL)`)
    switch (type) {
      case 'bugs':
      case 'errors':
        embed.setDescription(`Bugs/errors format message:
        
When sending a report please send it as 1 detailed message so it is easier to track and understand the error. This allows for faster fixes and improvements made.`)
        embed.addField('The format is:', `-IGN:
-Region:
-Device/Operating System:
-Browser:
-Bug/Error: Here you will write a description of the error you are having and how to replicate it. Please be as detailed as possible. The more details the better we can help fix it.
-Screenshot:`)
        break
      case 'suggestions':
      case 'suggestion':
      case 'idea':
        embed.setDescription(`You can send all suggestions to #suggestions in the following format.

Topic:
Here you can list in regards to what the suggestion is about. For example, is it to improve the website or to improve the discord server in any way?

Suggestion:
You will list the suggestion here as detailed as possible. The more details the better we can understand you. Cheers`)
        break
      default:
        return msg.reply(`That is not a valid type. Valid types are ${allowedTypes.join(', ')}`)
    }
    return msg.reply({ embed })
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
