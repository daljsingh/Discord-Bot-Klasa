exports.run = async (client, msg, [amount]) => {
  msg.channel.bulkDelete(amount, true);
};

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['d'],
  permLevel: 2,
  botPerms: ['MANAGE_MESSAGES'],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: 'delete',
  description: 'This will remove X amount of messages sent in a channel.',
  usage: '<amount:int{2,100}>',
  usageDelim: ' ',
  type: 'commands',
};
