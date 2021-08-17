const _ = require('lodash')

function parseToSchema (data) {
  const paths = deepRetrivePaths(data)

  return paths.map(path => {
    return {
      title: path, path
    }
  })
}

function deepRetrivePaths (data) {
  let listOfPaths = []

  if (_.isArray(data)) {
    listOfPaths = data.map(dataItem => deepRetrivePaths(dataItem))
  } else if (_.isPlainObject(data)) {
    listOfPaths = _.map(data, (value, name) => {
      if (_.isObject(value)) {
        const paths = deepRetrivePaths(value)
        return paths.map(path => name + '.' + path)
      } else {
        return name
      }
    })
  }

  return _.uniq(_.flatten(listOfPaths))
}

module.exports = parseToSchema
