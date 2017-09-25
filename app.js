const Komada = require('komada')
const config = require('./config/config.json')

const client = new Komada.Client(config.botSettings)

client.login(config.botToken)
