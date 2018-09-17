const jsonToTable = require('./jsonToTable')
const Meta = require('../Meta')
const dataToMeta = require('../dataToMeta')

function intelligentJSONToTable (meta = null, data, builder) {
  if (meta === null) {
    meta = dataToMeta(data)
  } else if (!(meta instanceof Meta)) {
    meta = new Meta(meta)
  }

  return jsonToTable(meta, data, builder)
}

module.exports = intelligentJSONToTable
