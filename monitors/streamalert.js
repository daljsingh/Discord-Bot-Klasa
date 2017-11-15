const { Monitor } = require('klasa');

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            name: 'streamalert',
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true
        });
    }

    run(msg) {
        if (msg.channel.id !== '360828870674350100') return
        msg.guild.channels.get('360626035563167754').send(msg.content)
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};