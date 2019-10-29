function generator1 () {
  return [
    { r: 1, c: 1, v: 'a' },
    { r: 1, c: 2, v: 'b' },
    { r: 1, c: 3, v: 'c' }
  ]
}

function *generator2 () {
  yield [
    { r: 2, c: 1, v: 1 },
    { r: 2, c: 2, v: 2 },
    { r: 2, c: 3, v: 3 }
  ]
  yield  [
    { r: 3, c: 1, v: 4 },
    { r: 3, c: 2, v: 5 },
    { r: 3, c: 3, v: 6 }
  ]
}

function *generator() {
  yield generator1()
  yield *generator2()
}

class Render1 {
  init (data) {
    this._data = data
    this._generator = generator()
  }

  next () {
    return this._generator.next()
  }
}

module.exports = Render1
