exports.run = async (client, msg) => {
  const guild = msg.guild
  const server = {
    name: guild.name,
    id: guild.id,
    image: guild.iconURL(),
    createdAt: guild.createdAt,
    botJoin: guild.joinedAt,
    region: guild.region.toUpperCase(),
    owner: `${guild.owner.displayName}#${guild.owner.user.discriminator}`,
    filter: guild.explicitContentFilter,
    roles: guild.roles.array().length,
    members: guild.memberCount,
    // Amount of bots on the server
    bots: guild.members.filter((member) => { return member.user.bot }).array().length,
    // # of users + bots that sent message since client was last turned on
    activity: guild.members.filter((member) => {
      if (member.lastMessage) {
        return member.lastMessage.createdTimestamp
      }
    }).array(),
    // # of users + bots that sent message since client turned on
    daily: guild.members.filter((member) => {
      // for every member check if they have a lastMessage
      if (member.lastMessage) {
        // if the time from NOW - time of last message is under 24 hours add it to array
        if (new Date() - member.lastMessage.createdTimestamp < 86400000) {
          return member.lastMessage.createdTimestamp
        }
      }
    }).array(),
    // # per week # of users + bots
    weekly: guild.members.filter((member) => {
      if (member.lastMessage) {
        if (new Date() - member.lastMessage.createdTimestamp < (86400000 * 7) && new Date() - member.lastMessage.createdTimestamp > 86400000) {
          return member.lastMessage.createdTimestamp
        }
      }
    }).array(),
    // # per montth of users + bots
    monthly: guild.members.filter((member) => {
      if (member.lastMessage) {
        if (new Date() - member.lastMessage.createdTimestamp < (86400000 * 30) && new Date() - member.lastMessage.createdTimestamp > (86400000 * 7)) {
          return member.lastMessage.createdTimestamp
        }
      }
    }).array(),
    online: guild.presences.array().length,
    channels: guild.channels.array().length,
    // # of text channels
    text: guild.channels.filter((channel) => {
      if (channel.type === 'text') {
        return channel
      }
    }).array().length,
    emojis: guild.emojis.array().length,
    // All emojis with their unicode like <>
    allEmojis: guild.emojis.filter((emoji) => {
      const id = `<:${emoji.identifier}>`
      return id
      // Remove all , in the array and just show all emojis
    }).array().toString().replace(/,/g, '')
  }
  const embed = new client.methods.Embed()
    .setAuthor(`${server.name} ID: ${server.id}`, guild.iconURL())
    .setColor(0x3D85C6)
    .setThumbnail(server.image)
    .addField('General Info', `Owner:          ${server.owner}
Created:        ${server.createdAt}
Bot Joined:    ${server.botJoin}
Region:          ${server.region}
Filter Level: ${server.filter}                     Roles: ${server.roles}`)
    .addField(`Members: ${server.members}`, `Online: ${server.online}
Users:   ${parseInt(server.members) - parseInt(server.bots)}
Bots:     ${server.bots}`, true)
    .addField(`Channels: ${server.channels}`, `Text:   ${server.text}
Voice: ${parseInt(server.channels) - parseInt(server.text)}`, true)
    .addField(`Active Members Since Last Bot Update: ${server.activity.length}`, `Daily:       ${server.daily.length}
Weekly:  ${server.weekly.length}
Monthly: ${server.monthly.length}`)
    // .addField(`Emojis: ${server.emojis}`, `${server.allEmojis}`, true)
  return msg.reply({ embed })
}

exports.conf = {
  enabled: true,
  runIn: ['text'],
  aliases: ['si'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0
}

exports.help = {
  name: 'server',
  description: 'Gives information about the server that the command is typed in.',
  usage: '',
  usageDelim: '',
  extendedHelp: ''
}
