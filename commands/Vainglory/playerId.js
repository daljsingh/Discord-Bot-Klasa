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
    const playerId = id
    vainglory.players.getById(playerId).then((player) => {
      if (player.errors) return
      console.log(player)
      msg.reply(player.data)
    }).catch((errors) => {
      console.log(errors)
    })
  } catch (e) {
    msg.reply('Some error occured with player by id. A report has been sent to the developers.')
    client.channels.get('341020497309597696').send(`There was an error trying to get player by id: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['vgpi'],
  permLevel: 4,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'playerId',
  description: 'Get your VG Profile here. Just type .player!',
  usage: '<id:str> [region:na|sa|eu|sg]',
  usageDelim: ' ',
  extendedHelp: 'vgp IGN Region'
}
