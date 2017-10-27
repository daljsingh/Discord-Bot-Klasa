module.exports = (data, ign, player, region) => {
  const vgpro = `https://vgpro.gg/players/${region}/`
  let playerOutput = ``
  const p1 = {
    ign: data.p1Ign,
    hero: data.p1Hero,
    vst: data.p1VST,
    item: data.p1Items,
    k: data.p1Kills,
    d: data.p1Deaths,
    a: data.p1Assists,
    csm: Math.floor(data.p1CS / (data.duration / 60)),
    j: data.p1JungleKills,
    gm: Math.floor(data.p1GoldMin / (data.duration / 60)).toLocaleString(),
    afkm: Math.floor(data.p1AFK / 60),
    afks: Math.floor(data.p1AFK % 60)
  }
  const p2 = {
    ign: data.p2Ign,
    hero: data.p2Hero,
    vst: data.p2VST,
    item: data.p2Items,
    k: data.p2Kills,
    d: data.p2Deaths,
    a: data.p2Assists,
    csm: Math.floor(data.p2CS / (data.duration / 60)),
    j: data.p2JungleKills,
    gm: Math.floor(data.p2GoldMin / (data.duration / 60)).toLocaleString(),
    afkm: Math.floor(data.p2AFK / 60),
    afks: Math.floor(data.p2AFK % 60)
  }
  const p3 = {
    ign: data.p3Ign,
    hero: data.p3Hero,
    vst: data.p3VST,
    item: data.p3Items,
    k: data.p3Kills,
    d: data.p3Deaths,
    a: data.p3Assists,
    csm: Math.floor(data.p3CS / (data.duration / 60)),
    j: data.p3JungleKills,
    gm: Math.floor(data.p3GoldMin / (data.duration / 60)).toLocaleString(),
    afkm: Math.floor(data.p3AFK / 60),
    afks: Math.floor(data.p3AFK % 60)
  }
  const p4 = {}
  const p5 = {}
  const p6 = {}
  if (player === 1) {
    if (data.p1Ign === ign) {
      playerOutput = `**__${data.p1Ign}__**\n`
    } else {
      playerOutput = `${data.p1Ign}\n`
    }
    playerOutput += `${p1.hero}${p1.vst}${p1.item}\nKDA: ${p1.k}/${p1.d}/${p1.a}      CS: ${data.p1CS}     CS/min: ${p1.csm}     Jungle: ${p1.j}     Gold: ${data.p1Gold}      Gold/min: ${p1.gm}`
    if (data.p1Miners > 0 || data.p1GMiners > 0) {
      playerOutput += `     Miners C/G: ${data.p1Miners}/${data.p1GMiners}`
    }
    if (data.p1AFK !== -1) {
      playerOutput += `     First AFK at ${p1.afkm}:${p1.afks}`
    }
  } else if (player === 2) {
    if (data.p2Ign === ign) {
      playerOutput = `**__${data.p2Ign}__**\n`
    } else {
      playerOutput = `[${data.p2Ign}](${vgpro}${data.p2Ign})\n`
    }
    playerOutput += `${p2.hero}${p2.vst}${p2.item}\nKDA: ${p2.k}/${p2.d}/${p2.a}      CS: ${data.p2CS}     CS/min: ${p2.csm}     Jungle: ${p2.j}     Gold: ${data.p2Gold}      Gold/min: ${p2.gm}`
    if (data.p2Miners > 0 || data.p2GMiners > 0) {
      playerOutput += `     Miners C/G: ${data.p2Miners}/${data.p2GMiners}`
    }
    if (data.p2AFK !== -1) {
      playerOutput += `     First AFK at ${p2.afkm}:${p2.afks}`
    }
  } else if (player === 3) {
    if (data.p3Ign === ign) {
      playerOutput = `**__${data.p3Ign}__**\n`
    } else {
      playerOutput = `*${data.p3Ign}*\n`
    }
    playerOutput += `${p3.hero}${p3.vst}${p3.item}\nKDA: ${p3.k}/${p3.d}/${p3.a}      CS: ${data.p3CS}     CS/min: ${p3.csm}     Jungle: ${p3.j}     Gold: ${data.p3Gold}      Gold/min: ${p3.gm}`
    if (data.p3Miners > 0 || data.p3GMiners > 0) {
      playerOutput += `     Miners C/G: ${data.p3Miners}/${data.p3GMiners}`
    }
    if (data.p1AFK !== -1) {
      playerOutput += `     First AFK at ${p3.afkm}:${p3.afks}`
    }
  } else if (player === 4) {
    if (data.p4Ign === ign) {
      playerOutput = `**__${data.p4Ign}__**\n`
    } else {
      playerOutput = `*${data.p4Ign}*\n`
    }
    playerOutput += `${data.p4Hero}${data.p4VST}${data.p4Items}\nKDA: ${data.p4Kills}/${data.p4Deaths}/${data.p4Assists}      CS: ${data.p4CS}     CS/min: ${Math.floor(data.p4CS / (data.duration / 60))}     Jungle: ${data.p4JungleKills}     Gold: ${data.p4Gold}      Gold/min: ${Math.floor(data.p4GoldMin / (data.duration / 60)).toLocaleString()}`
    if (data.p4Miners > 0 || data.p4GMiners > 0) {
      playerOutput += `     Miners C/G: ${data.p4Miners}/${data.p4GMiners}`
    }
    if (data.p4AFK !== -1) {
      playerOutput += `     First AFK at ${Math.floor(data.p4AFK / 60)}:${Math.floor(data.p4AFK % 60)}`
    }
  } else if (player === 5) {
    if (data.p5Ign === ign) {
      playerOutput = `**__${data.p5Ign}__**\n`
    } else {
      playerOutput = `*${data.p5Ign}*\n`
    }
    playerOutput += `${data.p5Hero}${data.p5VST}${data.p5Items}\nKDA: ${data.p5Kills}/${data.p5Deaths}/${data.p5Assists}      CS: ${data.p5CS}     CS/min: ${Math.floor(data.p5CS / (data.duration / 60))}     Jungle: ${data.p5JungleKills}     Gold: ${data.p5Gold}      Gold/min: ${Math.floor(data.p5GoldMin / (data.duration / 60)).toLocaleString()}`
    if (data.p5Miners > 0 || data.p5GMiners > 0) {
      playerOutput += `     Miners C/G: ${data.p5Miners}/${data.p5GMiners}`
    }
    if (data.p5AFK !== -1) {
      playerOutput += `     First AFK at ${Math.floor(data.p5AFK / 60)}:${Math.floor(data.p5AFK % 60)}`
    }
  } else {
    if (data.p6Ign === ign) {
      playerOutput = `**__${data.p6Ign}__**\n`
    } else {
      playerOutput = `${data.p6Ign}\n`
    }
    playerOutput += `${data.p6Hero}${data.p6VST}${data.p6Items}\nKDA: ${data.p6Kills}/${data.p6Deaths}/${data.p6Assists}      CS: ${data.p6CS}     CS/min: ${Math.floor(data.p6CS / (data.duration / 60))}     Jungle: ${data.p6JungleKills}     Gold: ${data.p6Gold}      Gold/min: ${Math.floor(data.p6GoldMin / (data.duration / 60)).toLocaleString()}`
    if (data.p6Miners > 0 || data.p6GMiners > 0) {
      playerOutput += `     Miners C/G: ${data.p6Miners}/${data.p6GMiners}`
    }
    if (data.p6AFK !== -1) {
      playerOutput += `     First AFK at ${Math.floor(data.p6AFK / 60)}:${Math.floor(data.p6AFK % 60)}`
    }
  }
  // else if (player === 7) {
  //   playerOutput += `**__${data.p7Ign}__**`;
  // } else if (player === 8) {
  //   playerOutput += `**__${data.p8Ign}__**`;
  // } else if (player === 9) {
  //   playerOutput += `**__${data.p9Ign}__**`;
  // } else {
  //   playerOutput += `**__${data.p10Ign}__**`;
  // }
  return playerOutput
};
module.exports.conf = { requiredModules: [] }
module.exports.help = {
  name: 'vgMatches',
  type: 'functions',
  description: 'Converts input into a different cleaner output'
}
