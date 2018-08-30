const test = require('ava')
const jsonToTable = require('../src/jsonToTable')
const Builder = require('./Builder')
const { meta, data } = require('./fixtures')

test('convert simple json', t => {
  const builder = new Builder()
  jsonToTable(meta.simple, data.simple, builder)
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
  const builder = new Builder()
  jsonToTable(meta.nested, data.nested, builder)
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

// TODO: 基本值数组单行显示

test('convert nested object array', t => {
  const builder = new Builder()
  jsonToTable(meta.nested, data.nestedObjectArray, builder)
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
        { data: 1, rowSpan: 2, colSpan: 1 },
        { data: 2, rowSpan: 1, colSpan: 1 },
        { data: 3, rowSpan: 1, colSpan: 1 }
      ],
      [
        { data: 4, rowSpan: 1, colSpan: 1 },
        { data: 5, rowSpan: 1, colSpan: 1 }
      ],
      [
        { data: 6, rowSpan: 1, colSpan: 1 },
        { data: 7, rowSpan: 1, colSpan: 1 },
        { data: 8, rowSpan: 1, colSpan: 1 }
      ],
    ]
  })
})
