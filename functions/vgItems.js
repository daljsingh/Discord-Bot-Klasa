module.exports = (items) => {
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
module.exports.conf = { requiredModules: [] }
module.exports.help = {
  name: 'vgItems',
  type: 'functions',
  description: 'Converts input into a different cleaner output'
}
