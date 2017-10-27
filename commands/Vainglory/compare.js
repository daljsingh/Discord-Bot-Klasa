const Vainglory = require('vainglory')
const config = require('../../config/config.json')

exports.run = async (client, msg, [ign, region, ign2, region2,
  ign3, region3, ign4, region4, ign5, region5, ign6, region6]) => {
    return msg.reply('This is still in testing, soon you will see some beautiful stuff here')
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
    await vainglory.region(regionKeys[i]).players.getByName(regions[regionKeys[i]]).then((players) => {
      if (players.errors) {
        msg.reply('Please check the IGN and Region and try again. An error report was sent to the developers.')
        console.log(players.errors)
        return
      }
      for (let j = 0; j < players.data.length; j += 1) {
        const attributes = players.data[j].attributes
        const stats = players.player[0].stats
        const total = parseInt(stats.played_casual, 10) + parseInt(stats.played_ranked, 10) + parseInt(stats.played_aral, 10) + parseInt(stats.played_blitz, 10)
        const loss = total - parseInt(attributes.stats.wins, 10)
        level.push([attributes.name, attributes.stats.level])
        winRate.push([attributes.name, Math.round((attributes.stats.wins /
            total) * 100)])
        losses.push([attributes.name, loss])
        wins.push([attributes.name, attributes.stats.wins])
        played.push([attributes.name, total])
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
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['vgc', 'c'],
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


