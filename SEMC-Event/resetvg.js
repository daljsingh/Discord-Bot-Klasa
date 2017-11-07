exports.run = async (client, msg) => {
  const users = ['313098351715549184', '63019563008135168', '67200122496233472', '76920918433083392', '130136895395987456']
  if (!users.includes(msg.author.id)) return msg.reply(`⚠** »»** Sorry, only **Tao**, **Mejlis**, **Wolf_hands**, and **AaronB** may pick winners in this lottery.`)
  msg.reply('I have reset the max daily winners to 18')
  return client.providers.get('mongodb').update('lottoSettings', 'settings', { daily: 18 })
}

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['vgreset'],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'resetvg',
  description: 'Reset the daily max',
  usage: '',
  usageDelim: '',
  extendedHelp: ''
}
