module.exports = async (client, msg) => {
  const data = await client.providers.get('mongodb').get('savevg', msg.author.id)
  console.log(data)
  return data
}
module.exports.conf = { requiredModules: [] }
module.exports.help = {
  name: 'useIGN',
  type: 'functions',
  description: 'Converts input into a different cleaner output'
}
