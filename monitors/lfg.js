exports.conf = {
  enabled: true,
  ignoreBots: true,
  ignoreSelf: true
}

exports.run = (client, msg) => {
  // const channels = ['313011663643344897', '313012015688056832', '313051259621867520', '68994567705210880', '319533563647361044', '363140710364479489']
  // if (!channels.includes(msg.channel.id)) return
  // let region = ''
  // let roleId = ''
  // switch (msg.channel.id) {
  //   case '313011663643344897': // EU
  //     region = 'EU'
  //     roleId = '363135288303943680'
  //     break
  //   case '313012015688056832': // NA
  //     region = 'NA'
  //     roleId = '363135242485366784'
  //     break
  //   case '313051259621867520': // SEA
  //     region = 'SEA'
  //     roleId = '363135341710016512'
  //     break
  //   case '68994567705210880': // EA
  //     region = 'EA'
  //     roleId = '363135360387252225'
  //     break
  //   case '319533563647361044': // SA
  //     region = 'SA'
  //     roleId = '363135325511352320'
  //     break
  //   case '363140710364479489': // CN
  //     region = 'CN'
  //     roleId = '363135383095214083'
  //     break
  // }
  // if (msg.member.roles.get(roleId)) return
  // if (msg.deletable) msg.delete()
  // msg.member.send(`I deleted your message because you don't have the **${region}** role to speak in that channel. To get that role, you need to have an account in that region. Please type **$save YOURIGN ${region}** and the bot will give you proper permissions. <:vgcheers:244076175024979979>`)
}
