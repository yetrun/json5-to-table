// 根据 data 生成 props

const merge = require('lodash.merge')

function generateProps (object) {
  return Object.keys(object).map(key => {
    const prop = { key }
    if (typeof object[key] === 'object') {
      prop.props = generateProps(object[key])
    }
    return prop
  })
}

function simplifyObject (data) {
  if (Array.isArray(data)) {
    const simpleObjects = data.map(val => simplifyObject(val))
    return merge({}, ...simpleObjects)
  }

  const object = {}
  Object.keys(data).forEach(key => {
    const val = data[key]
    if (typeof val === 'object') {
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
