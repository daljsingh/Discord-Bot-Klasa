const Vainglory = require('vainglory')
const config = require('../../config/config.json')

exports.run = async (client, msg, [ign, region]) => {
  try {
    /* Options for calling VG API */
    const options = {
      host: 'https://api.dc01.gamelockerapp.com/shards/',
      /* Default NA region */
      region: (region || 'na'),
      title: 'semc-vainglory'
    }
    const vainglory = new Vainglory(config.vgKey, options)
    /* Must take an array */
    const playerNames = []
    playerNames.push(ign)
    vainglory.players.getByName(playerNames).then((players) => {
      if (players.errors) {
        msg.reply('Please check the IGN and Region and try again. An error report was sent to the developers.')
        return console.log(players)
      }
      const stats = players.player[0].stats
      const total = stats.played_casual + stats.played_ranked + stats.played_aral + stats.played_blitz
      const embed = new client.methods.Embed()
        .setTitle(`**${ign}** | **Lvl:** ${stats.level} | **K**: ${client.funcs.vgKarma(stats.karmaLevel)}`)
        .setAuthor(client.user.username, client.user.avatarURL())
        .setColor(0x00AE86)
        .setDescription('Vg Profile Data')
        .setFooter('© Esports Zodiac League LLC | <3 MadGlory, SEMC, NodeJs', client.user.avatarURL())
        .setTimestamp()
        .setURL(`https://vgpro.gg/players/${region}/${ign}`)
        .addField('**__Lifetime Stats__**',
          `**Win Rate:** ${Math.round((stats.wins / stats.played) * 100)} | **Wins:** ${stats.wins} | **Lost:** ${total - stats.wins} | **Played:** ${stats.total} | **Rank Matches:** ${stats.played_ranked}
**Blitz Matches:** ${stats.played_blitz} | **BR Matches:** ${stats.played_aral} | **Casual Matches:** ${stats.played_casual}`)
        .addField('**__Current Streaks__** (Hopefully SEMC Fixes This Soon!)', `**Wins:** ${stats.winStreak} | **Loss:** ${stats.lossStreak}`)
        .addField('**__End Of Season VST(Not Trophies)__**', `**Season 4:** ${Math.round(stats.elo_earned_season_4)}
**Season 5:** ${Math.round(stats.elo_earned_season_5)}
**Season 6:** ${Math.round(stats.elo_earned_season_6)}
**Season 7:** ${Math.round(stats.elo_earned_season_7)}`)
      msg.reply({ embed })
    })
    const lotto = 'vg'
    return lotto
  } catch (e) {
    msg.reply('Some error occured with player. A report has been sent to the developers.')
    client.channels.get('341020497309597696').send(`There was an error trying to get player profile: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['vgp'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: ['vgKarma'],
  cooldown: 0
}

exports.help = {
  name: 'player',
  description: 'Get your VG Profile here. Just type .player!',
  usage: '<ign:str{1,16}> [na|sa|eu|sea|sg|ea|cn|tna|teu|tsa|tsea|tsg|tea|tcn]',
  usageDelim: ' ',
  extendedHelp: 'vgp IGN Region'
}
