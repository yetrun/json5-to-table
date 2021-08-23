const isObject = require('lodash.isobject')
const flatten = require('lodash.flatten')

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

  if (Array.isArray(data)) {
    listOfPaths = data.map(dataItem => deepRetrivePaths(dataItem))
  } else if (isObject(data)) {
    listOfPaths = Object.entries(data).map(([name, value]) => {
      if (isObject(value)) {
        const paths = deepRetrivePaths(value)
        return paths.map(path => name + '.' + path)
      } else {
        return name
      }
    })
  }

  return [...new Set(flatten(listOfPaths))]
}

module.exports = parseToSchema
