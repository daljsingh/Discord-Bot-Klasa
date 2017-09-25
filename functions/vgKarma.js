module.exports = (karmaLevel) => {
  const karmas = {
    0: '<:bad:324670994797166592>',
    1: '<:good:324670994553765890>',
    2: '<:great:324670995027853312>',
  };
  return karmas[karmaLevel];
};
module.exports.conf = { requiredModules: [] };
module.exports.help = {
  name: 'vgKarma',
  type: 'functions',
  description: 'Converts input into a different cleaner output',
};
