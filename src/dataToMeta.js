const { isObject } = require('./isTypes')
const Meta = require('./Meta')

function dataToMeta (data) {
  let array = data
  if (!Array.isArray(array)) {
    array = [array]
  }
  return arrayToMeta(array)
}

// 对象数组转化为Meta
function arrayToMeta (array) {
  return array.reduce((mergedMeta, data) => {
    const meta = objectToMeta(data)
    return mergeMeta(mergedMeta, meta)
  }, new Meta())
}

function objectToMeta (data) {
  const metaObject = Object.keys(data).reduce((obj, key) => {
    obj[key] = { title: key } 
    const value = data[key]
    if (isObject(value)) {
      obj[key].meta = objectToMeta(value)
    }
    return obj
  }, {})
  return new Meta(metaObject)
}

function mergeMeta (meta1, meta2) {
  const order = mergeOrder(meta1.order, meta2.order)
  return new Meta({
    order: order,
    mapping: mergeMapping(order, meta1.mapping, meta2.mapping)
  })
}

function mergeOrder (order1, order2) {
  const order = order1.slice()
  for (const key of order2) {
    if (!order.includes(key)) {
      order.push(key)
    }
  }
  return order
}

function mergeMapping (order, mapping1, mapping2) {
  const mapping = {}
  for (const key of order) {
    mapping[key] = mergeSchema(mapping1[key], mapping2[key])
  }
  return mapping
}

function mergeSchema (schema1, schema2) {
  if (schema1 === undefined) {
    return schema2
  } else if (schema2 === undefined) {
    return schema1
  } else {
    const schema = {
      title: schema1.title
    }
    if (schema1.meta || schema2.meta) {
      schema.meta = mergeMeta(schema1.meta, schema2.meta)
    }
    return schema
  }
}

module.exports = dataToMeta
