const { isString } = require('../types')

function normalizeProp (prop) {
  if (isString(prop)) {
    return {
      key: prop,
      title: prop
    }
  }

  const normalizedProp = {
    key: prop.key,
    title: prop.title || prop.key
  }
  if (prop.props) {
    normalizedProp.props = normalizeProps(prop.props)
  }
  return normalizedProp
}

function normalizeProps (props) {
  return props.map(prop => normalizeProp(prop))
}

module.exports = normalizeProps
