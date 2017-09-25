exports.run = async (client, msg, [...time]) => {
  console.log(time)
  console.log(time.join(' '))
  const final = await time.join(' ')
  let region = ''
  switch (msg.channel.id) {
    case '360620794256162816': // NA
    case '337740137528164352':
      region = '**Match Scheduled In NA**'
      break
    case '360624527694102528': // SEA
    case '360624184256233472': // SEA
      region = '**Match Scheduled In SEA**'
      break
    case '326539653899354113': // EU
    case '337185802897588226': // EU
      region = '**Match Scheduled In EU**'
      break
    case '318123892302675968': // SA
    case '360628716101173258': // SA
      region = '**Match Scheduled In SA**'
      break
    default:
      return msg.channel.send('Sorry, this is a EZL Command Only :smiley:')
  }
  await client.channels.get('360620239999991819').send(`<@!148717422126301184> New ${region} and posted
${final}`)
  return msg.channel.send('Your message has been sent to the streamers and casters. Thank you.')
}

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['sch'],
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
