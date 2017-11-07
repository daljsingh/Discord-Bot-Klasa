const config = require('../config/config.json')

exports.VST = (skillTier, thumbnail) => {
  let skillTiers
  if (thumbnail) {
    skillTiers = {
      'Unranked': 'unranked.png',
      'Just Beginning - Bronze': 'tier_01a.png',
      'Just Beginning - Silver': 'tier_01b.png',
      'Just Beginning - Gold': 'tier_01c.png',
      'Getting There - Bronze': 'tier_02a.png',
      'Getting There - Silver': 'tier_02b.png',
      'Getting There - Gold': 'tier_02c.png',
      6: 'tier_03a.png',
      7: 'tier_03b.png',
      8: 'tier_03c.png',
      9: 'tier_04a.png',
      10: 'tier_04b.png',
      11: 'tier_04c.png',
      12: 'tier_05a.png',
      13: 'tier_05b.png',
      14: 'tier_05c.png',
      15: 'tier_06a.png',
      16: 'tier_06b.png',
      17: 'tier_06c.png',
      18: 'tier_07a.png',
      19: 'tier_07b.png',
      20: 'tier_07c.png',
      21: 'iCjuzh',
      22: 'tier_08b.png',
      23: 'tier_08c.png',
      24: 'tier_09a.png',
      25: 'H1F9vT',
      26: 'vxLrpd',
      27: 'ZpZeT5',
      28: 'UQEjM3',
      29: 'Uq8JoC'
    }
    // const url = `https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/${skillTiers[skillTier]}`
    return `https://goo.gl/${skillTiers[skillTier]}`
  }
  skillTiers = {
    'Unranked': '<:0_1:336227076829085696>',
    'Just Beginning - Bronze': '<:000:336226975272402944>',
    'Just Beginning - Silver': '<:001:336227011280502785>',
    'Just Beginning - Gold': '<:002:336227043328917505>',
    'Getting There - Bronze': '<:003:336226960160194561>',
    'Getting There - Silver': '<:004:336226957731692545>',
    'Getting There - Gold': '<:005:336226984524775424>',
    6: '<:006:336227024077062154>',
    7: '<:007:336227024136044545>',
    8: '<:008:336227074534539265>',
    9: '<:009:336227159607738370>',
    10: '<:010:336227183351824385>',
    11: '<:011:336227244152193024>',
    12: '<:012:336227304269414400>',
    13: '<:013:336227315086524417>',
    14: '<:014:336227388843229184>',
    15: '<:015:336227345025466369>',
    16: '<:016:336227320484593664>',
    17: '<:017:336227408585818112>',
    18: '<:018:336227421076324352>',
    19: '<:019:336227420728328192>',
    20: '<:020:336227428525408259>',
    21: '<:021:336227370841407488>',
    22: '<:022:336227348452081674>',
    23: '<:023:336227431885176846>',
    24: '<:027:336227435064328202>',
    25: '<:028:336227413413462017>',
    26: '<:029:336227446691069952>',
    27: '<:024:336227371659296780>',
    28: '<:025:336227396426399754>',
    29: '<:026:336227453251092480>'
  }
  return skillTiers[skillTier]
}

