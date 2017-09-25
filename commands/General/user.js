exports.run = async (client, msg, [usr]) => {
  try {
    const embed = new client.methods.Embed()
      .setTitle(`User Info of ${usr.username}`)
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(0x00AE86)
      .setThumbnail(`${usr.displayAvatarURL()}`)
      .setDescription(`Created On: ${usr.createdAt}`)
      .setFooter('<3 MadGlory, SEMC, Discord', client.user.avatarURL())
      .setURL('https://discord.me/EZL')
      .addField('Status',
        `Game: ${usr.presence.game}\nStatus: ${usr.presence.status}`)
    msg.reply({ embed })
  } catch (e) {
    msg.reply('Some error occured with user info. A report has been sent to the developers.')
    client.channels.get('331965447039877121').send(`There was an error trying to userInfo: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['u'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'user',
  description: 'Find out information about a user by @ them.',
  usage: '<usr:user>',
  usageDelim: '',
  extendedHelp: ''
}
