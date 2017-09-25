const Vainglory = require('vainglory')
const config = require('../../config/config.json')
const moment = require('moment')
moment().format()

exports.run = async (client, msg, [ign, region, ...mode]) => {
  const gameModes = {
    'private casual': 0,
    'private blitz': 0,
    'private draft': 0,
    'private battle royale': 0,
    'blitz': 0,
    'casual': 0,
    'ranked': 0,
    'battle royale': 0
  }
  const heroes = {
    'adagio': 0,
    'alpha': 0,
    'ardan': 0,
    'baron': 0,
    'baptiste': 0,
    'blackfeather': 0,
    'catherine': 0,
    'celeste': 0,
    'flicker': 0,
    'fortress': 0,
    'glaive': 0,
    'grace': 0,
    'grumpjaw': 0,
    'gwen': 0,
    'idris': 0,
    'joule': 0,
    'kestrel': 0,
    'koshka': 0,
    'krul': 0,
    'lance': 0,
    'lyra': 0,
    'ozo': 0,
    'petal': 0,
    'phinn': 0,
    'reim': 0,
    'reza': 0,
    'ringo': 0,
    'rona': 0,
    'samuel': 0,
    'saw': 0,
    'skaarf': 0,
    'skye': 0,
    'taka': 0,
    'vox': 0
  }
  let sortedGames = []
  let sortedHeroes = []
  let rosterI
  let rosterP
  let wins = 0
  let afk = 0
  let hSkillTier = 0
  let krakens = 0
  let miners = 0
  let durations = 0
  let laneM = 0
  let jungleM = 0
  let farms = 0
  let golds = 0
  let allModes = []
  // Take the user input of game mode and convert it to the game mode that the code understands br -> Battle Royale
  for (let i = 0; i < mode.length; i++) {
    allModes.push(client.funcs.vgModeGames(mode[i]))
  }
  const now = new Date()
  const minus28Days = new Date((new Date() * 1) - 2419200000)
  const options = {
    page: {
      offset: 0,
      limit: 50
    },
    sort: '-createdAt', // -createdAt for reverse
    filter: {
      gameMode: allModes,
      'createdAt-start': minus28Days.toISOString(), // ISO Date
      'createdAt-end': now.toISOString(), // ISO Date
      playerNames: [`${ign}`]
    }
  }
  const vainglory = new Vainglory(config.vgKey, options)
  if (region === 'sea') {
    region = 'sg'
  } else if (region === 't-sea') {
    region = 't-sg'
  }
  vainglory.region(region).matches.collection(options).then((matches) => {
    if (matches.errors) {
      msg.reply('Please check the IGN and Region and try again. An error report was sent to the developers.')
      return console.log(matches)
    }
    for (let i = 0; i < matches.match.length; i++) {
      gameModes[client.funcs.vgGameModes(matches.match[i].data.attributes.gameMode).toLowerCase()]++
      // Loop every player in every match to check which the IGN is.
      for (let a = 0; a < 3; a++) {
        // Checks Blue side
        if (matches.match[i].matchRoster[0].rosterParticipants[a].participantPlayer.data.attributes.name === ign) {
          rosterI = 0
          rosterP = a
          break
          // Checks Red side
        } else if (matches.match[i].matchRoster[1].rosterParticipants[a].participantPlayer.data.attributes.name === ign) {
          rosterI = 1
          rosterP = a
          break
        }
      }
      // Add the value of each person to their respective vars
      golds += Math.round(matches.match[i].matchRoster[rosterI].rosterParticipants[rosterP].data.attributes.stats.gold)
      farms += Math.round(matches.match[i].matchRoster[rosterI].rosterParticipants[rosterP].data.attributes.stats.farm)
      laneM += matches.match[i].matchRoster[rosterI].rosterParticipants[rosterP].data.attributes.stats.nonJungleMinionKills
      jungleM += matches.match[i].matchRoster[rosterI].rosterParticipants[rosterP].data.attributes.stats.jungleKills
      durations += matches.match[i].data.attributes.duration
      if (matches.match[i].matchRoster[rosterI].rosterParticipants[rosterP].data.attributes.stats.skillTier > hSkillTier) {
        hSkillTier = matches.match[i].matchRoster[rosterI].rosterParticipants[rosterP].data.attributes.stats.skillTier
      }
      krakens += matches.match[i].matchRoster[rosterI].rosterParticipants[rosterP].data.attributes.stats.krakenCaptures
      miners += matches.match[i].matchRoster[rosterI].rosterParticipants[rosterP].data.attributes.stats.crystalMineCaptures + matches.match[i].matchRoster[rosterI].rosterParticipants[rosterP].data.attributes.stats.goldMineCaptures
      // Add 1 to wins if the person won
      if (matches.match[i].matchRoster[rosterI].data.attributes.won === 'true') wins++
      // Remove all * in hero names
      heroes[matches.match[i].matchRoster[rosterI].rosterParticipants[rosterP].data.attributes.actor.replace(/\*/g, '').toLowerCase()]++
      // Add 1 to afk counter if person AFK
      if (matches.match[i].matchRoster[rosterI].rosterParticipants[rosterP].data.attributes.stats.wentAfk === true) afk++
    }
    // Sorting and converting the objects into arrays to call them
    for (let i in gameModes) {
      sortedGames.push([i, gameModes[i]])
    }
    for (let i in heroes) {
      sortedHeroes.push([i, heroes[i]])
    }
    sortedGames = sortedGames.sort(function (a, b) {
      return b[1] - a[1]
    })
    sortedHeroes = sortedHeroes.sort(function (a, b) {
      return b[1] - a[1]
    })
    let gameString = ``
    let gameHero = ``
    // Converting array into embed format 
    for (let b = 0; b < sortedGames.length; b++) {
      if (b === 3) break
      gameString += sortedGames[b][1] === 0 ? `` : `**${b + 1}:** ${client.funcs.toTitleCase(sortedGames[b][0])}: ${sortedGames[b][1]}\n`
    }
    for (let c = 0; c < sortedHeroes.length; c++) {
      if (c === 3) break
      gameHero += sortedHeroes[c][1] === 0 ? `` : `**${c + 1}:** ${client.funcs.vgHeroes(`*${client.funcs.toTitleCase(sortedHeroes[c][0])}*`)}\n`
    }
    const embed = new client.methods.Embed()
      .setTitle('See Even More At VGPRO.GG Here')
      .setAuthor(ign, client.user.avatarURL())
      .setColor(0x00AE86)
      .setDescription(`Stats of **${matches.match.length}** games played since 28 days ago`)
      .setFooter('<3 MadGlory, SEMC', client.user.avatarURL())
      .setURL(`https://vgpro.gg/players/${region}/${ign}`)
      .addField(`__Last Played__`, `Mode: ${client.funcs.vgGameModes(matches.match[0].data.attributes.gameMode)}
Date: ${moment(matches.match[0].data.attributes.createdAt)}`, true)
      .addField(`__Game Mode__`, `${gameString}`, true)
      .addField(`__Favorite Heroes__`, `${gameHero}`, true)
      .addField(`__Total Stats__`, `Kraken Captures: ${krakens}
Miner Captures: ${miners}
Lane Minions: ${laneM}
Jungle Minions: ${jungleM}`, true)
      .addField('__Average Stats__', `Highest VST: ${client.funcs.vgVST(hSkillTier)}
Win Rate: ${Math.round(wins / matches.match.length * 100)}%
Afk Rate: ${Math.round(afk / matches.match.length * 100)}%
CS/min: ${Math.round(farms / durations * 60)}
Gold/sec: ${Math.round(golds / durations)}`, true)
    return msg.reply({ embed })
  })
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['vgs'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: ['capitalize', 'vgModeGames', 'vgGameModes', 'vgHeroes', 'vgVST', 'vgKarma', 'vgItems'],
  cooldown: 0
}

exports.help = {
  name: 'stats',
  description: 'See your stats based on the matches made in last 28 days. You can also filter by game modes.',
  usage: '<ign:str{1,16}> [na|sa|eu|sea|sg|ea|cn|tna|teu|tsa|tsea|tsg|tea|tcn] [mode:str{1,16}] [...]',
  usageDelim: ' ',
  extendedHelp: 'vgs IGN Region'
}
