module.exports = (skillTier, thumbnail) => {
  if (thumbnail) {
    const skillTiers = {
      '-1': 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/unranked.png',
      0: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_01a.png',
      1: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_01b.png',
      2: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_01c.png',
      3: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_02a.png',
      4: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_02b.png',
      5: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_02c.png',
      6: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_03a.png',
      7: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_03b.png',
      8: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_03c.png',
      9: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_04a.png',
      10: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_04b.png',
      11: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_04c.png',
      12: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_05a.png',
      13: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_05b.png',
      14: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_05c.png',
      15: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_06a.png',
      16: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_06b.png',
      17: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_06c.png',
      18: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_07a.png',
      19: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_07b.png',
      20: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_07c.png',
      21: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_08a.png',
      22: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_08b.png',
      23: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_08c.png',
      24: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_09a.png',
      25: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_09b.png',
      26: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_09c.png',
      27: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_10a.png',
      28: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_10b.png',
      29: 'https://media.githubusercontent.com/media/gamelocker/vainglory-assets/master/assets/skill_tiers/tier_10c.png'
    }
    return skillTiers[skillTier]
  }
  const skillTiers = {
    '-1': '<:0_1:336227076829085696>',
    0: '<:000:336226975272402944>',
    1: '<:001:336227011280502785>',
    2: '<:002:336227043328917505>',
    3: '<:003:336226960160194561>',
    4: '<:004:336226957731692545>',
    5: '<:005:336226984524775424>',
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
module.exports.conf = { requiredModules: [] }
module.exports.help = {
  name: 'vgVST',
  type: 'functions',
  description: 'Converts input into a different cleaner output'
}
