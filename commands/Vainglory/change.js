const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'change',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'Change a users ign and region.!',
      quotedStringSupport: true,
      usage: '<member:member> <ign:str{1,16}> <na|sa|eu|sea|sg|ea|cn>',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [member, ign, server]) {
    if (msg.guild.id !== '67200685216641024') return msg.reply('Sorry, this command is only meant for the Vainglory Server. Come join at <http://superevil.co/discord>')
    let region = server
    if (server === 'sg') region = 'sea'
    const keys = ['ign', 'region']
    for (let i = 0; i < keys.length; i++) {
      this.client.settings.users.update(msg.author, { [keys[i]]: keys[i] === 'ign' ? ign : region })
    }
    return msg.reply(`<@${member.id}> Your account is now saved into the database and now the bot will know who you are on all the ${this.client.guilds.size} servers.`)
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}

exports.run = async (client, msg, [member, ign, server]) => {
  
}
