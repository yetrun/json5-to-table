const test = require('ava')
const jsonToTable = require('../src/jsonToTable')
const Builder = require('./Builder')

test('convert simple json', t => {
  const meta = {
    order: ['a', 'b'],
    mapping: {
      a: {
        title: 'A'
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
      [
        { data: 'A', rowSpan: 1, colSpan: 1 },
        { data: 'B', rowSpan: 1, colSpan: 1 }
      ]
    ],
    body: [
      [
        { data: 1, rowSpan: 1, colSpan: 1 },
        { data: 2, rowSpan: 1, colSpan: 1 }
      ],
      [
        { data: 3, rowSpan: 1, colSpan: 1 },
        { data: 4, rowSpan: 1, colSpan: 1 }
      ]
    ]
  })
})

test('convert nested json', t => {
  const meta = {
    order: ['a', 'b'],
    mapping: {
      a: {
        title: 'A'
      },
      b: {
        title: 'B',
        meta: {
          order: ['c', 'd'],
          mapping: {
            c: {
              title: 'C'
            },
            d: {
              title: 'D'
            }
          }
        }
      }
    }
  }
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
  jsonToTable(meta, data, builder)
  t.deepEqual(builder.data, {
    head: [
      [
        { data: 'A', rowSpan: 2, colSpan: 1 },
        { data: 'B', rowSpan: 1, colSpan: 2 }
      ],
      [
        { data: 'C', rowSpan: 1, colSpan: 1 },
        { data: 'D', rowSpan: 1, colSpan: 1 }
      ]
    ],
    body: [
      [
        { data: 1, rowSpan: 1, colSpan: 1 },
        { data: 2, rowSpan: 1, colSpan: 1 },
        { data: 3, rowSpan: 1, colSpan: 1 }
      ],
      [
        { data: 4, rowSpan: 1, colSpan: 1 },
        { data: 5, rowSpan: 1, colSpan: 1 },
        { data: 6, rowSpan: 1, colSpan: 1 }
      ]
    ]
  })
})
