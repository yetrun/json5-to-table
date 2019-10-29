function generator1 (data, head) {
  const keys = head.keys
  return keys.map((key, i) => {
    return { r: 1, c: i + 1, v: key}
  })
}

function *generator2 (data, head) {
  const keys = head.keys
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

function *generator(data, head) {
  yield generator1(data, head)
  yield *generator2(data, head)
}

class Render1 {
  init (data, head) {
    this._data = data
    this._generator = generator(data, head)
  }

  next () {
    return this._generator.next()
  }
}

module.exports = Render1
