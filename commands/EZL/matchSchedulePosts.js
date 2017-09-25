const config = require('../../config/config.json')

exports.run = async (client, msg, [time]) => {
  try {
    const alerts = {
      kewy: '<@148717422126301184>',
      nasty: '<@192672590140145664>',
      prodigy: '<@258768157815078913>',
      elite: '<@153168234353262592>'
    }
    // NA BELOW
    if (msg.channel.id === '337740137528164352') {
      const embed = new client.methods.Embed()
        .setTitle('EZL Match Schedule')
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x00AE86)
        .setDescription('**Match Scheduled In NA**')
        .setFooter('© Esports Zodiac League LLC (EZL)', client.user.avatarURL)
        .setTimestamp()
        .setURL('http://ezlgg.com')
        .addField('Schedule:',
          `${time}`)

      client.channels.get('337317330378031122').send(`${alerts.kewy}${alertsnasty}${alerts.prodigy}${alerts.elite} New match has been scheduled and posted.`, { embed }).then(msg.channel.send('Your message has been sent to the streamers and casters. Thank you.'))
      // SEA BELOW
    } else if (msg.channel.id === '326539653899354113') {
      const embed = new client.methods.Embed()
        .setTitle('EZL Match Schedule')
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x00AE86)
        .setDescription('**Match Scheduled In SEA**')
        .setFooter('© Esports Zodiac League LLC (EZL)', client.user.avatarURL)
        .setTimestamp()
        .setURL('http://ezlgg.com')
        .addField('Schedule:',
          `${time}`)

      client.channels.get('337317330378031122').send(`${alerts.kewy}${alerts.nasty}${alerts.prodigy}${alerts.elite} New match has been scheduled and posted.`, { embed }).then(msg.channel.send('Your message has been sent to the streamers and casters. Thank you.'))
      // EU BELOW
    } else if (msg.channel.id === '337185802897588226') {
      const embed = new client.methods.Embed()
        .setTitle('EZL Match Schedule')
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x00AE86)
        .setDescription('**Match Scheduled In EU**')
        .setFooter('© Esports Zodiac League LLC (EZL)', client.user.avatarURL)
        .setTimestamp()
        .setURL('http://ezlgg.com')
        .addField('Schedule:',
          `${time}`)

      client.channels.get('337317330378031122').send(`${alerts.kewy}${alerts.nasty}${alerts.prodigy}${alerts.elite} New match has been scheduled and posted.`, { embed }).then(msg.channel.send('Your message has been sent to the streamers and casters. Thank you.'))
      // SA BELOW 
    } else if (msg.channel.id === '318123892302675968') {
      const embed = new client.methods.Embed()
        .setTitle('EZL Match Schedule')
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x00AE86)
        .setDescription('**Match Scheduled In SA**')
        .setFooter('© Esports Zodiac League LLC (EZL)', client.user.avatarURL)
        .setTimestamp()
        .setURL('http://ezlgg.com')
        .addField('Schedule:',
          `${time}`)

      client.channels.get('337317330378031122').send(`${alerts.kewy}${alerts.nasty}${alerts.prodigy}${alerts.elite} New match has been scheduled and posted.`, { embed }).then(msg.channel.send('Your message has been sent to the streamers and casters. Thank you.'))
    }
  } catch (e) {
    msg.reply('Some error occured with scheduling. A report has been sent to the developers.')
    client.channels.get('331965447039877121').send(`There was an error trying to scheduling: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['s', 'sc'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'schedule',
  description: '.schedule in the proper channels in the regional servers to schedule your match :)',
  usage: '<time:str>',
  usageDelim: '',
  extendedHelp: 'This command will only work for EZL Purposes.'
}
