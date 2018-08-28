const test = require('ava')
const jsonToTable = require('../src/jsonToTable')

class Builder {
  table(next) {
    this.data = {}
    this.current = this.data
    next()
    this.current = null
  }

  head(next) {
    this.data.head = []
    this.current = this.data.head
    next()
    this.current = this.data
  }

  body(next) {
    this.data.body = []
    this.current = this.data.body
    next()
    this.current = this.data
  }

  row(next) {
    const rowData = []
    this.current.push(rowData)
    const previous = this.current
    this.current = rowData
    next()
    this.current = previous
  }

  col(data) {
    this.current.push(data)
  }
}

test('convert simple json', t => {
  const meta = {
    order: ['a', 'b'],
    mapping: {
      a: {
        title: 'A',
      },
      b: {
        title: 'B'
      }
    }
  }
  const data = [
    {
      a: 1,
      b: 2
    },
    {
      a: 3,
      b: 4
    }
  ]
  const builder = new Builder()
  jsonToTable(meta, data, builder)
  t.deepEqual(builder.data, {
    head: [
      ['A', 'B']
    ],
    body: [
      [1, 2],
      [3, 4],
    ]
  })
})
