exports.run = async (client, msg, [member, reason]) => {
  // try to ban the member
  try {
    await msg.guild.ban(member)
    msg.channel.send(`${member.user.username} was banned.`)
    if (reason) {
      const time = new Date().toLocaleString()
      msg.guild.channels.find('name', 'mod-log').send(`${member.user} was banned by ${msg.author} at ${time}`)
    }
    // throw error if it doesnt work and send a report to error channel.
  } catch (e) {
    msg.reply('Some error occured with banning the member. A report has been sent to the developers.')
    client.channels.get('341020497309597696').send(`There was an error trying to ban: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 3,
  botPerms: ['BAN_MEMBERS'],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'ban',
  description: 'Bans a person from the server.',
  usage: '<member:member> [reason:str{1,150}]',
  usageDelim: ' ',
  extendedHelp: "1) ban @user\n2) Requires the user to have a role called Admin\n3) Bot requires Ban Members permissions.\n4) Add an optional reason but will require a channel called 'mod-log' in order to list the reasons for your server."
}
