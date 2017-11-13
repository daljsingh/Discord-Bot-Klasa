const { Command } = require('klasa')
const roleFile = require('../../config/roleFile.json')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'role',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: ['r'],
      permLevel: 0,
      botPerms: ['MANAGE_ROLES'],
      requiredSettings: [],
      description: 'Give or take a role.',
      quotedStringSupport: false,
      usage: '[role:str] [member:member]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [role, member]) {
    if (!role || !member) return msg.reply('Sorry, you did not provide both a user and a role. Please try again.')
    const roleId = await msg.guild.roles.find('name', role).id
    if (!roleId) return msg.reply('Sorry, I can not find that role on this server. Are you sure you spelled it correctly?')
    let assignable
    const keys = await Object.keys(roleFile)
    for (const key of keys) {
      assignable = await roleFile[key][roleId]
      if (!assignable) continue
      assignable = assignable.by
      for (const id of assignable) {
        const canAssign = await msg.member.roles.get(id)
        if (!canAssign) continue
        const hasRole = await member.roles.get(roleId)
        if (hasRole) member.removeRole(roleId)
        else member.addRole(roleId)
        return msg.reply(`${member} ${hasRole ? 'has lost' : 'was given'} the ${role}.`)
      }
    }
    return msg.reply('Sorry, you dont have the privledge to assign that role.')
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
