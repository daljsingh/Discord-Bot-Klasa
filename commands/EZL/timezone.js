const moment = require('moment-timezone')
moment().tz('America/New_York').format()

const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'timezone',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: ['tz'],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'Please make sure Time is given as follows: **YYYY-MM-DD HH:MM XM EST** Example: 2017-09-19 08:30 PM PST',
      quotedStringSupport: false,
      usage: '<date:str> <time:str> <tz:str>',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [date, time, tz]) {
    switch (msg.channel.id) {
      case '337740137528164352': // NA
        break
      case '326539653899354113':
        break
      case '337185802897588226':
        break
      case '318123892302675968':
        break
      case '337317330378031122':
        break
      default:
        return msg.channel.send('Sorry, this is a EZL Command Only :smiley:')
    }
    const abbrs = {
      est: 'America/New_York',
      edt: 'America/New_York',
      cst: 'America/Chicago',
      cdt: 'America/Chicago',
      mst: 'America/Denver',
      mdt: 'America/Denver',
      pst: 'America/Los_Angeles',
      pdt: 'America/Los_Angeles',
      paris: 'Europe/Paris',
      bst: 'Europe/Guernsey',
      sgt: 'Asia/Singapore',
      cest: 'Europe/Andorra'
    }
    const myZones = ['est', 'cst', 'mst', 'pst', 'paris', 'bst', 'sgt']
    const allZones = ['**__EST:__** ', '**__CST:__** ', '**__MST:__** ', '**__PST:__** ', '**__Paris:__** ', '**__BST:__** ', '**__SGT:__** ', '**__CEST:__**']
    const zone = tz.toLowerCase()
    const m = moment.tz(`${date} ${time}`, abbrs[zone])
    let full = ''
    for (let i = 0; i < 7; i++) {
      full += allZones[i]
      let time = m.tz(abbrs[myZones[i]]).format()
      time = time.replace('T', '     ')
      // time = time.substring(4, full.length)
      full += time
      full += '\n'
    }
    if (msg.channel.id === '337317330378031122') {
      return msg.channel.send(full)
    }
    msg.channel.send('Your time has been sent to the streamers.')
    return this.client.channels.get('360620239999991819').send(full)
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
