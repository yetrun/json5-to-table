const { isString } = require('./isTypes')

class Meta {
  constructor (metaObject) {
    const [order, mapping] = getOrderAndMapping(metaObject)
    this.order = order
    this.mapping = getMapping(mapping)
  }
}

class Schema {
  constructor (key, schema = {}) {
    if (isString(schema)) {
      schema = {
        title: schema
      }
    }
    this.title = schema.title || key
    if (schema.inner) {
      this.inner = new Meta(schema.inner)
    }
  }
}

function getOrderAndMapping (object = {}) {
  if (object.order) {
    const order = object.order
    let mapping = object.mapping || {}
    mapping = order.reduce((obj, key) => {
      obj[key] = mapping[key]
      return obj
    }, {})
    return [order, mapping]
  } else if (object.mapping) {
    const order = Object.keys(object.mapping)
    const mapping = object.mapping
    return [order, mapping]
  } else {
    const order = Object.keys(object)
    const mapping = object
    return [order, mapping]
  }
}

function getMapping (object = {}) {
  return Object.keys(object).reduce((mapping, key) => {
    mapping[key] = new Schema(key, object[key])
    return mapping
  }, {})
}

module.exports = Meta
