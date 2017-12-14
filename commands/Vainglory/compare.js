const { Command } = require('klasa')
const config = require('../../config/config.json')
const Vainglory = require('vainglory')
const vg = require('../../functions/vg.js')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'compare',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: ['c', 'vgc'],
      permLevel: 0,
      botPerms: ['EMBED_LINKS'],
      requiredSettings: [],
      description: 'Compares up to 6 player profiles from any regions. Ex: !compare ign1 region ign2 region ign3 region',
      quotedStringSupport: true,
      usage: '<ign:str{1,16}> [region:str{2,4}] <ign2:str{1,16}> [region2:str{2,4}] [ign3:str{1,16}] [region3:str{2,4}] [ign4:str{1,16}] [region4:str{2,4}] [ign5:str{1,16}] [region5:str{2,4}] [ign6:str{1,16}] [region6:str{2,4}]',
      usageDelim: undefined,
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [ign, region, ign2, region2, ign3, region3, ign4, region4, ign5, region5, ign6, region6]) {
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
      switch (possibleRegions[i]) {
        case 'na':
          regions.na = []
          break
        case 'sa':
          regions.sa = []
          break
        case 'sg':
          regions.sg = []
          break
        case 'eu':
          regions.eu = []
          break
        case 'cn':
          regions.cn = []
          break
        case 'ea':
          regions.ea = []
          break
        default:
      }
    }
    for (let i = 0; i < possibleRegions.length; i += 1) {
      switch (possibleRegions[i]) {
        case 'na':
          regions.na.push(possibleIgns[i])
          break
        case 'sa':
          regions.sa.push(possibleIgns[i])
          break
        case 'sg':
          regions.sg.push(possibleIgns[i])
          break
        case 'eu':
          regions.eu.push(possibleIgns[i])
          break
        case 'cn':
          regions.vn.push(possibleIgns[i])
          break
        case 'ea':
          regions.ea.push(possibleIgns[i])
          break
        default:
      }
    }
    const regionKeys = Object.keys(regions)
    for (let i = 0; i < regionKeys.length; i += 1) {
      await vainglory.region(regionKeys[i]).players.getByName(regions[regionKeys[i]]).then(async (players) => {
        if (players.errors) {
          msg.reply(`Please check the IGN and Region and try again. The API returned an error saying incorrect IGN or region for one of the following: ${regions[regionKeys[i]]}`)
          return this.client.channels.get(config.errorLog).send(`**Compare** command with \`IGN:\` ${ign} and \`Region:\` ${region} and \`IGN2:\` ${ign2} and \`Region2:\` ${region2}${ign3 ? ` and \`IGN3:\` ${ign3} and \`Region3:\` ${region3}` : ``}${ign4 ? ` and \`IGN4:\` ${ign4} and \`Region4:\` ${region4}` : ``}${ign5 ? ` and \`IGN5:\` ${ign5} and \`Region5:\` ${region5}` : ``}${ign6 ? ` and \`IGN6:\` ${ign6} and \`Region6:\` ${region6}` : ``}\n\n**User:** ${msg.author.tag}\n\n**Server/Guild:** ${msg.guild.name}\n\n**Channel:** ${msg.channel.name}\n\n**Message:** ${players.messages}\n\n**URL:** ${players.debug.url}`)
        }
        for (let j = 0; j < players.data.length; j += 1) {
          const attributes = players.data[j].attributes
          const stats = players.player[0].stats
          const total = parseInt(stats.played_casual, 10) + parseInt(stats.played_ranked, 10) + parseInt(stats.played_aral, 10) + parseInt(stats.played_blitz, 10)
          const loss = total - parseInt(attributes.stats.wins, 10)
          await level.push([attributes.name, attributes.stats.level])
          await winRate.push([attributes.name, Math.round((attributes.stats.wins /
                total) * 100)])
          await losses.push([attributes.name, loss])
          await wins.push([attributes.name, attributes.stats.wins])
          await played.push([attributes.name, total])
          await ranked.push([attributes.name, attributes.stats.played_ranked])
          await tier.push([attributes.name, attributes.stats.skillTier])
          await eloFo.push([attributes.name, Math.floor(players.player[j].stats.elo_earned_season_4)])
          await eloFi.push([attributes.name, Math.floor(players.player[j].stats.elo_earned_season_5)])
          await eloSi.push([attributes.name, Math.floor(players.player[j].stats.elo_earned_season_6)])
          await eloSe.push([attributes.name, Math.floor(players.player[j].stats.elo_earned_season_7)])
        }
      })
    }
    const embed = new this.client.methods.Embed()
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
      .setColor(0x00AE86)
      .setDescription('Compare yourself against multiple players globally. Who is the best?')
      .setFooter('© Super Evil Megacorp', this.client.user.displayAvatarURL())
      .setURL('http://www.vainglorygame.com')
    await embed.addField('**Level**', compare(this.client, level, false), true)
    await embed.addField('**Win Rate**', compare(this.client, winRate, false), true)
    await embed.addField('**Total Losses**', compare(this.client, losses, false), true)
    await embed.addField('**Total Wins**', compare(this.client, wins, false), true)
    await embed.addField('**Total Matches Played**', compare(this.client, played, false), true)
    await embed.addField('**Total Ranked Played**', compare(this.client, ranked, false), true)
    await embed.addField('**Skill Tier** ', compare(this.client, tier, true), true)
    await embed.addField('**Seasonal Rank**', sortAndPrint(eloFo, eloFi, eloSi, eloSe), true)
    if (ign6) {
      await embed.setTitle(`**${ign}** :vs: **${ign2}** :vs: **${ign3}** :vs: **${ign4}** :vs: **${ign5}** :vs: **${ign6}**`)
    } else if (ign5) {
      await embed.setTitle(`**${ign}** :vs: **${ign2}** :vs: **${ign3}** :vs: **${ign4}** :vs: **${ign5}**`)
    } else if (ign4) {
      await embed.setTitle(`**${ign}** :vs: **${ign2}** :vs: **${ign3}** :vs: **${ign4}**`)
    } else if (ign3) {
      await embed.setTitle(`**${ign}** :vs: **${ign2}** :vs: **${ign3}**`)
    } else {
      await embed.setTitle(`**${ign}** :vs: **${ign2}**`)
    }
    msg.reply({ embed })
  }
}

function compare (client, array, boolean) {
  // Take the array and sort it
  const data = array.sort((a, b) => b[1] - a[1])
  // Create necessary var in order to use below
  let output = ''
  let player = data[0]
  // If VST is the category
  if (boolean) {
    // Place winner at top and Bold
    output += `**${player[0].padEnd(16)} ${vg.VST(player[1])}**\n`
    // Add other players data below without Bold
    for (let i = 1; i < data.length; i++) {
      player = data[i]
      output += `${player[0].padEnd(16)} ${vg.VST(player[1])}\n`
    }
    // If VST is not the category
  } else {
    // Add winner at top and Bold.
    output += `**${player[0].padEnd(16)} ${player[1]}**\n`
    // Add other players data below without bold.
    for (let i = 1; i < data.length; i++) {
      player = data[i]
      output += `${player[0].padEnd(16)} ${player[1]}\n`
    }
  }
  return output
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
