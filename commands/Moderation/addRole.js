exports.run = async (client, msg, [user, role]) => {
  try {
    if (msg.guild.roles.exists('name', role)) {
      msg.mentions.members.first().addRole(msg.guild.roles.find('name', role))
      const embed = new client.methods.Embed()
        .setAuthor(client.user.username, client.user.avatarURL)
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor(0x00AE86)
        .setDescription(`${user} has been given the ${role} role. 😃`)
        .setFooter('© Esports Zodiac League LLC (EZL)', client.user.avatarURL)
        .setImage('http://i.imgur.com/yVpymuV.png')
        .setThumbnail('http://i.imgur.com/p2qNFag.png')
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        .setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
      msg.channel.send({ embed })
    } else {
      msg.reply('', { embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL()
        },
        description: `I am sorry but ${role} role does not exist. :cry:`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: '© Esports Zodiac League LLC (EZL)'
        }
      }
      })
    }
  } catch (e) {
    msg.reply('Some error occured with adding a role to the member. A report has been sent to the developers.')
    client.channels.get('341020497309597696').send(`There was an error trying to add a role: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['arole', 'ar'],
  permLevel: 2,
  botPerms: ['MANAGE_ROLES'],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'addrole',
  description: 'Assign a role to another user.',
  usage: '<user:user> <role:str>',
  usageDelim: ' ',
  extendedHelp: '1) User must have a role called Moderators to use this command.\n2) Bot must have Manage Role permissions. The bot will not be able to assign a role higher than its highest role.'
}
