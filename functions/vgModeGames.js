module.exports = (type) => {
  const gameModes = {
    Blitz: 'blitz_pvp_ranked',
    Ranked: 'ranked',
    Casual: 'casual',
    blitz: 'blitz_pvp_ranked',
    ranked: 'ranked',
    casual: 'casual',
    private: ['private_party_aral_match', 'private_party_draft_match', 'private'],
    BR: 'casual_aral',
    br: 'casual_aral',
    standard: ['ranked', 'casual'],
    brawl: ['blitz_pvp_ranked', 'casual_aral']
  }
  return gameModes[type]
}

module.exports.conf = { requiredModules: [] }
module.exports.help = {
  name: 'vgModeGames',
  type: 'functions',
  description: 'Converts input into a different cleaner output'
}
