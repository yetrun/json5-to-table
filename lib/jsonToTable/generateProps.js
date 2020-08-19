// 根据 data 生成 props

const merge = require('lodash.merge')
const { isObject, isArray } = require('../types')

function generateProps (object) {
  return Object.keys(object).map(key => {
    const prop = { key }
    if (typeof object[key] === 'object') {
      const props = generateProps(object[key])
      if (props.length > 0) {
        prop.props = props
      }
    }
    return prop
  })
}

function simplifyObject (data) {
  if (isArray(data)) {
    const simpleObjects = data.map(val => simplifyObject(val))
    return merge({}, ...simpleObjects)
  }

  const object = {}
  Object.keys(data).forEach(key => {
    const val = data[key]
    if (isObject(val) || isArray(val)) {
      object[key] = simplifyObject(val)
    } else {
      object[key] = true
    }
  })
  return object
}

module.exports = function (data) {
  return generateProps(
    simplifyObject(data)
  )
}