exports.vstNumberToText = (rank) => {
  const ranges = [
    {
      'VST': 'Just Beginning Bronze',
      'starts': 0,
      'ends': 108.9
    },
    {
      'VST': 'Just Beginning Silver',
      'starts': 109,
      'ends': 217.9
    },
    {
      'VST': 'Just Beginning Gold',
      'starts': 218,
      'ends': 326.9
    },
    {
      'VST': 'Getting There Bronze',
      'starts': 327,
      'ends': 435.9
    },
    {
      'VST': 'Getting There Silver',
      'starts': 436,
      'ends': 544.9
    },
    {
      'VST': 'Getting There Gold',
      'starts': 545,
      'ends': 653.9
    },
    {
      'VST': 'Rock Solid Bronze',
      'starts': 654,
      'ends': 762.9
    },
    {
      'VST': 'Rock Solid Silver',
      'starts': 763,
      'ends': 871.9
    },
    {
      'VST': 'Rock Solid Gold',
      'starts': 872,
      'ends': 980.9
    },
    {
      'VST': 'Worthy Foe Bronze',
      'starts': 981,
      'ends': 1089.9
    },
    {
      'VST': 'Worthy Foe Silver',
      'starts': 1090,
      'ends': 1199.9
    },
    {
      'VST': 'Worthy Foe Gold',
      'starts': 1200,
      'ends': 1299.9
    },
    {
      'VST': 'Got Swagger Bronze',
      'starts': 1250,
      'ends': 1299.9
    },
    {
      'VST': 'Got Swagger Silver',
      'starts': 1300,
      'ends': 1349.9
    },
    {
      'VST': 'Got Swagger Gold',
      'starts': 1350,
      'ends': 1399.9
    },
    {
      'VST': 'Credible Threat Bronze',
      'starts': 1400,
      'ends': 1466.9
    },
    {
      'VST': 'Credible Threat Silver',
      'starts': 1467,
      'ends': 1532.9
    },
    {
      'VST': 'Credible Threat Gold',
      'starts': 1533,
      'ends': 1599.9
    },
    {
      'VST': 'Hotness Bronze',
      'starts': 1600,
      'ends': 1666.9
    },
    {
      'VST': 'Hotness Silver',
      'starts': 1667,
      'ends': 1732.9
    },
    {
      'VST': 'Hotness Gold',
      'starts': 1733,
      'ends': 1799.9
    },
    {
      'VST': 'Simply Amazing Bronze',
      'starts': 1800,
      'ends': 1866.9
    },
    {
      'VST': 'Simply Amazing Silver',
      'starts': 1867,
      'ends': 1932.9
    },
    {
      'VST': 'Simply Amazing Gold',
      'starts': 1933,
      'ends': 1999.9
    },
    {
      'VST': 'Pinnacle of Awesome Bronze',
      'starts': 2000,
      'ends': 2133.9
    },
    {
      'VST': 'Pinnacle of Awesome Silver',
      'starts': 2134,
      'ends': 2266.9
    },
    {
      'VST': 'Pinnacle of Awesome Gold',
      'starts': 2267,
      'ends': 2399.9
    },
    {
      'VST': 'Vainglorious Bronze',
      'starts': 2400,
      'ends': 2599.9
    },
    {
      'VST': 'Vainglorious Silver',
      'starts': 2600,
      'ends': 2799.9
    },
    {
      'VST': 'Vainglorious Gold',
      'starts': 2800,
      'ends': 30000
    }
  ]
  let name
  for (let i = 0; i < ranges.length; i++) {
    if (rank <= ranges[i].starts) continue
    if (rank >= ranges[i].ends) continue
    name = ranges[i].VST
  }
  return name
}

exports.region = (client, msg, server) => {
  let region = ''
  switch (server) {
    case 'sea':
      region = 'sg'
      break
    case 't-na':
      region = 'tournament-na'
      break
    case 't-eu':
      region = 'tournament-eu'
      break
    case 't-sa':
      region = 'tournament-sa'
      break
    case 't-sea':
    case 't-sg':
      region = 'tournament-sg'
      break
    case 't-ea':
      region = 'tournament-ea'
      break
    case 't-cn':
      region = 'tournament-cn'
      break
    default:
      region = server
  }
  return region
}

exports.useIGN = async (client, msg) => {
  let output
  await client.providers.get('json').get('verify', msg.author.id).then((data) => {
    if (!data) return false
    output = data
  })
  return output
}

exports.karma = (karmaLevel) => {
  const karmas = {
    0: '<:bad:324670994797166592>',
    1: '<:good:324670994553765890>',
    2: '<:great:324670995027853312>'
  }
  return karmas[karmaLevel]
}

