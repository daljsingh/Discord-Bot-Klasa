const { Command } = require('klasa')
const Vainglory = require('vainglory')
const config = require('../../config/config.json')
const vg = require('../../functions/vg')
const crypto = require('../../functions/crypto/crypto')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'player',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: ['p', 'vgp', 'profile'],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'Shows the Vainglory player profile',
      quotedStringSupport: true,
      usage: '[ign:str] [server:str]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [username, server]) {
    const allowedRegions = ['na', 'eu', 'sa', 'sea', 'sg', 'cn', 'ea']
    let lowerRegion = ''
    let region
    if (server) {
      lowerRegion = server.toLowerCase()
      region = vg.region(this.client, msg, lowerRegion)
    }
    if (server && !allowedRegions.includes(lowerRegion)) {
      return msg.reply(`⚠ \`${server}\` is not an allowed region. Allowed region are \`${allowedRegions.join('`, `')}\``)
    }
    let ign = ''
    let name
    if (!username) {
      name = await this.client.providers.get('json').get('users', msg.author.id)
      if (!name) return msg.reply('⚠ You didn\'t give an IGN, and you have not done `$save yourIgn yourRegion`')
      if (!name.ign) return msg.reply('I recently got a huge update and the database that contains the names is still transferring over. In the meantime, you can do the $save command again. I am sorry for the inconvenience. For more info join me at https://discord.gg/VHVY7rb')
      ign = await crypto.decrypt(name.ign)
      region = await crypto.decrypt(name.region)
      console.log(region)
      // if (region === 'sea') region = 'sg'
      // console.log(region)
    }
    if (username && !server) {
      ign = username
      region = await vg.checkRegion(ign)
    }
    if (username) ign = username
    if (!ign) return msg.reply('⚠ You didn\'t provide an IGN and region to search for. Are you sure you have done **$save yourIgn yourRegion**')
    const vainglory = new Vainglory(config.vgKey)
    /* Must take an array */
    const playerNames = []
    playerNames.push(ign)
    console.log(region)
    await vainglory.region(region === 'sea' ? 'sg' : region).players.getByName(playerNames).then((players) => {
      if (players.errors) {
        console.log(players)
        return msg.reply(`Please check the IGN and Region and try again. The API returned an error saying incorrect IGN or region.\n${players.messages}`)
      }
      const stats = players.player[0].stats
      const total = parseInt(stats.played_casual, 10) + parseInt(stats.played_ranked, 10) + parseInt(stats.played_aral, 10) + parseInt(stats.played_blitz, 10)
      const embed = new this.client.methods.Embed()
        .setTitle(`Click Here For More Details At VGPRO.GG`)
        .setAuthor(`${ign} | Level: ${stats.level}`, this.client.user.displayAvatarURL())
        .setColor(0x00AE86)
        .setThumbnail(vg.VST(stats.skillTier, true))
        .setDescription('Vg Profile Data')
        .setFooter('Does Casual look weird, tell me with $contact. Need proof for SEMC.', this.client.user.displayAvatarURL())
        .setURL(`https://vgpro.gg/players/${region}/${ign}`)
        .addField('**__Lifetime Stats__**',
          `**Win Rate:** ${Math.round((stats.wins / total) * 100)}% | **Wins:** ${stats.wins} | **Lost:** ${total - stats.wins} | **Played:** ${total} | 
**Rank:** ${stats.played_ranked} | **Blitz:** ${stats.played_blitz} | **BR:** ${stats.played_aral} | **Casual:** ${stats.played_casual}
**Karma**: ${stats.karmaLevel}`)
        .addField('**__Current Streaks__** (Please SEMC Fix This Soon!)', `**Wins:** ${stats.winStreak} | **Loss:** ${stats.lossStreak}`)
        .addField('**__End Of Season VST (Not Trophies)__**', `**Season 4:** ${Math.round(stats.elo_earned_season_4)}
**Season 5:** ${Math.round(stats.elo_earned_season_5)}
**Season 6:** ${Math.round(stats.elo_earned_season_6)}
**Season 7:** ${Math.round(stats.elo_earned_season_7)}`)
      msg.reply({ embed })
    })
    const finalizer = 'vg'
    return finalizer
  }
}
