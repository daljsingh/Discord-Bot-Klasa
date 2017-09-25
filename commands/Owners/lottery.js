const config = require('../../config/config.json')
exports.run = async (client, msg, [type, value]) => {
  try {
    /* Enables/disables lottery */
    if (type === 'state') {
      if (value === 'on' || value === 'off') {
        config.lottery.onOff = value
        msg.reply(`The ${type} has been set to ${value}`)
      } else {
        msg.reply('The value given was not on or off.')
      }
      /* Changes the chance of winning lottery */
    } else if (type === 'chance') {
      config.lottery.chance = value
      msg.reply(`The ${type} has been set to ${value}`)
      /* Changes the amount of ICE won on lottery */
    } else if (type === 'amount') {
      config.lottery.amount = value
      msg.reply(`The ${type} has been set to ${value}`)
      /* Changes the cooldown to win again in lottery */
    } else if (type === 'cooldown') {
      config.lottery.cooldown = value
      msg.reply(`The ${type} has been set to ${value}`)
    }
  } catch (e) {
    msg.reply('Some error occured with lotto comamnd. A report has been sent to the developers.')
    client.channels.get('331965447039877121').send(`There was an error trying to lotto: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm'],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'lottery',
  description: 'Lottery Settings',
  usage: '<onOff|chance|amount|cooldown> <value:str>',
  usageDelim: ' ',
  extendedHelp: ''
}
