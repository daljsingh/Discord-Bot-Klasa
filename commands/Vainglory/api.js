// https://api.dc01.gamelockerapp.com/shards/na/matches?sort=-createdAt&page[limit]=1
const Vainglory = require('vainglory')
const config = require('../../config/config.json')
// Set up all necessary variables
const timer = []
const final = []
const status = []
let mgStatus = ''
const publicRegions = ['na', 'eu', 'sa', 'sg', 'ea', 'cn']
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
// Func to check the difference between the time provided and now in Days/Hours/Min
function timeDiff (time) {
  return `Latest: ${Math.floor((((time / 1000) / 60) / 60) / 24)} D, ${Math.floor((((time / 1000) / 60) / 60) % 24)} H, ${Math.floor((((time / 1000) / 60) % 60))} M`
}
// Func to get a match and push the data into proper places depending on how fast it takes to make the call. 
function getMatch (region) {
  // Starts a timer to measure how long it took to call the API
  const startCall = Date.now()
  vainglory.region(region).matches.collection(search).then((matches) => {
    if (matches.errors) {
      // Ends the timer
      const endCall = Date.now()
      status.push(`Region: ${matches.region.toUpperCase()} ❌`)
      status.push(`Error: ${matches.messages}`)
      if (endCall - startCall < 500) {
        timer.push(`Speed: ${endCall - startCall} ms <:green:348547069859856384>`)
      } else if (endCall - startCall < 800) {
        timer.push(`Speed: ${endCall - startCall} ms <:yellow:348546626773843969>`)
      } else {
        timer.push(`Speed: ${endCall - startCall} ms :red_circle:`)
      }
    }
    const endCall = Date.now()
    const latest = new Date() - Date.parse(matches.data[0].attributes.createdAt)
    status.push(`Region: ${matches.data[0].attributes.shardId.toUpperCase()} ✅`)
    status.push(timeDiff(latest))
    if (endCall - startCall < 500) {
      timer.push(`Speed: ${endCall - startCall} ms <:green:348547069859856384>`)
    } else if (endCall - startCall < 800) {
      timer.push(`Speed: ${endCall - startCall} ms <:yellow:348546626773843969>`)
    } else {
      timer.push(`Speed: ${endCall - startCall} ms :red_circle:`)
    }
  })
}
// Func to get a match from tourney regions and push the data into proper places depending on how fast it takes to make the call. 
function getTourney (region) {
  const startCall = Date.now()
  vainglory.tournament.region(region).matches.collection(tSearch).then((matches) => {
    if (matches.errors) {
      const endCall = Date.now()
      status.push(`Region: ${matches.region.toUpperCase().replace('TOURNAMENT', 'T')} ❌`)
      status.push(`${matches.messages}`)
      if (endCall - startCall < 500) {
        timer.push(`Speed: ${endCall - startCall} ms <:green:348547069859856384>`)
      } else if (endCall - startCall < 800) {
        timer.push(`Speed: ${endCall - startCall} ms <:yellow:348546626773843969>`)
      } else {
        timer.push(`Speed: ${endCall - startCall} ms :red_circle:`)
      }
    }
    const endCall = Date.now()
    const latest = new Date() - Date.parse(matches.data[0].attributes.createdAt)
    status.push(`Region: ${matches.data[0].attributes.shardId.toUpperCase().replace('TOURNAMENT', 'T')} ✅`)
    status.push(timeDiff(latest))
    if (endCall - startCall < 500) {
      timer.push(`Speed: ${endCall - startCall} ms <:green:348547069859856384>`)
    } else if (endCall - startCall < 800) {
      timer.push(`Speed: ${endCall - startCall} ms <:yellow:348546626773843969>`)
    } else {
      timer.push(`Speed: ${endCall - startCall} ms :red_circle:`)
    }
  })
}
exports.run = async (client, msg) => {
  try {
    vainglory.status().then((info) => {
      mgStatus = `Gamelocker Version: ${info.version} | Last Updated: ${info.releasedAt}`
    })
    for (let i = 0; i < publicRegions.length; i += 1) {
      getMatch(publicRegions[i])
      getTourney(publicRegions[i])
    }
    setTimeout(() => {
      for (let i = 0; i < status.length; i += 1) {
        if (status[i].startsWith('Region: NA')) {
          final.na = status[i + 1]
          final.naTitle = status[i]
        } else if (status[i].startsWith('Region: EU')) {
          final.eu = status[i + 1]
          final.euTitle = status[i]
        } else if (status[i].startsWith('Region: SA')) {
          final.sa = status[i + 1]
          final.saTitle = status[i]
        } else if (status[i].startsWith('Region: SG')) {
          final.sg = status[i + 1]
          final.sgTitle = status[i]
        } else if (status[i].startsWith('Region: CN')) {
          final.cn = status[i + 1]
          final.cnTitle = status[i]
        } else if (status[i].startsWith('Region: EA')) {
          final.ea = status[i + 1]
          final.eaTitle = status[i]
        } else if (status[i].startsWith('Region: T-NA')) {
          final.tna = status[i + 1]
          final.tnaTitle = status[i]
        } else if (status[i].startsWith('Region: T-EU')) {
          final.teu = status[i + 1]
          final.teuTitle = status[i]
        } else if (status[i].startsWith('Region: T-SA')) {
          final.tsa = status[i + 1]
          final.tsaTitle = status[i]
        } else if (status[i].startsWith('Region: T-SG')) {
          final.tsg = status[i + 1]
          final.tsgTitle = status[i]
        } else if (status[i].startsWith('Region: T-CN')) {
          final.tcn = status[i + 1]
          final.tcnTitle = status[i]
        } else if (status[i].startsWith('Region: T-EA')) {
          final.tea = status[i + 1]
          final.teaTitle = status[i]
        }
      }
    }, 1100)
    setTimeout(() => {
      const embed = new client.methods.Embed()
        .setTitle('Vainglory API Status')
        .setAuthor(client.user.username, client.user.avatarURL())
        .setColor(0x00AE86)
        .setFooter('Checking...', client.user.avatarURL())
        .setThumbnail('https://pbs.twimg.com/profile_images/428559080953626625/fqZiJ6TQ_400x400.png')
        .setTimestamp()
        .setURL('https://madglory.com')
        .setFooter('<3 MadGlory, SEMC', client.user.avatarURL())
        .addField(final.naTitle, `${final.na}\n${timer[0]}`, true)
        .addField(final.tnaTitle, `${final.tna}\n${timer[6]}`, true)
        .addField(final.euTitle, `${final.eu}\n${timer[1]}`, true)
        .addField(final.teuTitle, `${final.teu}\n${timer[7]}`, true)
        .addField(final.sgTitle, `${final.sg}\n${timer[2]}`, true)
        .addField(final.tsgTitle, `${final.tsg}\n${timer[9]}`, true)
        .addField(final.saTitle, `${final.sa}\n${timer[2]}`, true)
        .addField(final.tsaTitle, `${final.tsa}\n${timer[9]}`, true)
        .addField(final.cnTitle, `${final.cn}\n${timer[4]}`, true)
        .addField(final.tcnTitle, `${final.tcn}\n${timer[10]}`, true)
        .addField(final.eaTitle, `${final.ea}\n${timer[5]}`, true)
        .addField(final.teaTitle, `${final.tea}\n${timer[11]}`, true)
        .setDescription(mgStatus)
      msg.reply({ embed })
    }, 1300)
  } catch (e) {
    msg.reply('Some error occured with checking Vainglory API Status. A report has been sent to the developers.')
    client.channels.get('331965447039877121').send(`There was an error trying to checking VG API Status: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 30000
}

exports.help = {
  name: 'api',
  description: 'Checks the status of Vainglory API per region.',
  usage: '',
  usageDelim: '',
  extendedHelp: ''
}
