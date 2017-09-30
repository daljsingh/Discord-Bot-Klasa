exports.conf = {
  enabled: true,
  ignoreBots: true,
  ignoreSelf: true
}

exports.run = (client, msg) => {
  if (msg.channel.id === '360828870674350100') return client.channels.get('360626035563167754').send(msg.content)
}
