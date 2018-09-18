const test = require('ava')
const jsonToTable = require('../../src/jsonToTable/jsonToTable')
const Builder = require('./Builder')
const { meta, data } = require('../fixtures')

test('convert simple json', t => {
  const builder = new Builder()
  jsonToTable(meta.simple, data.simple.slice(0, 2), builder)
  t.deepEqual(builder.data, {
    head: [
      [
        { data: 'A', rowSpan: 1, colSpan: 1, isHead: true },
        { data: 'B', rowSpan: 1, colSpan: 1, isHead: true }
      ]
    ],
    body: [
      [
        { data: 1, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 2, rowSpan: 1, colSpan: 1, isHead: false }
      ],
      [
        { data: undefined, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 3, rowSpan: 1, colSpan: 1, isHead: false }
      ]
    ]
  })
})

test('convert nested json', t => {
  const builder = new Builder()
  jsonToTable(meta.nested, data.nested.slice(0, 2), builder)
  t.deepEqual(builder.data, {
    head: [
      [
        { data: 'A', rowSpan: 2, colSpan: 1, isHead: true },
        { data: 'B', rowSpan: 1, colSpan: 2, isHead: true }
      ],
      [
        { data: 'C', rowSpan: 1, colSpan: 1, isHead: true },
        { data: 'D', rowSpan: 1, colSpan: 1, isHead: true }
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

test('convert nested object array', t => {
  const builder = new Builder()
  jsonToTable(meta.nested, data.nestedObjectArray, builder)
  t.deepEqual(builder.data, {
    head: [
      [
        { data: 'A', rowSpan: 2, colSpan: 1, isHead: true },
        { data: 'B', rowSpan: 1, colSpan: 2, isHead: true }
      ],
      [
        { data: 'C', rowSpan: 1, colSpan: 1, isHead: true },
        { data: 'D', rowSpan: 1, colSpan: 1, isHead: true }
      ]
    ],
    body: [
      [
        { data: 1, rowSpan: 2, colSpan: 1, isHead: false },
        { data: 2, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 3, rowSpan: 1, colSpan: 1, isHead: false }
      ],
      [
        { data: 4, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 5, rowSpan: 1, colSpan: 1, isHead: false }
      ],
      [
        { data: 6, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 7, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 8, rowSpan: 1, colSpan: 1, isHead: false }
      ],
    ]
  })
})

test('convert more complex nested object array', t => {
  const builder = new Builder()
  jsonToTable(meta.complexNested, data.complexNestedObjectArray, builder)
  t.deepEqual(builder.data, {
    head: [
      [
        { data: 'A', rowSpan: 2, colSpan: 1, isHead: true },
        { data: 'B', rowSpan: 1, colSpan: 2, isHead: true },
        { data: 'C', rowSpan: 1, colSpan: 2, isHead: true }
      ],
      [
        { data: 'D', rowSpan: 1, colSpan: 1, isHead: true },
        { data: 'E', rowSpan: 1, colSpan: 1, isHead: true },
        { data: 'F', rowSpan: 1, colSpan: 1, isHead: true },
        { data: 'G', rowSpan: 1, colSpan: 1, isHead: true }
      ]
    ],
    body: [
      [
        { data: 1, rowSpan: 3, colSpan: 1, isHead: false },
        { data: 2, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 3, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 6, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 7, rowSpan: 1, colSpan: 1, isHead: false }
      ],
      [
        { data: 4, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 5, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 8, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 9, rowSpan: 1, colSpan: 1, isHead: false }
      ],
      [
        { data: undefined, rowSpan: 1, colSpan: 2, isHead: false },
        { data: 10, rowSpan: 1, colSpan: 1, isHead: false },
        { data: 11, rowSpan: 1, colSpan: 1, isHead: false }
      ]
    ]
  })
})
