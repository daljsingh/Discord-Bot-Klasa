exports.run = async (client, msg, [times]) => {
  if (msg.guild.id !== '233300409308020736') return msg.reply('⚠** »»** Sorry, this command only works on the Official Vainglory Discord Server. Join the server at <http://superevil.co/discord> and try again.')
  const pickers = ['313098351715549184', '63019563008135168', '67200122496233472', '76920918433083392', '130136895395987456']
  if (!pickers.includes(msg.author.id)) return msg.reply(`⚠** »»** Sorry, only **Tao**, **Mejlis**, **Wolf_hands**, and **AaronB** may pick winners in this lottery.`)
  let amount = ''
  if (!times) {
    amount = 1
  } else {
    amount = times
  }
  const igns = []
  const embed = new client.methods.Embed()
    .setTitle('**__TESTING__** New Lotto Feature')
    .setColor(0x00AE86)
    // .setDescription(`🎉🎉🎉 Congrats! You just won 250 ICE in the #VaingloryGiveaway lottery! Your ICE will be delivered to the IGN you provided in 72 hours. If you do not receive your ICE, please contact <@!130136895395987456>, but don't be mean to him. He is innocent`)
    .setDescription(`🎉🎉🎉 **__TESTING__** New Lotto Feature`)
    .setFooter('<3 EZL, SEMC', client.user.avatarURL())
    .setImage('https://images-ext-2.discordapp.net/external/aM23KqkTjuvGKo9k2TOgNkB5vvqeYOmonW_b5RzKIcw/https/vaingloryhack.com/wp-content/uploads/2017/03/download.png')
    .setURL('https://discord.gg/VHVY7rb')
  await client.providers.get('mongodb').getAll('lottery').then((winner) => {
    igns.push(winner)
  })
  for (let i = 0; i < amount; i++) {
    console.log('inside for')
    console.log('===========')
    const random = Math.floor(Math.random() * igns[0].length)
    embed.setAuthor(`OMG! ${igns[0][random].ign} You Are The Winner!`, client.user.avatarURL())
    msg.channel.send({ embed })
    client.users.get(`${igns[0][random].id}`).send({ embed })
    client.channels.get('358074822678413314').send(`<@!${igns[0][random].id}>`, { embed }) // LLC Server
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['pw'],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'pickwinner',
  description: 'Add your IGN to the into the VaingloryGiveaway Lottery.',
  usage: '[amount:int]',
  usageDelim: ' ',
  extendedHelp: `**$pickwinner** <-- This will let you pick 1 random winner.
**$pickwinner 5** <-- This will let you pick 5 random winners. Max 20 Per Day.`
}
