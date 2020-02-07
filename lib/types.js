module.exports = {
  isString (val) {
    return Object.prototype.toString.call(val) === "[object String]"
  },
  isObject (val) {
    return Object.prototype.toString.call(val) === "[object Object]"
  },
  isArray (val) {
    return Array.isArray(val)
  }
}
