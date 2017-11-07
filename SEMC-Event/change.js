exports.run = async (client, msg, [member, ign, server]) => {
  if (msg.guild.id !== '67200685216641024') return msg.reply('Sorry, this command is only meant for the Vainglory Server. Come join at <http://superevil.co/discord>')
  let region = server
  if (server === 'sg') {
    region = 'sea'
  }
  const allowedRoles = ['God', 'Super Evil Megacorp', 'Admin', 'RCM Role ( invisible )', 'Moderator']
  const roleIds = ['363135242485366784', '363135288303943680', '363135341710016512', '363135325511352320', '363135360387252225', '363135383095214083']
  const allRoles = {
    na: '363135242485366784',
    eu: '363135288303943680',
    sea: '363135341710016512',
    sa: '363135325511352320',
    ea: '363135360387252225',
    cn: '363135383095214083'
  }
  for (let i = 0; i < allowedRoles.length; i++) {
    if (msg.member.roles.find('name', allowedRoles[i])) {
      await member.setNickname(`${ign} - ${server.toUpperCase()}`)
      await member.removeRoles(roleIds)
      await member.addRole(allRoles[server])
      if (server === 'sea') {
        region = 'sg'
      }
      const check = await client.providers.get('mongodb').get('savevg', member.id)
      if (check) {
        await client.providers.get('mongodb').update('savevg', member.id, { ign: ign, region: region })
        return msg.channel.send('That users IGN and region have now been updated.')
      } else {
        await client.providers.get('mongodb').insert('savevg', member.id, { ign: ign, region: region })
        return msg.channel.send('That users IGN and region have now been updated.')
      }
    }
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'change',
  description: 'Change a users ign and region.!',
  usage: '<member:member> <ign:str{1,16}> <na|sa|eu|sea|sg|ea|cn>',
  usageDelim: ' ',
  extendedHelp: 'save IGN Region'
}
