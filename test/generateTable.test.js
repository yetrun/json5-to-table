const test = require('ava')
const generateTable = require('../lib/generateTable')

test('generate table for simple object array', t => {
  const schema = [
    { title: 'A', path: 'a' },
    { title: 'B', path: 'b' },
    { title: 'C', path: 'c' }
  ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const table = generateTable(data, schema)
  t.deepEqual(table, {
    header: [
      [
        { row: 1, col: 1, rowSpan: 1, colSpan: 1, val: 'A' },
        { row: 1, col: 2, rowSpan: 1, colSpan: 1, val: 'B' },
        { row: 1, col: 3, rowSpan: 1, colSpan: 1, val: 'C' }
      ]
    ],
    body: [
      [
        { row: 2, col: 1, rowSpan: 1, colSpan: 1, val: 1 },
        { row: 2, col: 2, rowSpan: 1, colSpan: 1, val: 2 },
        { row: 2, col: 3, rowSpan: 1, colSpan: 1, val: 3 }
      ],
      [
        { row: 3, col: 1, rowSpan: 1, colSpan: 1, val: 4 },
        { row: 3, col: 2, rowSpan: 1, colSpan: 1, val: 5 },
        { row: 3, col: 3, rowSpan: 1, colSpan: 1, val: 6 }
      ]
    ]
  })
})

// 这里主要消除计算空数组的 dataSize 带来的异常
test('schema is nested but data is a empty array', t => {
  const schema = [
    {
      title: "a",
      path: "a"
    },
    {
      title: "b",
      path: "b",
      props: [
        {
          title: "c",
          path: "c"
        },
        {
          title: "d",
          path: "d"
        }
      ]
    }
  ]
  const data =  { 'a': 1, 'b': [] } 

  const table = generateTable(data, schema)
  t.deepEqual(table.body, [
    [
      {
        row: 3,
        col: 1,
        rowSpan: 1,
        colSpan: 1,
        val: 1
      },
      { // TODO: 此处的 colSpan 不为 2？ 
        row: 3,
        col: 2,
        rowSpan: 1,
        colSpan: 1,
        val: undefined
      },
      undefined
    ]
  ])
})

test('generate table for complex object array', t => {
  const schema = [
    { title: 'A', path: 'a' },
    { title: 'B', path: 'b', props: [
      { title: 'C', path: 'c' },
      { title: 'D', path: 'd' }
    ] }
  ]
  const data = [
    {
      a: 1,
      b: [
        { c: 2, d: 3 },
        { c: 4, d: 5 }
      ]
    },
    {
      a: 6,
      b: [
        { c: 7, d: 8 }
      ]
    }
  ]

  const table = generateTable(data, schema)
  t.deepEqual(table, {
    header: [
      [
        { row: 1, col: 1, rowSpan: 2, colSpan: 1, val: 'A' },
        { row: 1, col: 2, rowSpan: 1, colSpan: 2, val: 'B' },
        undefined
      ],
      [
        undefined,
        { row: 2, col: 2, rowSpan: 1, colSpan: 1, val: 'C' },
        { row: 2, col: 3, rowSpan: 1, colSpan: 1, val: 'D' }
      ]
    ],
    body: [
      [
        { row: 3, col: 1, rowSpan: 2, colSpan: 1, val: 1 },
        { row: 3, col: 2, rowSpan: 1, colSpan: 1, val: 2 },
        { row: 3, col: 3, rowSpan: 1, colSpan: 1, val: 3 }
      ],
      [
        undefined,
        { row: 4, col: 2, rowSpan: 1, colSpan: 1, val: 4 },
        { row: 4, col: 3, rowSpan: 1, colSpan: 1, val: 5 }
      ],
      [
        { row: 5, col: 1, rowSpan: 1, colSpan: 1, val: 6 },
        { row: 5, col: 2, rowSpan: 1, colSpan: 1, val: 7 },
        { row: 5, col: 3, rowSpan: 1, colSpan: 1, val: 8 },
      ]
    ]
  })
})
