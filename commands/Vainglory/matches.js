const Vainglory = require('vainglory')
const config = require('../../config/config.json')

exports.run = async (client, msg, [ign, region]) => {
  try {
    const now = new Date()
    const minus28Days = new Date((new Date() * 1) - 2419200000)
    const options = {
      page: {
        offset: 0,
        limit: 50
      },
      sort: '-createdAt', // -createdAt for reverse
      filter: {
        'createdAt-start': minus28Days.toISOString(), // ISO Date
        'createdAt-end': now.toISOString(), // ISO Date
        playerNames: [`${ign}`]
      }
    }
    const vainglory = new Vainglory(config.vgKey, options)
    vainglory.region(region).matches.collection(options).then((matches) => {
      if (matches.errors) {
        msg.reply('Please check the IGN and Region and try again. An error report was sent to the developers.')
        return console.log(matches)
      }
      for (let i = 0; i < 5; i++) {
        console.log(matches.match[i].matchRoster[0].rosterParticipants[0]
          .data.attributes.actor)
        console.log(matches.match[i].matchRoster[0].rosterParticipants[1]
          .data.attributes.actor)
        console.log(matches.match[i].matchRoster[0].rosterParticipants[2]
          .data.attributes.actor)
        console.log(matches.match[i].matchRoster[1].rosterParticipants[0]
          .data.attributes.actor)
        console.log(matches.match[i].matchRoster[1].rosterParticipants[1]
          .data.attributes.actor)
        console.log(matches.match[i].matchRoster[1].rosterParticipants[2]
          .data.attributes.actor)
      }

      /* Create a object with all the pieces of data that matches return that is useful 
      to report to be able to easily call it. Eventually this will be in mongo */
      const data = {
        region: matches.match[0].data.attributes.shardId.toUpperCase(),
        gameMode: client.funcs.vgGameModes(matches.match[0].data.attributes.gameMode),
        duration: matches.match[0].data.attributes.duration,
        time: matches.match[0].data.attributes.createdAt,
        teamSide0: matches.match[0].matchRoster[0].data.attributes.stats.side,
        aces0: matches.match[0].matchRoster[0].data.attributes.stats.acesEarned,
        tGold0: parseInt(matches.match[0].matchRoster[0].data.attributes.stats.gold, 10).toLocaleString(),
        tKills0: matches.match[0].matchRoster[0].data.attributes.stats.heroKills,
        tKrakenCapt0: matches.match[0].matchRoster[0].data.attributes.stats.krakenCaptures,
        tTurretKills0: matches.match[0].matchRoster[0].data.attributes.stats.turretKills,
        tTurretLeft0: matches.match[0].matchRoster[0].data.attributes.stats.turretsRemaining,
        teamSide1: matches.match[0].matchRoster[1].data.attributes.stats.side,
        aces1: matches.match[0].matchRoster[1].data.attributes.stats.acesEarned,
        tGold1: parseInt(matches.match[0].matchRoster[1].data.attributes.stats.gold, 10).toLocaleString(),
        tKills1: matches.match[0].matchRoster[1].data.attributes.stats.heroKills,
        tKrakenCapt1: matches.match[0].matchRoster[1].data.attributes.stats.krakenCaptures,
        tTurretKills1: matches.match[0].matchRoster[1].data.attributes.stats.turretKills,
        tTurretLeft1: matches.match[0].matchRoster[1].data.attributes.stats.turretsRemaining,
        p1Ign: matches.match[0].matchRoster[0].rosterParticipants[0].participantPlayer.data.attributes.name,
        p1Hero: client.funcs.vgHeroes(matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.actor),
        p1Assists: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.assists,
        p1Miners: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.crystalMineCaptures,
        p1Deaths: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.deaths,
        p1CS: Math.floor(matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.farm),
        p1AFK: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.firstAfkTime,
        p1Gold: Math.floor(parseInt(matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.gold, 10)).toLocaleString(),
        p1GoldMin: Math.floor(parseInt(matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.gold, 10)),
        p1GMiners: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.goldMineCaptures,
        p1Items: client.funcs.vgItems(matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.items),
        p1JungleKills: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.jungleKills,
        p1KarmaLevel: client.funcs.vgKarma(matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.karmaLevel),
        p1Kills: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.kills,
        p1KrakenCaptures: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.krakenCaptures,
        p1Level: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.level,
        p1MinionKills: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.minionKills,
        p1nonJungleMinionKills: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.assists,
        p1VST: client.funcs.vgVST(matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.skillTier),
        p1Skin: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.skinKey,
        p1TurretKills: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.turretCaptures,
        p1WentAFK: matches.match[0].matchRoster[0].rosterParticipants[0].data.attributes.stats.wentAfk,
        p2Ign: matches.match[0].matchRoster[0].rosterParticipants[1].participantPlayer.data.attributes.name,
        p2Hero: client.funcs.vgHeroes(matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.actor),
        p2Assists: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.assists,
        p2Miners: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.crystalMineCaptures,
        p2Deaths: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.deaths,
        p2CS: Math.floor(matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.farm),
        p2AFK: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.firstAfkTime,
        p2Gold: Math.floor(parseInt(matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.gold, 10)).toLocaleString(),
        p2GoldMin: Math.floor(parseInt(matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.gold, 10)),
        p2GMiners: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.goldMineCaptures,
        p2Items: client.funcs.vgItems(matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.items),
        p2JungleKills: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.jungleKills,
        p2KarmaLevel: client.funcs.vgKarma(matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.karmaLevel),
        p2Kills: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.kills,
        p2KrakenCaptures: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.krakenCaptures,
        p2Level: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.level,
        p2MinionKills: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.minionKills,
        p2nonJungleMinionKills: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.assists,
        p2VST: client.funcs.vgVST(matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.skillTier),
        p2Skin: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.skinKey,
        p2TurretKills: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.turretCaptures,
        p2WentAFK: matches.match[0].matchRoster[0].rosterParticipants[1].data.attributes.stats.wentAfk,
        p3Ign: matches.match[0].matchRoster[0].rosterParticipants[2].participantPlayer.data.attributes.name,
        p3Hero: client.funcs.vgHeroes(matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.actor),
        p3Assists: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.assists,
        p3Miners: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.crystalMineCaptures,
        p3Deaths: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.deaths,
        p3CS: Math.floor(matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.farm),
        p3AFK: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.firstAfkTime,
        p3Gold: Math.floor(parseInt(matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.gold, 10)).toLocaleString(),
        p3GoldMin: Math.floor(parseInt(matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.gold, 10)),
        p3GMiners: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.goldMineCaptures,
        p3Items: client.funcs.vgItems(matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.items),
        p3JungleKills: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.jungleKills,
        p3KarmaLevel: client.funcs.vgKarma(matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.karmaLevel),
        p3Kills: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.kills,
        p3KrakenCaptures: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.krakenCaptures,
        p3Level: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.level,
        p3MinionKills: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.minionKills,
        p3nonJungleMinionKills: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.assists,
        p3VST: client.funcs.vgVST(matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.skillTier),
        p3Skin: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.skinKey,
        p3TurretKills: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.turretCaptures,
        p3WentAFK: matches.match[0].matchRoster[0].rosterParticipants[2].data.attributes.stats.wentAfk,
        p4Ign: matches.match[0].matchRoster[1].rosterParticipants[0].participantPlayer.data.attributes.name,
        p4Hero: client.funcs.vgHeroes(matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.actor),
        p4Assists: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.assists,
        p4Miners: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.crystalMineCaptures,
        p4Deaths: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.deaths,
        p4CS: Math.floor(matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.farm),
        p4AFK: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.firstAfkTime,
        p4Gold: Math.floor(parseInt(matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.gold, 10)).toLocaleString(),
        p4GoldMin: Math.floor(parseInt(matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.gold, 10)),
        p4GMiners: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.goldMineCaptures,
        p4Items: client.funcs.vgItems(matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.items),
        p4JungleKills: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.jungleKills,
        p4KarmaLevel: client.funcs.vgKarma(matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.karmaLevel),
        p4Kills: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.kills,
        p4KrakenCaptures: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.krakenCaptures,
        p4Level: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.level,
        p4MinionKills: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.minionKills,
        p4nonJungleMinionKills: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.assists,
        p4VST: client.funcs.vgVST(matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.skillTier),
        p4Skin: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.skinKey,
        p4TurretKills: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.turretCaptures,
        p4WentAFK: matches.match[0].matchRoster[1].rosterParticipants[0].data.attributes.stats.wentAfk,
        p5Ign: matches.match[0].matchRoster[1].rosterParticipants[1].participantPlayer.data.attributes.name,
        p5Hero: client.funcs.vgHeroes(matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.actor),
        p5Assists: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.assists,
        p5Miners: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.crystalMineCaptures,
        p5Deaths: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.deaths,
        p5CS: Math.floor(matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.farm),
        p5AFK: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.firstAfkTime,
        p5Gold: Math.floor(parseInt(matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.gold, 10)).toLocaleString(),
        p5GoldMin: Math.floor(parseInt(matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.gold, 10)),
        p5GMiners: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.goldMineCaptures,
        p5Items: client.funcs.vgItems(matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.items),
        p5JungleKills: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.jungleKills,
        p5KarmaLevel: client.funcs.vgKarma(matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.karmaLevel),
        p5Kills: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.kills,
        p5KrakenCaptures: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.krakenCaptures,
        p5Level: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.level,
        p5MinionKills: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.minionKills,
        p5nonJungleMinionKills: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.assists,
        p5VST: client.funcs.vgVST(matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.skillTier),
        p5Skin: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.skinKey,
        p5TurretKills: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.turretCaptures,
        p5WentAFK: matches.match[0].matchRoster[1].rosterParticipants[1].data.attributes.stats.wentAfk,
        p6Ign: matches.match[0].matchRoster[1].rosterParticipants[2].participantPlayer.data.attributes.name,
        p6Hero: client.funcs.vgHeroes(matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.actor),
        p6Assists: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.assists,
        p6Miners: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.crystalMineCaptures,
        p6Deaths: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.deaths,
        p6CS: Math.floor(matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.farm),
        p6AFK: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.firstAfkTime,
        p6Gold: Math.floor(parseInt(matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.gold, 10)).toLocaleString(),
        p6GoldMin: Math.floor(parseInt(matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.gold, 10)),
        p6GMiners: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.goldMineCaptures,
        p6Items: client.funcs.vgItems(matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.items),
        p6JungleKills: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.jungleKills,
        p6KarmaLevel: client.funcs.vgKarma(matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.karmaLevel),
        p6Kills: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.kills,
        p6KrakenCaptures: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.krakenCaptures,
        p6Level: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.level,
        p6MinionKills: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.minionKills,
        p6nonJungleMinionKills: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.assists,
        p6VST: client.funcs.vgVST(matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.skillTier),
        p6Skin: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.skinKey,
        p6TurretKills: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.turretCaptures,
        p6WentAFK: matches.match[0].matchRoster[1].rosterParticipants[2].data.attributes.stats.wentAfk
      }
      const embed = new client.methods.Embed()
        .setTitle(`**${ign}** | ${data.region} | ${data.gameMode} | Duration: ${Math.floor(data.duration / 60)}:${data.duration % 60}`)
        .setAuthor(client.user.username, client.user.avatarURL())
        .setColor(matches.match[0].matchRoster[0].data.attributes.won === 'true' ? '#00C2EC' : '#EE7200')
        .setDescription(`**Blue Team:** Aces: ${data.aces0}    Gold: ${data.tGold0}    Kills: ${data.tKills0}    Krakens: ${data.tKrakenCapt0}    Turret Kills/Left: ${data.tTurretKills0}/${data.tTurretLeft0}
**Red  Team:** Aces: ${data.aces1}    Gold: ${data.tGold1}    Kills: ${data.tKills1}     Krakens: ${data.tKrakenCapt1}    Turret Kills/Left: ${data.tTurretKills1}/${data.tTurretLeft1}`)
        .setFooter('<3 MadGlory', client.user.avatarURL())
        .setURL(`https://vgpro.gg/players/${region}/${ign}`)
        .addField('Blue Team', `${client.funcs.vgMatches(data, ign, 1)}\n\n${client.funcs.vgMatches(data, ign, 2)}\n\n${client.funcs.vgMatches(data, ign, 3)}`)
        .addField('Red Team', `${client.funcs.vgMatches(data, ign, 4)}\n\n${client.funcs.vgMatches(data, ign, 5)}\n\n${client.funcs.vgMatches(data, ign, 6)}`)
      msg.channel.send({ embed })
    }).catch((errors) => {
      console.log(errors)
    })
    const lotto = 'vg'
    return lotto
  } catch (e) {
    msg.reply('Some error occured with matches. A report has been sent to the developers.')
    client.channels.get('341020497309597696').send(`There was an error trying to get player matches: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['vgm'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: ['capitalize', 'vgGameModes', 'vgHeroes', 'vgVST', 'vgKarma', 'vgItems', 'vgMatches'],
  cooldown: 0
}

exports.help = {
  name: 'matches',
  description: 'Get your VG matches here!',
  usage: '<ign:str{1,16}> [na|sa|eu|sea|sg|ea|cn|tna|teu|tsa|tsea|tsg|tea|tcn] [amount:int{1,50}]',
  usageDelim: ' ',
  extendedHelp: 'vgm IGN Region'
}
