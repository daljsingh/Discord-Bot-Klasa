module.exports = (skillTier) => {
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
    29: '<:026:336227453251092480>',
  };
  return skillTiers[skillTier];
};
module.exports.conf = { requiredModules: [] };
module.exports.help = {
  name: 'vgVST',
  type: 'functions',
  description: 'Converts input into a different cleaner output',
};
