const test = require('ava')
const jsonToExcel = require('../lib/jsonToExcel')

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  jsonToExcel(data, props, 'test/temp/1.xlsx')
  t.pass()
})

test('complex generate', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'c' }, { key: 'd' } ]
    },
    { key: 'e' }
  ]
  const data = [
    {
      a: 1,
      b: [
        { c: 2, d: 3 },
        { c: 4, d: 5 }
      ],
      e: 6
    },
    {
      a: 11,
      b: [
        { c: 12, d: 13 },
        { c: 14, d: 15 }
      ],
      e: 16
    }
  ]

  jsonToExcel(data, props, 'test/temp/2.xlsx')
  t.pass()
})

test('with blank space', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'd' }, { key: 'e' } ]
    },
    { 
      key: 'c', 
      props: [ { key: 'd' }, { key: 'e' }, { key: 'f' } ]
    }
  ]
  const data = [
    {
      a: 1,
      b: [
        { d: 2, e: 3 },
        { d: 4, e: 5 }
      ],
      c: [
        { d: 6, e: 7, f: 8 },
        { d: 9, e: 10, f: 11 },
        { d: 12, e: 13, f: 14 }
      ]
    }
  ]

  jsonToExcel(data, props, 'test/temp/3.xlsx')
  t.pass()
})

// TODO: scalar array
