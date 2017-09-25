const Vainglory = require('vainglory')
const config = require('../../config/config.json')

exports.run = async (client, msg, [id, region]) => {
  try {
    const options = {
      host: 'https://api.dc01.gamelockerapp.com/shards/',
      region: (region || 'na'),
      title: 'semc-vainglory'
    }

    const vainglory = new Vainglory(config.vgKey, options)
    const matchId = id
    vainglory.region(region).matches.single(matchId).then((match) => {
      if (match.errors) {
        console.log(match.errors)
        console.log(match)
        return;
      }
      console.log(match)
      const data = {
        region: match.data.attributes.shardId.toUpperCase(),
        gameMode: client.funcs.vgGameModes(match.data.attributes.gameMode),
        duration: match.data.attributes.duration,
        time: match.data.attributes.createdAt,
        teamSide0: match.matchRoster[0].data.attributes.stats.side,
        aces0: match.matchRoster[0].data.attributes.stats.acesEarned,
        tGold0: parseInt(match.matchRoster[0]
          .data.attributes.stats.gold, 10).toLocaleString(),
        tKills0: match.matchRoster[0].data.attributes.stats.heroKills,
        tKrakenCapt0: match.matchRoster[0].data.attributes.stats.krakenCaptures,
        tTurretKills0: match.matchRoster[0].data.attributes.stats.turretKills,
        tTurretLeft0: match.matchRoster[0].data.attributes.stats.turretsRemaining,
        teamSide1: match.matchRoster[1].data.attributes.stats.side,
        aces1: match.matchRoster[1].data.attributes.stats.acesEarned,
        tGold1: parseInt(match.matchRoster[1]
          .data.attributes.stats.gold, 10).toLocaleString(),
        tKills1: match.matchRoster[1].data.attributes.stats.heroKills,
        tKrakenCapt1: match.matchRoster[1].data.attributes.stats.krakenCaptures,
        tTurretKills1: match.matchRoster[1].data.attributes.stats.turretKills,
        tTurretLeft1: match.matchRoster[1].data.attributes.stats.turretsRemaining,
        p1Ign: match.matchRoster[0].rosterParticipants[0]
          .participantPlayer.data.attributes.name,
        p1Hero: client.funcs.vgHeroes(match.matchRoster[0].rosterParticipants[0]
          .data.attributes.actor),
        p1Assists: match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.assists,
        p1Miners: match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.crystalMineCaptures,
        p1Deaths: match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.deaths,
        p1CS: Math.floor(match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.farm),
        p1AFK: match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.firstAfkTime,
        p1Gold: Math.floor(parseInt(match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.gold, 10)).toLocaleString(),
        p1GoldMin: Math.floor(parseInt(match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.gold, 10)),
        p1GMiners: match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.goldMineCaptures,
        p1Items: client.funcs.vgItems(match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.items),
        p1JungleKills: match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.jungleKills,
        p1KarmaLevel: client.funcs.vgKarma(match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.karmaLevel),
        p1Kills: match.matchRoster[0].rosterParticipants[0].data.attributes.stats.kills,
        p1KrakenCaptures: match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.krakenCaptures,
        p1Level: match.matchRoster[0].rosterParticipants[0].data.attributes.stats.level,
        p1MinionKills: match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.minionKills,
        p1nonJungleMinionKills: match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.assists,
        p1VST: client.funcs.vgVST(match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.skillTier),
        p1Skin: match.matchRoster[0].rosterParticipants[0].data.attributes.stats.skinKey,
        p1TurretKills: match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.turretCaptures,
        p1WentAFK: match.matchRoster[0].rosterParticipants[0]
          .data.attributes.stats.wentAfk,
        p2Ign: match.matchRoster[0].rosterParticipants[1]
          .participantPlayer.data.attributes.name,
        p2Hero: client.funcs.vgHeroes(match.matchRoster[0].rosterParticipants[1]
          .data.attributes.actor),
        p2Assists: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.assists,
        p2Miners: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.crystalMineCaptures,
        p2Deaths: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.deaths,
        p2CS: Math.floor(match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.farm),
        p2AFK: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.firstAfkTime,
        p2Gold: Math.floor(parseInt(match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.gold, 10)).toLocaleString(),
        p2GoldMin: Math.floor(parseInt(match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.gold, 10)),
        p2GMiners: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.goldMineCaptures,
        p2Items: client.funcs.vgItems(match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.items),
        p2JungleKills: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.jungleKills,
        p2KarmaLevel: client.funcs.vgKarma(match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.karmaLevel),
        p2Kills: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.kills,
        p2KrakenCaptures: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.krakenCaptures,
        p2Level: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.level,
        p2MinionKills: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.minionKills,
        p2nonJungleMinionKills: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.assists,
        p2VST: client.funcs.vgVST(match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.skillTier),
        p2Skin: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.skinKey,
        p2TurretKills: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.turretCaptures,
        p2WentAFK: match.matchRoster[0].rosterParticipants[1]
          .data.attributes.stats.wentAfk,
        p3Ign: match.matchRoster[0].rosterParticipants[2]
          .participantPlayer.data.attributes.name,
        p3Hero: client.funcs.vgHeroes(match.matchRoster[0].rosterParticipants[2]
          .data.attributes.actor),
        p3Assists: match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.assists,
        p3Miners: match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.crystalMineCaptures,
        p3Deaths: match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.deaths,
        p3CS: Math.floor(match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.farm),
        p3AFK: match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.firstAfkTime,
        p3Gold: Math.floor(parseInt(match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.gold, 10)).toLocaleString(),
        p3GoldMin: Math.floor(parseInt(match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.gold, 10)),
        p3GMiners: match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.goldMineCaptures,
        p3Items: client.funcs.vgItems(match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.items),
        p3JungleKills: match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.jungleKills,
        p3KarmaLevel: client.funcs.vgKarma(match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.karmaLevel),
        p3Kills: match.matchRoster[0].rosterParticipants[2].data.attributes.stats.kills,
        p3KrakenCaptures: match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.krakenCaptures,
        p3Level: match.matchRoster[0].rosterParticipants[2].data.attributes.stats.level,
        p3MinionKills: match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.minionKills,
        p3nonJungleMinionKills: match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.assists,
        p3VST: client.funcs.vgVST(match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.skillTier),
        p3Skin: match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.skinKey,
        p3TurretKills: match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.turretCaptures,
        p3WentAFK: match.matchRoster[0].rosterParticipants[2]
          .data.attributes.stats.wentAfk,
        p4Ign: match.matchRoster[1].rosterParticipants[0]
          .participantPlayer.data.attributes.name,
        p4Hero: client.funcs.vgHeroes(match.matchRoster[1].rosterParticipants[0]
          .data.attributes.actor),
        p4Assists: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.assists,
        p4Miners: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.crystalMineCaptures,
        p4Deaths: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.deaths,
        p4CS: Math.floor(match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.farm),
        p4AFK: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.firstAfkTime,
        p4Gold: Math.floor(parseInt(match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.gold, 10)).toLocaleString(),
        p4GoldMin: Math.floor(parseInt(match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.gold, 10)),
        p4GMiners: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.goldMineCaptures,
        p4Items: client.funcs.vgItems(match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.items),
        p4JungleKills: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.jungleKills,
        p4KarmaLevel: client.funcs.vgKarma(match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.karmaLevel),
        p4Kills: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.kills,
        p4KrakenCaptures: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.krakenCaptures,
        p4Level: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.level,
        p4MinionKills: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.minionKills,
        p4nonJungleMinionKills: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.assists,
        p4VST: client.funcs.vgVST(match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.skillTier),
        p4Skin: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.skinKey,
        p4TurretKills: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.turretCaptures,
        p4WentAFK: match.matchRoster[1].rosterParticipants[0]
          .data.attributes.stats.wentAfk,
        p5Ign: match.matchRoster[1].rosterParticipants[1]
          .participantPlayer.data.attributes.name,
        p5Hero: client.funcs.vgHeroes(match.matchRoster[1].rosterParticipants[1]
          .data.attributes.actor),
        p5Assists: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.assists,
        p5Miners: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.crystalMineCaptures,
        p5Deaths: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.deaths,
        p5CS: Math.floor(match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.farm),
        p5AFK: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.firstAfkTime,
        p5Gold: Math.floor(parseInt(match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.gold, 10)).toLocaleString(),
        p5GoldMin: Math.floor(parseInt(match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.gold, 10)),
        p5GMiners: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.goldMineCaptures,
        p5Items: client.funcs.vgItems(match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.items),
        p5JungleKills: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.jungleKills,
        p5KarmaLevel: client.funcs.vgKarma(match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.karmaLevel),
        p5Kills: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.kills,
        p5KrakenCaptures: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.krakenCaptures,
        p5Level: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.level,
        p5MinionKills: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.minionKills,
        p5nonJungleMinionKills: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.assists,
        p5VST: client.funcs.vgVST(match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.skillTier),
        p5Skin: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.skinKey,
        p5TurretKills: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.turretCaptures,
        p5WentAFK: match.matchRoster[1].rosterParticipants[1]
          .data.attributes.stats.wentAfk,
        p6Ign: match.matchRoster[1].rosterParticipants[2]
          .participantPlayer.data.attributes.name,
        p6Hero: client.funcs.vgHeroes(match.matchRoster[1].rosterParticipants[2]
          .data.attributes.actor),
        p6Assists: match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.assists,
        p6Miners: match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.crystalMineCaptures,
        p6Deaths: match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.deaths,
        p6CS: Math.floor(match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.farm),
        p6AFK: match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.firstAfkTime,
        p6Gold: Math.floor(parseInt(match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.gold, 10)).toLocaleString(),
        p6GoldMin: Math.floor(parseInt(match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.gold, 10)),
        p6GMiners: match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.goldMineCaptures,
        p6Items: client.funcs.vgItems(match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.items),
        p6JungleKills: match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.jungleKills,
        p6KarmaLevel: client.funcs.vgKarma(match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.karmaLevel),
        p6Kills: match.matchRoster[1].rosterParticipants[2].data.attributes.stats.kills,
        p6KrakenCaptures: match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.krakenCaptures,
        p6Level: match.matchRoster[1].rosterParticipants[2].data.attributes.stats.level,
        p6MinionKills: match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.minionKills,
        p6nonJungleMinionKills: match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.assists,
        p6VST: client.funcs.vgVST(match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.skillTier),
        p6Skin: match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.skinKey,
        p6TurretKills: match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.turretCaptures,
        p6WentAFK: match.matchRoster[1].rosterParticipants[2]
          .data.attributes.stats.wentAfk
      }
      const embed = new client.methods.Embed()
        .setTitle(`**${match.matchRoster[1].rosterParticipants[2]
          .participantPlayer.data.attributes.name}** | ${data.region} | ${data.gameMode} | Duration: ${Math.floor(data.duration / 60)}:${data.duration % 60}`)
        .setAuthor(client.user.username, client.user.avatarURL())
        .setColor(match.matchRoster[0].data.attributes.won === 'true' ? '#00C2EC' : '#EE7200')
        .setDescription(`**Blue Team:** Aces: ${data.aces0}    Gold: ${data.tGold0}    Kills: ${data.tKills0}    Krakens: ${data.tKrakenCapt0}    Turret Kills/Left: ${data.tTurretKills0}/${data.tTurretLeft0}
**Red  Team:** Aces: ${data.aces1}    Gold: ${data.tGold1}    Kills: ${data.tKills1}     Krakens: ${data.tKrakenCapt1}    Turret Kills/Left: ${data.tTurretKills1}/${data.tTurretLeft1}`)
        .setFooter('<3 MadGlory', client.user.avatarURL())
        .setURL('https://vgpro.gg/')
        .addField('Blue Team', `${client.funcs.vgMatches(data, match.matchRoster[0].rosterParticipants[0]
          .participantPlayer.data.attributes.name, 1)}\n\n${client.funcs.vgMatches(data, match.matchRoster[0].rosterParticipants[1]
          .participantPlayer.data.attributes.name, 2)}\n\n${client.funcs.vgMatches(data, match.matchRoster[0].rosterParticipants[2]
          .participantPlayer.data.attributes.name, 3)}`)
        .addField('Red Team', `${client.funcs.vgMatches(data, match.matchRoster[1].rosterParticipants[0]
          .participantPlayer.data.attributes.name, 4)}\n\n${client.funcs.vgMatches(data, match.matchRoster[1].rosterParticipants[1]
          .participantPlayer.data.attributes.name, 5)}\n\n${client.funcs.vgMatches(data, match.matchRoster[1].rosterParticipants[2]
          .participantPlayer.data.attributes.name, 6)}`)
      msg.channel.send({ embed })
    }).catch((errors) => {
      console.log(errors)
    })
  } catch (e) {
    msg.reply('Some error occured with match by id. A report has been sent to the developers.')
    client.channels.get('341020497309597696').send(`There was an error trying to get match by id: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['vgmi'],
  permLevel: 4,
  botPerms: [],
  requiredFuncs: ['capitalize', 'vgGameModes', 'vgHeroes', 'vgVST', 'vgKarma', 'vgItems', 'vgMatches'],
  cooldown: 0
}

exports.help = {
  name: 'matchesId',
  description: 'Get your VG Profile here. Just type .player!',
  usage: '<id:str> [region:na|sa|eu|sg]',
  usageDelim: ' ',
  extendedHelp: 'vgp IGN Region'
}
