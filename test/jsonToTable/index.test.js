const test = require('ava')
const jsonToTable = require('../../src/jsonToTable')
const Builder = require('./Builder')

test('ignore meta', t => {
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
  jsonToTable(undefined, data, builder)
  t.pass()
})

test('ignore meta of nested data', t => {
  const data = [
    {
      a: 1,
      b: {
        c: 2,
        d: 3
      }
    },
    {
      a: 4,
      b: {
        c: 5,
        d: 6
      }
    }
  ]
  const builder = new Builder()
  jsonToTable(undefined, data, builder)
  t.deepEqual(builder.data, {
    head: [
      [
        { data: 'a', rowSpan: 2, colSpan: 1, isHead: true },
        { data: 'b', rowSpan: 1, colSpan: 2, isHead: true }
      ],
      [
        { data: 'c', rowSpan: 1, colSpan: 1, isHead: true },
        { data: 'd', rowSpan: 1, colSpan: 1, isHead: true }
      ]
    ],
    body: [
      [
        { data: 1, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 2, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 3, rowSpan: 1, colSpan: 1, isHead: false }
      ],
      [
        { data: 4, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 5, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 6, rowSpan: 1, colSpan: 1, isHead: false }
      ]
    ]
  })
})
