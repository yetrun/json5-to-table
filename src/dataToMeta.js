const { isObject } = require('./isTypes')
const Meta = require('./Meta')

function dataToMeta (data) {
  const metaObject = Object.keys(data).reduce((obj, key) => {
    obj[key] = { title: key } 
    const value = data[key]
    if (isObject(value)) {
      obj[key].inner = dataToMeta(value)
    }
    return obj
  }, {})
  return new Meta(metaObject)
}

module.exports = dataToMeta
