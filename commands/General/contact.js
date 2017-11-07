const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'yourCommandName',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: ['report'],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'Need to contact the developers? Reporting a bug? Sending a suggestion?',
      quotedStringSupport: false,
      usage: '<bug|idea|message> <content:str> [...]',
      usageDelim: ' ',
      extendedHelp: 'This is a cool command that will let you use it in different ways. If you do contact bug you can send a bug report. If you do contact idea you can send it to the suggestion pile. If you do message you can send us a private message to the developers. Please note it is extremely helpful to leave a discord invite link so incase we can\'t understand we can contact you.'
    })
  }

  async run (msg, [type, content]) {
    switch (type) {
      case 'bug':
        return this.client.channels.get('289786031434104832').send(`Bug Report From: ${msg.author} in ${msg.guild}\n\n ${content.toString().replace(/,/g, ' ')}`)
      case 'idea':
        return this.client.channels.get('291987845131010050').send(`New Idea From: ${msg.author} in ${msg.guild}\n\n ${content.toString().replace(/,/g, ' ')}`)
      default:
        return this.client.channels.get('292168218385055744').send(`New Message From: ${msg.author} in ${msg.guild}\n\n ${content.toString().replace(/,/g, ' ')}`)
    }
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
