const { Command, RichDisplay } = require('klasa')
const Vainglory = require('vainglory')
const config = require('../../config/config.json')
const vg = require('../../functions/vg.js')
const matchData = require('../../functions/matches.js')
const crypto = require('../../functions/crypto/crypto')
const moment = require('moment')
moment().format()

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'matches',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: ['vgm', 'm', 'vgmatches'],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'See your Vainglory match history in the last 28 days.',
      quotedStringSupport: true,
      usage: '[username:str] [server:str] [mode:str] [...]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
    this.album = new RichDisplay(
      new this.client.methods.Embed()
        .setFooter('© Super Evil Megacorp'))
  }

  async run (msg, [username, server, mode]) {
    this.album.pages = []
    let region, name, ign, lowerRegion
    const allowedRegions = ['na', 'eu', 'sa', 'sea', 'sg', 'cn']
    if (server) {
      lowerRegion = server.toLowerCase()
      region = await vg.region(this.client, msg, lowerRegion)
    }
    if (server && !allowedRegions.includes(lowerRegion)) return msg.reply(`⚠ \`${server}\` is not an allowed region. Allowed region are \`${allowedRegions.join('`, `')}\``)
    if (username && !server) {
      region = await this.client.providers.get('json').get('regions', username).then((result) => {
        return result.region
      })
    }
    if (!username) {
      name = await vg.useIGN(this.client, msg).then((data) => {
        return data
      })
      if (!name) return msg.reply('⚠ You didn\'t give an IGN, and you have not done `!vgverify`')
      ign = await crypto.decrypt(name.ign)
      region = await crypto.decrypt(name.region)
    } else {
      ign = username
    }
    let allModes = []
    if (mode) {
      for (let i = 0; i < mode.length; i++) {
        allModes.push(vg.reverseGameModes(mode[i]))
      }
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
    await vainglory.region(region).matches.collection(options).then(async (matches) => {
      if (matches.errors) {
        console.log(matches)
        return msg.reply('Please check the IGN and Region and try again. The API returned an error saying incorrect IGN or region.')
      }
      let winLose = ''
      let players = 6
      for (let i = 0; i < matches.data.length; i++) {
        let data = matchData.getData(matches, i)
        let team = data.side.b
        for (let j = 1; j < players + 1; j++) {
          let count = `p${j}`
          const exists = await this.client.providers.get('json').has('regions', data.igns[count])
          if (!exists) {
            console.log(data.igns[count])
            await this.client.providers.get('json').insert('regions', data.igns[count], { region })
          }
        }
        switch (ign) {
          case data.igns.p1:
          case data.igns.p2:
          case data.igns.p3:
            team = data.side.a
            winLose = data.side.aWinLoss
            break
          default:
            winLose = data.side.bWinLoss
        }
        await this.album.addPage(e => e
          .setAuthor(`${ign} | ${data.region} | ${data.gameMode} | ${winLose === 'true' ? 'VICTORY' : 'DEFEAT'}`, this.client.user.displayAvatarURL())
          .setColor(team === data.side.a ? '#00C2EC' : '#EE7200')
          .setDescription(`**Duration:** ${Math.floor(data.duration / 60)}:${data.duration % 60} \n**Time:** ${moment(data.time)}\n**Blue Team:** Aces: ${data.aces0}    Gold: ${data.tGold0}    Kills: ${data.tKills0}    Krakens: ${data.tKrakenCapt0}    Turret Kills/Left: ${data.tTurretKills0}/${data.tTurretLeft0}
          **Red  Team:** Aces: ${data.aces1}    Gold: ${data.tGold1}    Kills: ${data.tKills1}     Krakens: ${data.tKrakenCapt1}    Turret Kills/Left: ${data.tTurretKills1}/${data.tTurretLeft1}`)
          .addField(`${data.names.p1}`, `${data.heroes.p1}${data.vst.p1}${data.items.p1}\n${matchData.matches(data.kills.p1, data.deaths.p1, data.assists.p1, data.cs.p1, data.csMin.p1, data.jungle.p1, data.gold.p1, data.goldMin.p1)}`, true)
          .addField(`${data.names.p2}`, `${data.heroes.p2}${data.vst.p2}${data.items.p2}\n${matchData.matches(data.kills.p2, data.deaths.p2, data.assists.p2, data.cs.p2, data.csMin.p2, data.jungle.p2, data.gold.p2, data.goldMin.p2)}`, true)
          .addField(`${data.names.p3}`, `${data.heroes.p3}${data.vst.p3}${data.items.p3}\n${matchData.matches(data.kills.p3, data.deaths.p3, data.assists.p3, data.cs.p3, data.csMin.p3, data.jungle.p3, data.gold.p3, data.goldMin.p3)}\n\n**Red Team:**\n`)
          .addField(`${data.names.p4}`, `${data.heroes.p4}${data.vst.p4}${data.items.p4}\n${matchData.matches(data.kills.p4, data.deaths.p4, data.assists.p4, data.cs.p4, data.csMin.p4, data.jungle.p4, data.gold.p4, data.goldMin.p4)}`)
          .addField(`${data.names.p5}`, `${data.heroes.p5}${data.vst.p5}${data.items.p5}\n${matchData.matches(data.kills.p5, data.deaths.p5, data.assists.p5, data.cs.p5, data.csMin.p5, data.jungle.p5, data.gold.p5, data.goldMin.p5)}`)
          .addField(`${data.names.p6}`, `${data.heroes.p6}${data.vst.p6}${data.items.p6}\n${matchData.matches(data.kills.p6, data.deaths.p6, data.assists.p6, data.cs.p6, data.csMin.p6, data.jungle.p6, data.gold.p6, data.goldMin.p6)}`))
      }
      this.album.run(msg)
    })
  }
}
