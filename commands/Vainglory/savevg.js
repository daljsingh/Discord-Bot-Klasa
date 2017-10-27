exports.run = async (client, msg, [ign, server]) => {
  let region = server
  const check = await client.providers.get('mongodb').get('savevg', msg.author.id)
  if (client.guilds.get('67200685216641024').members.get(msg.author.id)) {
    if (server === 'sg') {
      region = 'sea'
    }
    if (check) {
      await client.providers.get('mongodb').update('savevg', msg.author.id, { changed: true })
    } else {
      await client.providers.get('mongodb').insert('savevg', msg.author.id, { changed: true })
    }
  }
  if (server === 'sea') {
    region = 'sg'
  }
  if (check) {
    await client.providers.get('mongodb').update('savevg', msg.author.id, { ign: ign, region: region })
    return msg.channel.send('Your IGN and Region have now been updated. There is a cooler feature coming soon. Stay tuned with this!')
  } else {
    await client.providers.get('mongodb').insert('savevg', msg.author.id, { ign: ign, region: region })
    return msg.channel.send('Your IGN and Region have now been saved. There is a cooler feature coming soon. Stay tuned with this!')
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['save'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'savevg',
  description: 'Save your IGN.!',
  usage: '<ign:str{1,16}> <na|sa|eu|sea|sg|ea|cn>',
  usageDelim: ' ',
  extendedHelp: 'save IGN Region'
}
