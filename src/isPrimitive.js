// https://stackoverflow.com/questions/31538010/test-if-a-variable-is-a-primitive-rather-than-an-object#answer-31538091
function isPrimitive (value) {
  return value !== Object(value)
}

module.exports = isPrimitive
