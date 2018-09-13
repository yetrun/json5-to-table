// https://stackoverflow.com/questions/31538010/test-if-a-variable-is-a-primitive-rather-than-an-object#answer-31538091
function isPrimitive (value) {
  return value !== Object(value)
}

// https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript#answer-17772086
function isString (value) {
  return Object.prototype.toString.call(value) === "[object String]"
}

// https://github.com/jonschlinkert/isobject/blob/master/index.js
function isObject (value) {
  return !isPrimitive(value) && value != null && typeof value === 'object' && Array.isArray(value) === false
}

function isUndef (value) {
  return value === undefined || value === null
}

module.exports = {
  isPrimitive,
  isString,
  isObject,
  isUndef
}
