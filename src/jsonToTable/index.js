const jsonToTable = require('./jsonToTable')
const { isUndef } = require('../isTypes')
const Meta = require('../Meta')
const dataToMeta = require('../dataToMeta')

function intelligentJSONToTable (meta, data, builder) {
  if (arguments.length === 2) {
    return intelligentJSONToTable(undefined, ...arguments)
  }

  if (isUndef(meta)) {
    meta = dataToMeta(data.slice(0, 10))
  } else if (!(meta instanceof Meta)) {
    meta = new Meta(meta)
  }

  return jsonToTable(meta, data, builder)
}

module.exports = intelligentJSONToTable
