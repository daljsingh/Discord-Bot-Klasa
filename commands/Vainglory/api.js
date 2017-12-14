// https://api.dc01.gamelockerapp.com/shards/na/matches?sort=-createdAt&page[limit]=1
const Vainglory = require('vainglory')
const config = require('../../config/config.json')
const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'api',
      enabled: true,
      cooldown: 0.5,
      permLevel: 0,
      botPerms: ['EMBED_LINKS'], // Embeds and external emojis
      requiredSettings: [],
      description: 'Check the status of the Vainglory API for each region.',
      usage: '',
      usageDelim: undefined,
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [...params]) {
    // Set up all necessary variables
    const final = {}
    const status = []
    let mgStatus = ''
    const allRegions = ['na', 'eu', 'sa', 'sg', 'ea', 'cn']
    const options = {
      host: 'https://api.dc01.gamelockerapp.com/shards/',
      region: 'na',
      title: 'semc-vainglory'
    }
    const search = {
      page: {
        limit: 1
      },
      sort: '-createdAt' // -createdAt for reverse
    }
    const now = new Date()
    const minus28Days = new Date((new Date() * 1) - 2419200000)
    const tSearch = {
      page: {
        limit: 1
      },
      sort: '-createdAt', // -createdAt for reverse
      filter: {
        'createdAt-start': minus28Days.toISOString(), // ISO Date
        'createdAt-end': now.toISOString() // ISO Date
      }
    }
    const vainglory = new Vainglory(config.vgKey, options)
    await vainglory.status().then((info) => {
      mgStatus = `Gamelocker Version: ${info.version} | Last Updated: ${info.releasedAt}`
    })
    await getData(vainglory, allRegions, search, tSearch, status)
    await addData(status, final)
    const embed = new this.client.methods.Embed()
      .setTitle('Vainglory API Status')
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
      .setColor('#53ddf9')
      .setFooter('Checking The API Status', this.client.user.displayAvatarURL())
      .setThumbnail('https://pbs.twimg.com/profile_images/428559080953626625/fqZiJ6TQ_400x400.png')
      .setTimestamp()
      .setURL('https://madglory.com')
      .setFooter('© Super Evil MegaCorp', this.client.user.displayAvatarURL())
      .setDescription(mgStatus)
    await finishEmbed(embed, final)
    return msg.reply({ embed })
  }
}

async function getData (vainglory, allRegions, search, tSearch, status) {
  for (let i = 0; i < allRegions.length; i += 1) {
    await getMatch(vainglory, allRegions[i], search, status)
    await getTourney(vainglory, allRegions[i], tSearch, status)
  }
}

async function checkSpeed (endCall, startCall, status) {
  if (endCall - startCall < 800) status.push(`Ping: ${endCall - startCall} ms`)
  return status.push(`Ping: ${endCall - startCall} ms 🔴`)
}

// Func to get a match and push the data into proper places depending on how fast it takes to make the call.
async function getMatch (vainglory, region, search, status) {
  // Starts a timer to measure how long it took to call the API
  const startCall = Date.now()
  await vainglory.region(region).matches.collection(search).then((matches) => {
    if (matches.errors) {
      // Ends the timer
      const endCall = Date.now()
      status.push(`${matches.region.toUpperCase()} ❌`)
      status.push(`Error: ${matches.messages}`)
      checkSpeed(endCall, startCall, status)
    }
    const endCall = Date.now()
    const latest = new Date() - Date.parse(matches.data[0].attributes.createdAt)
    status.push(`${matches.data[0].attributes.shardId.toUpperCase()} ✅`)
    status.push(timeDiff(latest))
    checkSpeed(endCall, startCall, status)
  })
}
// Func to get a match from tourney regions and push the data into proper places depending on how fast it takes to make the call.
async function getTourney (vainglory, region, tSearch, status) {
  switch (region) {
    case 'sa':
    case 'ea':
    case 'cn':
    case 'sg':
      status.push(`${region.toUpperCase().replace('TOURNAMENT', 'T')} ❌`)
      status.push(`Not Active Yet!`)
      return status.push(`Ping: NOT CHECKED ms 🔴`)
  }
  const startCall = Date.now()
  await vainglory.tournament.region(region).matches.collection(tSearch).then((matches) => {
    if (matches.errors) {
      const endCall = Date.now()
      status.push(`${matches.region.toUpperCase().replace('TOURNAMENT', 'T')} ❌`)
      status.push(`${matches.messages}`)
      checkSpeed(endCall, startCall, status)
    }
    const endCall = Date.now()
    const latest = new Date() - Date.parse(matches.data[0].attributes.createdAt)
    status.push(`${matches.data[0].attributes.shardId.toUpperCase().replace('TOURNAMENT', 'T')} ✅`)
    status.push(timeDiff(latest))
    checkSpeed(endCall, startCall, status)
  })
}
// Func to check the difference between the time provided and now in Days/Hours/Min
function timeDiff (time) {
  return `Latest: ${Math.floor((((time / 1000) / 60) / 60) / 24)} D, ${Math.floor((((time / 1000) / 60) / 60) % 24)} H, ${Math.floor((((time / 1000) / 60) % 60))} M`
}

