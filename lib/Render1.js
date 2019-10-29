function generator1 (data, props) {
  return props.map((prop, i) => {
    return { r: 1, c: i + 1, v: prop.key}
  })
}

function *generator2 (data, props) {
  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    const rowNo = i + 2
    yield props.map((prop, j) => {
      return {
        r: rowNo, c: j + 1, v: row[prop.key]
      }
    })
  }
}

function *generator(data, props) {
  yield generator1(data, props)
  yield *generator2(data, props)
}

class Render1 {
  init (data, props) {
    this._data = data
    this._generator = generator(data, props)
  }

  next () {
    return this._generator.next()
  }
}

module.exports = Render1
