exports.run = async (client, msg, [member]) => {
  try {
    await member.kick()
    msg.reply('', { embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL()
      },
      title: 'Someone just got booted!',
      url: 'http://ezlgg.com',
      description: `${member} has been removed from the server. 😃`,
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: '© Esports Zodiac League LLC (EZL)'
      }
    }
    })
    msg.channel.send(`${member.username} was kicked.`)
  } catch (e) {
    msg.reply('Some error occured with muting the member. A report has been sent to the developers.')
    client.channels.get('341020497309597696').send(`There was an error trying to mute: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: [],
  permLevel: 2,
  botPerms: ['KICK_MEMBERS'],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'kick',
  description: 'Kicks a person on both text and voice.',
  usage: '<member:member>',
  usageDelim: '',
  extendedHelp: '1) kick @user\n2) Requires the user to have a role called Moderators\n3) Bot requires Mute Members permissions.'
}
