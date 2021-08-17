const flatten = require('./flatten')
const stack = require('./stack')

function parseToSchema (data, mode = 'stack') {
  if (mode === 'flatten') {
    return flatten(data)
  } else {
    return stack(data)
  }
}

module.exports = parseToSchema
