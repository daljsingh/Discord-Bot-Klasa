const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'schedule',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: ['sch'],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: '.schedule in the proper channels in the regional servers to schedule your match. EZL Command ONLY!',
      quotedStringSupport: false,
      usage: '<time:str> [...]',
      usageDelim: undefined,
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [...time]) {
    const final = await time.join(' ')
    let region = ''
    switch (msg.channel.id) {
      case '360620794256162816': // NA
      case '337740137528164352':
        region = '**Match Scheduled In NA**'
        break
      case '360624527694102528': // SEA
      case '326539653899354113': // SEA
        region = '**Match Scheduled In SEA**'
        break
      case '337185802897588226': // EU
      case '360624184256233472': // EU
        region = '**Match Scheduled In EU**'
        break
      case '318123892302675968': // SA
      case '360628716101173258': // SA
        region = '**Match Scheduled In SA**'
        break
      default:
        return msg.channel.send('Sorry, this is a EZL Command Only :smiley:')
    }
    await this.client.channels.get('360620239999991819').send(`<@!148717422126301184> New ${region} and posted
  ${final}`)
    return msg.channel.send('Your message has been sent to the streamers and casters. Thank you.')
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
