const { Event } = require('klasa')
const config = require('../config/config.json')

module.exports = class extends Event {
  constructor (...args) {
    super(...args, { name: 'ready', enabled: true })
  }

  async run () {
    // To Create a Schema in Database uncomment this and change the '' at the bttom after add to the name of the schema

    async function validate (resolver, user) {
      const result = await resolver.user(user)
      if (!result) throw 'The parameter <String> is invalid. Please try again'
      return result
    };
    const schema = {
      quote: {
        type: 'String',
        default: null,
        array: false
      }
    }
    this.client.settings.add('users', validate, schema);
    this.client.user.setActivity(`$help|In ${this.client.guilds.size} Guilds.`);
  }
}
