exports.run = async (client, msg) => {
  try {
    const embed = new client.methods.Embed()
      .setTitle('Are you interested in donating to EZL?')
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor(0x00AE86)
      .setDescription('If you wish to help donate to EZL and make it grow and achieve its vision. 😃')
      .setFooter('© Esports Zodiac League LLC (EZL)', client.user.avatarURL)
      .setTimestamp()
      .setURL('http://ezlgg.com')
      .addField('PayPal',
        'If you wish to use our [PayPal](http://paypal.me/EZL_Official).')
      .addField('Buying Skillz4Killz Masterpiece', 'You can buy the [masterpiece](http://ezlgg.com/product/skillz4killz-masterpiece/) Huge sale!! From ~~$1,000,000~~ **Only** 1 dollar.')
      .addField('Becoming A Patron', 'If you wish to become a Patron and gain all the rewards and benefits as well please check out [Patreon](https://www.patreon.com/user?u=5949452)')
    msg.channel.send({ embed })
  } catch (e) {
    msg.reply('Some error occured with donating. A report has been sent to the developers.')
    client.channels.get('341020497309597696').send(`There was an error trying to donate: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`)
  }
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['don'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'donate',
  description: 'Wanting to donate to help EZL grow and achieve its vision? Here is how you can make it possible.',
  usage: '',
  usageDelim: '',
  extendedHelp: ''
}
