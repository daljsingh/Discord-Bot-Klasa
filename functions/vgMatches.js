module.exports = (data, ign, player) => {
  let playerOutput = ``;
  if (player === 1) {
    if (data.p1Ign === ign) {
      playerOutput = `**__${data.p1Ign}__**\n`;
    } else {
      playerOutput = `\`*${data.p1Ign}*\`\n`;
    }
    playerOutput += `${data.p1Hero}${data.p1VST}${data.p1Items}\nKDA: ${data.p1Kills}/${data.p1Deaths}/${data.p1Assists}      CS: ${data.p1CS}     CS/min: ${Math.floor(data.p1CS / (data.duration / 60))}     Jungle: ${data.p1JungleKills}     Gold: ${data.p1Gold}      Gold/min: ${Math.floor(data.p1GoldMin / (data.duration / 60)).toLocaleString()}`;
    if (data.p1Miners > 0 || data.p1GMiners > 0) {
      playerOutput += `     Miners C/G: ${data.p1Miners}/${data.p1GMiners}`;
    }
    if (data.p1AFK !== -1) {
      playerOutput += `     First AFK at ${Math.floor(data.p1AFK / 60)}:${Math.floor(data.p1AFK % 60)}`;
    }
  } else if (player === 2) {
    if (data.p2Ign === ign) {
      playerOutput = `**__${data.p2Ign}__**\n`;
    } else {
      playerOutput = `\`*${data.p2Ign}*\`\n`;
    }
    playerOutput += `${data.p2Hero}${data.p2VST}${data.p2Items}\nKDA: ${data.p2Kills}/${data.p2Deaths}/${data.p2Assists}      CS: ${data.p2CS}     CS/min: ${Math.floor(data.p2CS / (data.duration / 60))}     Jungle: ${data.p2JungleKills}     Gold: ${data.p2Gold}      Gold/min: ${Math.floor(data.p2GoldMin / (data.duration / 60)).toLocaleString()}`;
    if (data.p2Miners > 0 || data.p2GMiners > 0) {
      playerOutput += `     Miners C/G: ${data.p2Miners}/${data.p2GMiners}`;
    }
    if (data.p2AFK !== -1) {
      playerOutput += `     First AFK at ${Math.floor(data.p2AFK / 60)}:${Math.floor(data.p2AFK % 60)}`;
    }
  } else if (player === 3) {
    if (data.p3Ign === ign) {
      playerOutput = `**__${data.p3Ign}__**\n`;
    } else {
      playerOutput = `\`*${data.p3Ign}*\`\n`;
    }
    playerOutput += `${data.p3Hero}${data.p3VST}${data.p3Items}\nKDA: ${data.p3Kills}/${data.p3Deaths}/${data.p3Assists}      CS: ${data.p3CS}     CS/min: ${Math.floor(data.p3CS / (data.duration / 60))}     Jungle: ${data.p3JungleKills}     Gold: ${data.p3Gold}      Gold/min: ${Math.floor(data.p3GoldMin / (data.duration / 60)).toLocaleString()}`;
    if (data.p3Miners > 0 || data.p3GMiners > 0) {
      playerOutput += `     Miners C/G: ${data.p3Miners}/${data.p3GMiners}`;
    }
    if (data.p1AFK !== -1) {
      playerOutput += `     First AFK at ${Math.floor(data.p3AFK / 60)}:${Math.floor(data.p3AFK % 60)}`;
    }
  } else if (player === 4) {
    if (data.p4Ign === ign) {
      playerOutput = `**__${data.p4Ign}__**\n`;
    } else {
      playerOutput = `\`*${data.p4Ign}*\`\n`;
    }
    playerOutput += `${data.p4Hero}${data.p4VST}${data.p4Items}\nKDA: ${data.p4Kills}/${data.p4Deaths}/${data.p4Assists}      CS: ${data.p4CS}     CS/min: ${Math.floor(data.p4CS / (data.duration / 60))}     Jungle: ${data.p4JungleKills}     Gold: ${data.p4Gold}      Gold/min: ${Math.floor(data.p4GoldMin / (data.duration / 60)).toLocaleString()}`;
    if (data.p4Miners > 0 || data.p4GMiners > 0) {
      playerOutput += `     Miners C/G: ${data.p4Miners}/${data.p4GMiners}`;
    }
    if (data.p4AFK !== -1) {
      playerOutput += `     First AFK at ${Math.floor(data.p4AFK / 60)}:${Math.floor(data.p4AFK % 60)}`;
    }
  } else if (player === 5) {
    if (data.p5Ign === ign) {
      playerOutput = `**__${data.p5Ign}__**\n`;
    } else {
      playerOutput = `\`*${data.p5Ign}*\`\n`;
    }
    playerOutput += `${data.p5Hero}${data.p5VST}${data.p5Items}\nKDA: ${data.p5Kills}/${data.p5Deaths}/${data.p5Assists}      CS: ${data.p5CS}     CS/min: ${Math.floor(data.p5CS / (data.duration / 60))}     Jungle: ${data.p5JungleKills}     Gold: ${data.p5Gold}      Gold/min: ${Math.floor(data.p5GoldMin / (data.duration / 60)).toLocaleString()}`;
    if (data.p5Miners > 0 || data.p5GMiners > 0) {
      playerOutput += `     Miners C/G: ${data.p5Miners}/${data.p5GMiners}`;
    }
    if (data.p5AFK !== -1) {
      playerOutput += `     First AFK at ${Math.floor(data.p5AFK / 60)}:${Math.floor(data.p5AFK % 60)}`;
    }
  } else {
    if (data.p6Ign === ign) {
      playerOutput = `**__${data.p6Ign}__**\n`;
    } else {
      playerOutput = `\`*${data.p6Ign}*\`\n`;
    }
    playerOutput += `${data.p6Hero}${data.p6VST}${data.p6Items}\nKDA: ${data.p6Kills}/${data.p6Deaths}/${data.p6Assists}      CS: ${data.p6CS}     CS/min: ${Math.floor(data.p6CS / (data.duration / 60))}     Jungle: ${data.p6JungleKills}     Gold: ${data.p6Gold}      Gold/min: ${Math.floor(data.p6GoldMin / (data.duration / 60)).toLocaleString()}`;
    if (data.p6Miners > 0 || data.p6GMiners > 0) {
      playerOutput += `     Miners C/G: ${data.p6Miners}/${data.p6GMiners}`;
    }
    if (data.p6AFK !== -1) {
      playerOutput += `     First AFK at ${Math.floor(data.p6AFK / 60)}:${Math.floor(data.p6AFK % 60)}`;
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
  return playerOutput;
};
module.exports.conf = { requiredModules: [] };
module.exports.help = {
  name: 'vgMatches',
  type: 'functions',
  description: 'Converts input into a different cleaner output',
};
