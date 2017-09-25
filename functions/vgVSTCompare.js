module.exports = (client, array, boolean) => {
  // Take the array and sort it
  const data = array.sort((a, b) => b[1] - a[1])
  // Create necessary var in order to use below
  let output = ''
  let player = data[0]
  // If VST is the category
  if (boolean) {
    // Place winner at top and Bold
    output += `**${player[0].padEnd(16)} ${client.funcs.vgVST(player[1])}**\n`
    // Add other players data below without Bold
    for (let i = 1; i < data.length; i++) {
      player = data[i]
      output += `${player[0].padEnd(16)} ${client.funcs.vgVST(player[1])}\n`
    }
  // If VST is not the category 
  } else {
    // Add winner at top and Bold.
    output += `**${player[0].padEnd(16)} ${player[1]}**\n`
    // Add other players data below without bold.
    for (let i = 1; i < data.length; i++) {
      player = data[i]
      output += `${player[0].padEnd(16)} ${player[1]}\n`
    }
  }
  return output
}

module.exports.conf = { requiredModules: [] }
module.exports.help = {
  name: 'vgVSTCompare',
  type: 'functions',
  description: 'Converts input into a different cleaner output'
}
