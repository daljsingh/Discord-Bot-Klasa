exports.run = async (client, msg, [ign]) => {
  if (msg.guild.id !== '233300409308020736') return msg.reply('Sorry, this command only works on the Official Vainglory Discord Server. Join the server at http://superevil.co/discord and try again.')
  const test = await client.providers.get('mongodb').get('lottery', msg.author.id)
  if (test) {
    await client.providers.get('mongodb').update('lottery', msg.author.id, { ign: ign, status: null, tag: msg.author.tag })
    return msg.channel.send('Your IGN has been **updated** in the lottery! If you win you will see your name on #lottery-winners and recieve a DM from me.')
  }
  await client.providers.get('mongodb').insert('lottery', msg.author.id, { ign: ign, status: null, tag: msg.author.tag })
  return msg.channel.send('Your IGN has been **added** to the lottery! If you win you will see your name on #lottery-winners and recieve a DM from me.')
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['vggiveaway', 'vgGiveaway', 'vgg'],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'vainglorygiveaway',
  description: 'Add your IGN to the into the VaingloryGiveaway Lottery.',
  usage: '<ign:str{1,16}>',
  usageDelim: ' ',
  extendedHelp: `**$vainglorygiveaway Skillz4Killz** <-- This will add your name to the database where winners will be selected.
You can also use **vgg, vgiveaway, vgGiveaway**`
}
