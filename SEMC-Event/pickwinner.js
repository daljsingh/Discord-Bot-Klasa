exports.run = async (client, msg, [times]) => {
  if (msg.guild.id !== '67200685216641024') return msg.reply('⚠** »»** Sorry, this command only works on the Official Vainglory Discord Server. Join the server at <http://superevil.co/discord> and try again.')
  const pickers = ['313098351715549184', '63019563008135168', '67200122496233472', '76920918433083392', '130136895395987456']
  if (!pickers.includes(msg.author.id)) return msg.reply(`⚠** »»** Sorry, only **Tao**, **Mejlis**, **Wolf_hands**, and **AaronB** may pick winners in this lottery.`)
  if (times > 18) return msg.reply('You can\'t pick more than 18 at a time')
  if (!await client.providers.get('mongodb').get('lottoSettings', 'settings')) await client.providers.get('mongodb').insert('lottoSettings', 'settings', { daily: 18 })
  let maxDailyWinners = await client.providers.get('mongodb').get('lottoSettings', 'settings').then((result) => {
    console.log(result)
    return result.daily
  })
  let prize = ''
  let amount = times
  if (!times) {
    amount = 1
  }
  const winners = []
  const embed = new client.methods.Embed()
    .setTitle('Don\'t Miss Out On The #VaingloryGiveaway In Celebration Of The Official Vainglory Discord Server')
    .setColor(0x00AE86)
    .setFooter('https://superevil.com/discord', client.user.avatarURL())
    .setThumbnail('https://images-ext-2.discordapp.net/external/aM23KqkTjuvGKo9k2TOgNkB5vvqeYOmonW_b5RzKIcw/https/vaingloryhack.com/wp-content/uploads/2017/03/download.png')
    .setURL('https://discord.gg/VHVY7rb')
  await client.providers.get('mongodb').getAll('lottery').then((winner) => {
    console.log(winner)
    for (let i = 0; i < winner.length; i++) {
      if (!winner[i].status) winners.push(winner[i])
    }
    if (winners.length === 0) return msg.reply('⚠ There are currently no players to pick from.')
  })
  for (let i = 0; i < amount; i++) {
    if (maxDailyWinners >= 6) {
      prize = '250'
      console.log(prize)
    } else if (maxDailyWinners <= 5 && maxDailyWinners >= 3) {
      prize = '300'
      console.log(prize)
    } else if (maxDailyWinners === 2 || maxDailyWinners === 1) {
      prize = '500'
      console.log(prize)
    } else {
      console.log('default')
      console.log(maxDailyWinners)
      prize = null
      return msg.reply('The daily limit is reached. To reset the limit use `$resetvg`')
    }
    if (prize) {
      maxDailyWinners = maxDailyWinners - 1
      console.log(maxDailyWinners)
      const random = Math.floor(Math.random() * winners.length)
      await embed.setDescription(`🎉🎉🎉 Congrats! ${await client.users.get(winners[random].id)} just won ${prize} ICE in the #VaingloryGiveaway lottery! Your ICE will be delivered to the IGN you provided in 72 hours. If you do not receive your ICE, please contact <@!130136895395987456>, but don't be mean to him. He is innocent! <:ice:291837305998540810><:ice:291837305998540810><:ice:291837305998540810>`)
      embed.setAuthor(`OMG! ${winners[random].ign} You Are The Winner!`, client.user.avatarURL())
      console.log(winners[random].id)
      await client.users.get(`${winners[random].id}`).send({ embed })
      await client.channels.get('365215641398935564').send(`<@!${winners[random].id}>`, { embed })
      await client.providers.get('mongodb').update('lottery', winners[random].id, { status: true })
    }
  }
  await client.providers.get('mongodb').update('lottoSettings', 'settings', { daily: maxDailyWinners })
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['pw', 'pick'],
  permLevel: 3,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'pickwinner',
  description: 'Add your IGN to the into the VaingloryGiveaway Lottery.',
  usage: '<amount:int{1,18}>',
  usageDelim: '',
  extendedHelp: `**$pickwinner** <-- This will let you pick 1 random winner.
**$pickwinner 5** <-- This will let you pick 5 random winners. Max 18 Per Day.`
}


