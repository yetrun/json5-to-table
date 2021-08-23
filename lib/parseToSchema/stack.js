const isObject = require('lodash.isobject')
const merge = require('lodash.merge')

// data 必须是对象或者对象数组。我会直接用数组的第一个元素判断是否是对象数组，
// 如果不是对象数组，就当基本值对待。
function parseToSchema (data) {
  data = deepMergeToPlainObject(data)
  return parsePlainObjectToSchema(data)
}

function parsePlainObjectToSchema (data) {
  return Object.entries(data).map(([name, dataItem]) => {
    const props = parsePlainObjectToSchema(dataItem)
    if (props.length > 0) {
      return { title: name, path: name, props }
    } else {
      return { title: name, path: name }
    }
  })
}

function deepMergeToPlainObject (data) {
  if (Array.isArray(data)) {
    return merge({}, ...data.map(dataItem => deepMergeToPlainObject(dataItem)))
  } else if (isObject(data)) {
    const object = {}
    for (const [name, value] of Object.entries(data)) {
      object[name] = deepMergeToPlainObject(value)
    }
    return object
  } else {
    return {}
  }
}

module.exports = parseToSchema
