exports.run = async (client, msg) => {
  if (msg.guild.id !== '233300409308020736') return msg.reply('Sorry, this is an EZL only command. ;(. You can join the server at https://discord.gg/VHVY7rb')
  const embed = new client.methods.Embed()
    .setTitle('EZL Rules and Regulations')
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(0x00AE86)
    .setDescription('**Please read the following rules and guidelines for the EZL LLC server. Joining this server constitutes an agreement to abide by these rules. Failure to do so will result to your removal. This server has members of all ages, nationalities, creeds, religions, beliefs, orientations etc., so be respectful of others while you are here.**')
    .setFooter('© Esports Zodiac League LLC (EZL)', client.user.avatarURL)
    .setTimestamp()
    .setURL('https://ezlgg.com')
    .addField('General Rules:',
      `:one: Vulgarity is strictly prohibited, its common sense. This includes but not limited to: text, audio, PFP, Discord tags.
:two: Do not ask for personal information. This includes but not limited to phone numbers, social media accounts or chat apps info. 
:three: Fake profiles or profiles seeking a boyfriend/girlfriend/'good time' will result in a permanent ban.
:four: No spamming. This includes but not limited to symbols, letters, emoticons, links, reactions & capitalized words.
:five: Innapropriate Usernames or Profile Pics are not allowed. Non compliance will result in your removal from the server. Contact @Mod-Staff to change your nicknames.`)
    .addBlankField()
    .addField('Harassment & Bigotry:', `:one: Racism, sexism, or bigotry will result in a permanent ban.
:two: Negative text/audio interaction based on someone's gender, nationality, creed, religion, beliefs, sexuality, etc. will result in a permanent ban.
:three: Don't harass members. This includes personal attacks, jabs, quotes, and general toxicity.
  
Sharing Links:
:one: Links are subject to all listed rules. Members will be held responsible for their contents.
:two: Porn/gore and inappropriate image links will result in a ban.
:three: leaked content is not welcome in this server,  repeated offenses will result in a kick or a ban.
:four: Share links in proper channels, If link posting privileges are abused, they will be removed.`)
  msg.channel.send({ embed })
}

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['r', 'rule'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'rules',
  description: 'Want to read the EZL rules? Want to show others the rules. Type .rules :)',
  usage: '',
  usageDelim: '',
  extendedHelp: ''
}
