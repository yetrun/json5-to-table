function generator1 (data) {
  const keys = Object.keys(data[0])
  return keys.map((key, i) => {
    return { r: 1, c: i + 1, v: key}
  })
}

function *generator2 (data) {
  // 这里是侥幸拿到['a', 'b', 'c']的顺序
  const keys = Object.keys(data[0])
  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    const rowNo = i + 2
    yield keys.map((head, j) => {
      return {
        r: rowNo, c: j + 1, v: row[head]
      }
    })
  }
}

function *generator(data) {
  yield generator1(data)
  yield *generator2(data)
}

class Render1 {
  init (data) {
    this._data = data
    this._generator = generator(data)
  }

  next () {
    return this._generator.next()
  }
}

module.exports = Render1
