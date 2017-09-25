exports.run = async (client, msg, [dep, ...req]) => {
  if (msg.guild.id !== '282541228904546305') return msg.channel.send('Sorry this is a command only meant for EZL Staff Server.')
  const final = await req.join(' ')
  console.log(final)
  console.log('============')
  console.log(req)
  switch (dep) {
    case 'translate':
      await client.channels.get('277391272770273282').send(final)
      return msg.channel.send('Your message has been sent to the translators. Thank you.')
    case 'pr':
      await client.channels.get('313686770925436938').send(final)
      return msg.channel.send('Your message has been sent to the PR Team. Thank you.')
    case 'stream':
      await client.channels.get('334777433561628673').send(final)
      return msg.channel.send('Your message has been sent to the streame team. Thank you.')
    case 'website':
      await client.channels.get('352116741809373187').send(final)
      return msg.channel.send('Your message has been sent to the web developers. Thank you.')
    case 'design':
      await client.channels.get('277939552167919616').send(final)
      return msg.channel.send('Your message has been sent to the designers. Thank you.')
    case 'news':
      await client.channels.get('281511307885412354').send(final)
      return msg.channel.send('Your message has been sent to the news team. Thank you.')
    default:
      return msg.channel.send('Sorry, this is a EZL Command Only :smiley:')
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['req'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'requests',
  description: 'Make a request of a department :)',
  usage: '<translate|pr|stream|website|design|news> <req:str> [...]',
  usageDelim: ' ',
  extendedHelp: 'This command will only work for EZL Purposes.'
}
