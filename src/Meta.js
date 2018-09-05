class Meta {
  constructor (metaObject) {
    const [order, mapping] = get(metaObject)
    this.order = order
    this.mapping = mapping
  }

  toJSON () {
    return {
      order: this.order,
      mapping: this.mapping
    }
  }
}

function get (object) {
  if (object.order) {
    const order = object.order
    const mapping = order.reduce((obj, key) => {
      obj[key] = object.mapping[key]
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

module.exports = Meta
