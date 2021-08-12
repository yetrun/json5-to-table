const _ = require('lodash')

function retrieveProperty (object, path) {
  const props = path.split('.')

  for (const prop of props) {
    if (_.isNil(object)) {
      return undefined
    }

    object = object[prop]
  }

  return object
}

module.exports = retrieveProperty
