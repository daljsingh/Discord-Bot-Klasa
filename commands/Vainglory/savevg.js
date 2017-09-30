exports.run = async (client, msg, [ign, server]) => {
  let region = server
  const check = await client.providers.get('mongodb').get('savevg', msg.author.id)
  if (client.guilds.get('67200685216641024').members.get(msg.author.id)) {
    if (server === 'sg') {
      region = 'sea'
    }
    const roleIds = ['363135242485366784', '363135288303943680', '363135341710016512', '363135325511352320', '363135360387252225', '363135383095214083']
    const allRoles = {
      na: '363135242485366784',
      eu: '363135288303943680',
      sea: '363135341710016512',
      sa: '363135325511352320',
      ea: '363135360387252225',
      cn: '363135383095214083'
    }
    if (!check) {
      await client.guilds.get('67200685216641024').members.get(msg.author.id).setNickname(`${ign} - ${server.toUpperCase()}`)
      await client.guilds.get('67200685216641024').members.get(msg.author.id).removeRoles(roleIds)
      await client.guilds.get('67200685216641024').members.get(msg.author.id).addRole(allRoles[server])
    } else {
      if (!check.changed) {
        await client.guilds.get('67200685216641024').members.get(msg.author.id).setNickname(`${ign} - ${server.toUpperCase()}`)
        await client.guilds.get('67200685216641024').members.get(msg.author.id).removeRoles(roleIds)
        await client.guilds.get('67200685216641024').members.get(msg.author.id).addRole(allRoles[server])
      }
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
