module.exports = (type) => {
  const gameModes = {
    blitz_pvp_ranked: 'Blitz',
    ranked: 'Ranked',
    casual: 'Casual',
    private_party_blitz_match: 'Private Blitz',
    casual_aral: 'Battle Royale',
    private: 'Private',
    private_party_draft_match: 'Private Draft',
    private_party_aral_match: 'Private Battle Royale',
  };
  return gameModes[type];
};

module.exports.conf = { requiredModules: [] };
module.exports.help = {
  name: 'vgGameModes',
  type: 'functions',
  description: 'Converts input into a different cleaner output',
};
