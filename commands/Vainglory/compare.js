const Vainglory = require('vainglory')
const config = require('../../config/config.json')

exports.run = async (client, msg, [ign, region, ign2, region2,
  ign3, region3, ign4, region4, ign5, region5, ign6, region6]) => {
  try {
    const options = {
      host: 'https://api.dc01.gamelockerapp.com/shards/',
      region: (region || 'na'),
      title: 'semc-vainglory'
    }
    const vainglory = new Vainglory(config.vgKey, options)
    const regions = {}
    const level = []
    const winRate = []
    const losses = []
    const gold = []
    const wins = []
    const played = []
    const ranked = []
    const tier = []
    const eloFo = []
    const eloFi = []
    const eloSi = []
    const eloSe = []
    const possibleRegions = [region, region2, region3, region4, region5, region6]
    const possibleIgns = [ign, ign2, ign3, ign4, ign5, ign6]
    for (let i = 0; i < possibleRegions.length; i += 1) {
      if (possibleRegions[i] === 'na') {
        regions.na = []
      } else if (possibleRegions[i] === 'sa') {
        regions.sa = []
      } else if (possibleRegions[i] === 'sg') {
        regions.sg = []
      } else if (possibleRegions[i] === 'eu') {
        regions.eu = []
      } else if (possibleRegions[i] === 'cn') {
        regions.cn = []
      } else if (possibleRegions[i] === 'ea') {
        regions.ea = []
      }
    }
    for (let i = 0; i < possibleRegions.length; i += 1) {
      if (possibleRegions[i] === 'na') {
        regions.na.push(possibleIgns[i])
      } else if (possibleRegions[i] === 'sa') {
        regions.sa.push(possibleIgns[i])
      } else if (possibleRegions[i] === 'sg') {
        regions.sg.push(possibleIgns[i])
      } else if (possibleRegions[i] === 'eu') {
        regions.eu.push(possibleIgns[i])
      } else if (possibleRegions[i] === 'cn') {
        regions.cn.push(possibleIgns[i])
      } else if (possibleRegions[i] === 'ea') {
        regions.ea = []
      }
    }
    const regionKeys = Object.keys(regions)
    for (let i = 0; i < regionKeys.length; i += 1) {
      vainglory.region(regionKeys[i]).players.getByName(regions[regionKeys[i]]).then((players) => {
        if (players.errors) {
          msg.reply('Please check the IGN and Region and try again. An error report was sent to the developers.')
          console.log(players.errors)
          return
        }
        for (let j = 0; j < players.data.length; j += 1) {
          const attributes = players.data[j].attributes
          level.push([attributes.name, attributes.stats.level])
          winRate.push([attributes.name, Math.round((attributes.stats.wins /
            attributes.stats.played) * 100)])
          losses.push([attributes.name, attributes.stats.played - attributes.stats.wins])
          wins.push([attributes.name, attributes.stats.wins])
          played.push([attributes.name, attributes.stats.played])
          ranked.push([attributes.name, attributes.stats.played_ranked])
          tier.push([attributes.name, attributes.stats.skillTier])
          eloFo.push([attributes.name, Math.floor(players.player[j].stats.elo_earned_season_4)])
          eloFi.push([attributes.name, Math.floor(players.player[j].stats.elo_earned_season_5)])
          eloSi.push([attributes.name, Math.floor(players.player[j].stats.elo_earned_season_6)])
          eloSe.push([attributes.name, Math.floor(players.player[j].stats.elo_earned_season_7)])
        }
      })
    }
    setTimeout(() => {
      const embed = new client.methods.Embed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setColor(0x00AE86)
        .setDescription('Compare yourself against multiple players globally. Who is the best?')
        .setFooter('<3 MadGlory, SEMC', client.user.avatarURL())
        .setURL('http://discord.me/EZL')
        .addField('__Level__', client.funcs.vgVSTCompare(client, level, false), true)
        .addField('__Win Rate__', client.funcs.vgVSTCompare(client, winRate, false), true)
        .addField('__Total Losses__', client.funcs.vgVSTCompare(client, losses, false), true)
        .addField('__Total Wins__', client.funcs.vgVSTCompare(client, wins, false), true)
        .addField('__Total Matches Played__', client.funcs.vgVSTCompare(client, played, false), true)
        .addField('__Total Ranked Played__', client.funcs.vgVSTCompare(client, ranked, false), true)
        .addField('__Skill Tier__ ', client.funcs.vgVSTCompare(client, tier, true), true)
        .addField('__Season VST__', sortAndPrint(eloFo, eloFi, eloSi, eloSe), true)
      if (ign6) {
        embed.setTitle(`**${ign}** :vs: **${ign2}** :vs: **${ign3}** :vs: **${ign4}** :vs: **${ign5}** :vs: **${ign6}**`)
      } else if (ign5) {
        embed.setTitle(`**${ign}** :vs: **${ign2}** :vs: **${ign3}** :vs: **${ign4}** :vs: **${ign5}**`)
      } else if (ign4) {
        embed.setTitle(`**${ign}** :vs: **${ign2}** :vs: **${ign3}** :vs: **${ign4}**`)
      } else if (ign3) {
        embed.setTitle(`**${ign}** :vs: **${ign2}** :vs: **${ign3}**`)
      } else {
        embed.setTitle(`**${ign}** :vs: **${ign2}**`)
      }
      msg.reply({ embed })
    }, 1000)
    const lotto = 'vg'
    return lotto
  } catch (e) {
    msg.reply('Some error occured with xxxxxx. A report has been sent to the developers.')
    client.channels.get('331965447039877121').send(`There was an error trying to xxxxxx: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['vgc'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: ['vgVST', 'vgVSTCompare'],
  cooldown: 0
}

exports.help = {
  name: 'compare',
  description: 'Command Description',
  usage: '<ign:str{1,16}> [region:str{2,4}] <ign2:str{1,16}> [region2:str{2,4}] [ign3:str{1,16}] [region3:str{2,4}] [ign4:str{1,16}] [region4:str{2,4}] [ign5:str{1,16}] [region5:str{2,4}] [ign6:str{1,16}] [region6:str{2,4}]',
  usageDelim: ' ',
  extendedHelp: ''
}

function sortAndPrint (eloFo, eloFi, eloSi, eloSe) {
  // Sorting all the elo arrays
  eloFo = eloFo.sort(function (a, b) {
    return b[1] - a[1]
  })
  eloFi = eloFi.sort(function (a, b) {
    return b[1] - a[1]
  })
  eloSi = eloSi.sort(function (a, b) {
    return b[1] - a[1]
  })
  eloSe = eloSe.sort(function (a, b) {
    return b[1] - a[1]
  })
  let prints = []
  // Starting to make the player strings for ELO
  for (let i = 0; i < eloFo.length; i++) {
    prints.push([eloFo[i][0], `${eloFo[i][0]}: `])
  }
  // Adding Season 4 elo’s to the player strings
  let answer = ``
  saveLines(eloFo, prints, 4, ': ')
  saveLines(eloFi, prints, 5, ': ')
  saveLines(eloSi, prints, 6, ': ')
  saveLines(eloSe, prints, 7, ': ')
  // adding all the player lines into one big string
  for (let i = 0; i < prints.length; i++) { answer += i !== prints.length - 1 ? `${prints[i][1]}\n` : `${prints[i][1]}` }
  return answer
}
function saveLines (arr, prints, number, preceding) {
  // LOOPING THROUGH THE ARRAY WITH ELOS... PRINTS HOLDS THE STRINGS WE WANT IN EMBED
  for (let i = 0; i < arr.length; i++) {
    let index = 0
    // THIS FINDS THE INDEX ON PRINTS WHICH HOLDS THE SAME PLAYER AS ARR[i]
    for (index = 0; index < prints.length; index++) {
      if (prints[index][0] === arr[i][0]) break
    }
    // IF THE ELO IS 0 DO NOT INCLUDE IN THE STRING (continue goes to the next iteration of a loop which is the outer one in this case)
    if (arr[i][1] === 0) continue
    // IF THE PLAYER ELO IS THE HIGHEST (FIRST ELEMENT) ADD BOLDED ELO OTHERWISE DONT
    if (i === 0) {
      // IF THE HIGHEST PLAYER ELO ==2nd HIGHEST PLAYER ELO DONT INCLUDE BOLD BECAUSE NO ONE WON
      if (arr[i][0] === arr[i][1]) { prints[index][1] += prints[index][1].charAt(prints[index][1].length - 1) === ` ` ? `${number}:${arr[i][1]}` : `${preceding}${number}:${arr[i][1]}` } else {
      /// ELSE ADD BOLDING
        prints[index][1] += prints[index][1].charAt(prints[index][1].length - 1) === ` ` ? `${number}: **${arr[i][1]}**` : `${preceding}${number}: **${arr[i][1]}**`
      }
    } else {
      // SECOND AND SUBSEQUENT PLAYERS WHO DONT HAVE HIGHEST ELOS GET THEIR NUMBERS ADDED eg. DestinyKarma- (season#):(season elo)
      prints[index][1] += prints[index][1].charAt(prints[index][1].length - 1) === ` ` ? `${number}: ${arr[i][1]}` : `${preceding}${number}: ${arr[i][1]}`
    }
  }
}
