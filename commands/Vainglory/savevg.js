exports.run = async (client, msg, [ign, server]) => {
  let region = server
  if (server === 'sea') {
    region = 'sg'
  }
  const test = await client.providers.get('mongodb').get('savevg', msg.author.id)
  if (test) {
    await client.providers.get('mongodb').update('savevg', msg.author.id, { ign: ign, region: region })
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
  usage: '<ign:str{1,16}> <na|sa|eu|sea|sg|ea|cn|tna|teu|tsa|tsea|tsg|tea|tcn>',
  usageDelim: ' ',
  extendedHelp: 'save IGN Region'
}
