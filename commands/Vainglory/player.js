const Vainglory = require('vainglory')
const config = require('../../config/config.json')

exports.run = async (client, msg, [ign, server]) => {
  try {
    let region = server
    if (server === 'sea') {
      region = 'sg'
    }
    if (!ign) {
      const name = await client.funcs.useIGN(client, msg)
      ign = name.ign
      region = name.region
    }
    if (!ign) return msg.channel.send('Are you sure you did the save command first? **$save IGN region**')
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
    await vainglory.players.getByName(playerNames).then((players) => {
      if (players.errors) {
        msg.reply('Please check the IGN and Region and try again. An error report was sent to the developers.')
        return console.log(players)
      }
      
      const stats = players.player[0].stats
      console.log(stats)
      const total = parseInt(stats.played_casual, 10) + parseInt(stats.played_ranked, 10) + parseInt(stats.played_aral, 10) + parseInt(stats.played_blitz, 10)
      const embed = new client.methods.Embed()
        .setTitle(`Click Here For More Details At VGPRO.GG`)
        .setAuthor(`${ign} | Level: ${stats.level}`, client.user.avatarURL())
        .setColor(0x00AE86)
        .setThumbnail(client.funcs.vgVST(stats.skillTier, true))
        .setDescription('Vg Profile Data')
        .setFooter('Does Casual look weird, tell me with $contact. Need proof for SEMC.', client.user.avatarURL())
        .setURL(`https://vgpro.gg/players/${region}/${ign}`)
        .addField('**__Lifetime Stats__**',
          `**Win Rate:** ${Math.round((stats.wins / total) * 100)}% | **Wins:** ${stats.wins} | **Lost:** ${total - stats.wins} | **Played:** ${total} | 
**Rank:** ${stats.played_ranked} | **Blitz:** ${stats.played_blitz} | **BR:** ${stats.played_aral} | **Casual:** ${stats.played_casual}
**Karma**: ${client.funcs.vgKarma(stats.karmaLevel)}`)
        .addField('**__Current Streaks__** (Please SEMC Fix This Soon!)', `**Wins:** ${stats.winStreak} | **Loss:** ${stats.lossStreak}`)
        .addField('**__End Of Season VST (Not Trophies)__**', `**Season 4:** ${Math.round(stats.elo_earned_season_4)}
**Season 5:** ${Math.round(stats.elo_earned_season_5)}
**Season 6:** ${Math.round(stats.elo_earned_season_6)}
**Season 7:** ${Math.round(stats.elo_earned_season_7)}`)
      msg.reply({ embed })
    })
    const lotto = 'vg'
    return lotto
  } catch (e) {
    msg.reply('Please make sure you have done **$save IGN region** because the problem is coming from IGN and Region. If it still doesn\'t work please contact me by using **$contact bug** `your message here`.')
    client.channels.get('358797526842867714').send(`There was an error trying to get player matches: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['vgp', 'p'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: ['vgKarma', 'vgVST', 'useIGN'],
  cooldown: 0
}

exports.help = {
  name: 'player',
  description: 'Get your VG Profile here. Just type .player!',
  usage: '[ign:str{1,16}] [na|sa|eu|sea|sg|ea|cn|tna|teu|tsa|tsea|tsg|tea|tcn]',
  usageDelim: ' ',
  extendedHelp: 'vgp IGN Region'
}
