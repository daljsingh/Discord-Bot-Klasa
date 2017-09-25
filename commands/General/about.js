exports.run = async (client, msg) => {
  try {
    const embed = new client.methods.Embed()
      .setTitle('About EZLBot - The Bot For Everyone!')
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(0x00AE86)
      .setDescription('Hi, I\'m EZLBot, a growing community bot that has new features added regularly. For now I control VG soon I will control the world. 😃')
      .setFooter('<3 MadGlory, SEMC, Discord', client.user.avatarURL())
      .setURL('https://discord.me/EZL')
      .addField('What can I do?',
        'For a look at what I can do type **$help**.')
      .addField('Talk To My Developers!', 'Come join us [here](https://discord.me/ezl). You can also contact us directly by using the contact command. Type **$help contact**.')
      .addField('Bot Status', `Servers: ${client.guilds.size}\nUsers: ${client.users.size}\nLast Updated: ${Math.floor(((((client.uptime / 1000) / 60) / 60) / 24))} Days ${Math.floor((((client.uptime / 1000) / 60) / 60))} Hours ${Math.floor(((client.uptime / 1000) / 60))} Minutes`, true)
      .addField('Donations', 'To support us please type **$donate**. <3', true)
    msg.reply({ embed })
  } catch (e) {
    msg.reply('Some error occured with about. A report has been sent to the developers.')
    client.channels.get('341020497309597696').send(`There was an error trying to about: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['status'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'about',
  description: 'Learn about the bot and see its stats.',
  usage: '',
  usageDelim: '',
  extendedHelp: ''
}