exports.reverseGameModes = (type) => {
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

exports.gameModes = (type) => {
  const gameModes = {
    blitz_pvp_ranked: 'Blitz',
    ranked: 'Ranked',
    casual: 'Casual',
    private_party_blitz_match: 'Private Blitz',
    casual_aral: 'Battle Royale',
    private: 'Private',
    private_party_draft_match: 'Private Draft',
    private_party_aral_match: 'Private Battle Royale'
  }
  return gameModes[type]
}

exports.heroes = (hero) => {
  const heroes = {
    adagio: '<:001:334004905742303232>',
    alpha: '<:002:334004937920872449>',
    ardan: '<:003:334004940840108032>',
    baptiste: '<:004:334004937442852864>',
    baron: '<:005:334004940424871947>',
    blackfeather: '<:006:334004948301774858>',
    catherine: '<:007:334004945005051925>',
    celeste: '<:008:334004952844468237>',
    churnwalker: '<:103:367692339986038794>',
    flicker: '<:009:334004991239127040>',
    fortress: '<:010:334004995726770187>',
    glaive: '<:011:334004989187981312>',
    grace: '<:012:334004996330749952>',
    grumpjaw: '<:013:334004993449263104>',
    gwen: '<:014:334004996536401925>',
    idris: '<:015:334004993981939713>',
    joule: '<:016:334004994162294795>',
    kestrel: '<:017:334004994694971392>',
    koshka: '<:018:334080530813419522>',
    krul: '<:019:334004995563323395>',
    lance: '<:020:334004994346844161>',
    lyra: '<:021:334004996267966465>',
    ozo: '<:022:334004996205182980>',
    petal: '<:023:334004994292449280>',
    phinn: '<:024:334004995324379136>',
    reim: '<:025:334004995949330432>',
    reza: '<:35:344582697945137152>',
    ringo: '<:026:334004992958529536>',
    rona: '<:027:334004996473356310>',
    samuel: '<:028:334004991025086464>',
    saw: '<:029:334004995848405004>',
    skaarf: '<:030:334004993642332160>',
    skye: '<:031:334004990991663104>',
    taka: '<:032:334004995961782272>',
    vox: '<:034:334004996985323520>'
  }
  return heroes[hero.toLowerCase().slice(1, -1)]
}

exports.getRegionRoleId = async (region, regionRole) => {
  switch (region) {
    case 'na':
      regionRole = config.vgServer.roles.na
      return regionRole
    case 'eu':
      regionRole = config.vgServer.roles.eu
      return regionRole
    case 'sa':
      regionRole = config.vgServer.roles.sa
      return regionRole
    case 'sea':
    case 'sg':
      regionRole = config.vgServer.roles.sea
      return regionRole
    case 'cn':
      regionRole = config.vgServer.roles.cn
      return regionRole
    case 'ea':
      regionRole = config.vgServer.roles.ea
      return regionRole
    default:
  }
}

exports.items = (items) => {
  const heroItems = []
  for (let i = 0; i < items.length; i += 1) {
    heroItems.push(items[i].toLowerCase())
  }
  let itemEmojis = ''
  const allItems = {
    'poisoned shiv': '<:048:333992835558932491>',
    'spellsword': '<:sps:356219754790256640>',
    'healing flask': '<:hf:356219754601512961>',
    'nullwave gauntlet': '<:044:333992835571515422>',
    'crystal bit': '<:016:333992823571480577>',
    'piercing spear': '<:047:333992834094989312>',
    clockwork: '<:012:333992833591541761>',
    'minions foot': '<:043:333992830122852352>',
    'minion candy': '<:042:333992821415608321>',
    'book of eulogies': '<:008:333992830655791105>',
    'kinetic shield': '<:035:333992829376397313>',
    'lucky strike': '<:040:333992829909204993>',
    lifespring: '<:037:333992834627534860>',
    aftershock: '<:002:333992807050248194>',
    'fountain of renewal': '<:026:333992832249495555>',
    "dragon's eye": '<:101:367692414120361984>',
    spellfire: '<:102:367692413797531649>',
    echo: '<:103:367692549709627395>',
    'heavy steel': '<:031:333992824792023061>',
    'journey boots': '<:034:333992829456089088>',
    flare: '<:024:333992819406667779>',
    'protector contract': '<:050:333992835407937537>',
    'breaking point': '<:009:333992831016370178>',
    'piercing shard': '<:046:333992834090795009>',
    'halcyon chargers': '<:028:333992834724003843>',
    'crystal infusion': '<:017:333992831448383489>',
    'barbed needle': '<:005:333992830835884032>',
    'coat of plates': '<:013:333992831360303106>',
    'dragonblood contract': '<:018:333992834938175488>',
    'energy battery': '<:022:333992823999168515>',
    'atlas pauldron': '<:004:333992822573105172>',
    hourglass: '<:032:333992825282887681>',
    aegis: '<:001:333992796648374277>',
    frostburn: '<:027:333992833646198787>',
    'alternating current': '<:003:333992822430760970>',
    'heavy prism': '<:030:333992832199294978>',
    flaregun: '<:025:333992835185377280>',
    crucible: '<:015:333992831448252417>',
    'broken myth': '<:010:333992831091867650>',
    chronograph: '<:011:333992831549046785>',
    'metal jacket': '<:041:333992832501022725>',
    'eve of harvest': '<:023:333992832278986753>',
    'ironguard contract': '<:033:333992835252748308>',
    'eclipse prism': '<:021:333992832203489280>',
    'blazing salvo': '<:006:333992817808506881>',
    'halcyon potion': '<:029:333992819939213314>',
    'light armor': '<:039:333992825580552193>',
    bonesaw: '<:007:333992830475304962>',
    'light shield': '<:039:333992825580552193>',
    contraption: '<:014:333992834245984257>',
    'pot of gold': '<:049:333992835592355840>',
    oakheart: '<:045:333992826360823808>',
    'level juice': '<:036:333992834900164609>',
    dragonheart: '<:019:333992831817613312>',
    'tyrants monocle': '<:066:333994046269685761>',
    stormcrown: '<:060:333994046622007297>',
    sorrowblade: '<:058:333994045405659137>',
    'six sins': '<:056:333994045540007937>',
    'reflex block': '<:051:333994032684597249>',
    'war treads': '<:069:333994046571937794>',
    'weapon blade': '<:070:333994043451113474>',
    'slumbering husk': '<:057:333994046492114949>',
    'weapon infusion': '<:071:333994047444090882>',
    'tension bow': '<:063:333994045707780108>',
    'scout trap': '<:052:333994025453617154>',
    'travel boots': '<:065:333994044655009802>',
    'tornado trigger': '<:064:333994044545957888>',
    shatterglass: '<:054:333994043342061568>',
    'sprint boots': '<:059:333994042079576070>',
    'void battery': '<:068:333994046131273729>',
    shiversteel: '<:055:333994044894085122>',
    'swift shooter': '<:062:333994039667851266>',
    'stormguard banner': '<:061:333994046043455489>',
    'serpent mask': '<:053:333994044868919296>'
  }
  for (let i = 0; i < items.length; i += 1) {
    itemEmojis += allItems[heroItems[i]]
  }
  return itemEmojis
}

exports.checkRegion = async (ign) => {
  const Vainglory = require('vainglory')
  const allRegions = ['na', 'eu', 'ea', 'sa', 'sg', 'cn']
  let region

  /* Default Options for calling VG API */
  const options = {
    host: 'https://api.dc01.gamelockerapp.com/shards/',
    /* Default NA region */
    region: 'na',
    title: 'semc-vainglory'
  }

  const vainglory = new Vainglory(config.vgKey, options)
  /* Must take an array */
  const playerNames = [ign]
  for (let i = 0; i < allRegions.length; i++) {
    region = await vainglory.region(allRegions[i]).players.getByName(playerNames).then((players) => {
      // If player object exists return the region in which it exists
      if (!players.errors) return allRegions[i]
    })
  }
  return region
}
