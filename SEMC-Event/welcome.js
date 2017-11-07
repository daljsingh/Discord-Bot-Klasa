exports.run = async (client, msg) => {
  const users = ['313098351715549184', '63019563008135168', '67200122496233472', '76920918433083392', '130136895395987456']
  if (!users.includes(msg.author.id)) return msg.reply(`⚠** »»** Sorry, only **Tao**, **Mejlis**, **Wolf_hands**, and **AaronB** may pick winners in this lottery.`)
  msg.reply('I have enabled the welcome')
  return client.providers.get('mongodb').insert('lottoSettings', 'settings', { status: true })
}

exports.conf = {
  enabled: false,
  runIn: ['text'],
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'welcome',
  description: 'Enable/Disable the welcome',
  usage: '',
  usageDelim: '',
  extendedHelp: ''
}
