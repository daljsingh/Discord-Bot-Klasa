exports.run = async (client, msg, [ign]) => {
  if (msg.guild.id !== '67200685216641024') return msg.reply('Sorry, this command only works on the Official Vainglory Discord Server. Join the server at <http://superevil.co/discord> and try again.')
  if (msg.guild && msg.channel.id !== '229624734113988610') {
    if (msg.deletable) msg.delete()
    msg.member.send('This command only works in the #bot-commands-here channel. Please use the appropriate channel to enter the giveaway.')
  }
  if (ign === 'IGN' || ign === 'ign') return msg.reply('Please try this again with your In Game Name.')
  const test = await client.providers.get('mongodb').get('lottery', msg.author.id)
  if (test) {
    await client.providers.get('mongodb').update('lottery', msg.author.id, { ign: ign, tag: msg.author.tag })
    return msg.reply('Your IGN has been **updated** in the lottery! If you win you will see your name on #giveaway and recieve a DM from me.\n\nIf you mispelled your IGN just do it again to update it.')
  }
  await client.providers.get('mongodb').insert('lottery', msg.author.id, { ign: ign, status: null, tag: msg.author.tag })
  return msg.reply('Your IGN has been **added** to the lottery! If you win you will see your name on #giveaway and recieve a DM from me.\n\nIf you mispelled your IGN just do it again to update it.')
}

exports.conf = {
  enabled: false,
  runIn: ['text', 'dm', 'group'],
  aliases: ['vggiveaway', 'vgGiveaway', 'vgg'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'vainglorygiveaway',
  description: 'Add your IGN to the into the VaingloryGiveaway Lottery.',
  usage: '<ign:str{3,16}>',
  usageDelim: ' ',
  extendedHelp: `**$vainglorygiveaway Skillz4Killz** <-- This will add your name to the database where winners will be selected.
You can also use **vgg, vgiveaway, vgGiveaway**`
}