function addData (status, final) {
  for (let i = 0; i < status.length; i += 1) {
    switch (status[i]) {
      case 'NA ✅' || 'NA ❌':
        final.naTitle = status[i]
        final.na = status[i + 1]
        final.naTimer = status[i + 2]
        break
      case 'EU ✅' || 'EU ❌':
        final.euTitle = status[i]
        final.eu = status[i + 1]
        final.euTimer = status[i + 2]
        break
      case 'SA ✅' || 'SA ❌':
        final.saTitle = status[i]
        final.sa = status[i + 1]
        final.saTimer = status[i + 2]
        break
      case 'SG ✅' || 'SG ❌':
        final.sgTitle = status[i]
        final.sg = status[i + 1]
        final.sgTimer = status[i + 2]
        break
      case 'CN ✅' || 'CN ❌':
        final.cnTitle = status[i]
        final.cn = status[i + 1]
        final.cnTimer = status[i + 2]
        break
      case 'EA ✅' || 'EA ❌':
        final.eaTitle = status[i]
        final.ea = status[i + 1]
        final.eaTimer = status[i + 2]
        break
      case 'T-NA ✅' || 'T-NA ❌':
        final.tnaTitle = status[i]
        final.tna = status[i + 1]
        final.tnaTimer = status[i + 2]
        break
      case 'T-EU ✅' || 'T-EU ❌':
        final.teuTitle = status[i]
        final.teu = status[i + 1]
        final.teuTimer = status[i + 2]
        break
      case 'T-SA ✅' || 'T-SA ❌':
        final.tsaTitle = status[i]
        final.tsa = status[i + 1]
        final.tsaTimer = status[i + 2]
        break
      case 'T-SG ✅' || 'T-SG ❌':
        final.tsgTitle = status[i]
        final.tsg = status[i + 1]
        final.tsgTimer = status[i + 2]
        break
      case 'T-CN ✅' || 'T-CN ❌':
        final.tcnTitle = status[i]
        final.tcn = status[i + 1]
        final.tcnTimer = status[i + 2]
        break
      case 'T-EA ✅' || 'T-EA ❌':
        final.teaTitle = status[i]
        final.tea = status[i + 1]
        final.teaTimer = status[i + 2]
        break
      default:
        break
    }
  }
}

function finishEmbed (embed, final) {
  embed.addField(final.naTitle, `${final.na}\n${final.naTimer}`, true)
  embed.addField(final.euTitle, `${final.eu}\n${final.euTimer}`, true)
  embed.addField(final.sgTitle, `${final.sg}\n${final.sgTimer}`, true)
  embed.addField(final.saTitle, `${final.sa}\n${final.saTimer}`, true)
  embed.addField(final.cnTitle, `${final.cn}\n${final.cnTimer}`, true)
  embed.addField(final.eaTitle, `${final.ea}\n${final.eaTimer}`, true)
  embed.addField(final.tnaTitle, `${final.tna}\n${final.tnaTimer}`, true)
  embed.addField(final.teuTitle, `${final.teu}\n${final.teuTimer}`, true)
  // embed.addField(final.tsgTitle, `${final.tsg}\n${final.tsgTimer}`, true)
  // embed.addField(final.tsaTitle, `${final.tsa}\n${final.tsaTimer}`, true)
  // embed.addField(final.tcnTitle, `${final.tcn}\n${final.tcnTimer}`, true)
  // embed.addField(final.teaTitle, `${final.tea}\n${final.teaTimer}`, true)
}
