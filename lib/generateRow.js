module.exports = function (data, props) {
  return props.map((prop, i) => {
    return {
      r: 1, c: i + 1, v: data[prop.key]
    }
  })
}
