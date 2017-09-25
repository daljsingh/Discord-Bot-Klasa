module.exports = (str, amount) => {
  if (amount === 'each') {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
  return str.replace(txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

module.exports.conf = { requiredModules: [] };
module.exports.help = {
  name: 'capitalize',
  type: 'functions',
  description: 'Capitalizes the first letter of a string.',
};
