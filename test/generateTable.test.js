const test = require('ava')
const generateTable = function () {} 

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
  t.deepEquals(table, {
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

test('generate table for complex object array', t => {
  const schema = [
    { title: 'A', path: 'a' },
    { title: 'B', path: 'b', props: [
      { title: 'B1', path: 'b1' },
      { title: 'B2', path: 'b2' }
    ] },
    { title: 'C', path: 'c', props: [
      { title: 'C1', path: 'c1' },
      { title: 'C2', path: 'c2' },
      { title: 'C3', path: 'c3', props: [ {
          title: 'D1', path: 'd1',
          title: 'D2', path: 'd2'
      } ] }
    ] }
  ]
  const data = [
    {
      a: 1,
      b: [
        { b1: 2, b2: 3 },
        { b1: 2, b2: 3 }
      ],
      c: [
        { c1: 2, c2: 3, d: { d1: 4, d2: 5 } },
        { c1: 2, c2: 3 },
        { c1: 2, c2: 3 }
      ]
    }
  ]

  const table = generateTable(data, schema)
  t.pass()
})
