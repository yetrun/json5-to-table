const test = require('./test')
const XLSX = require('xlsx')
const fs = require('fs')
const jsonToExcel = require('../lib/jsonToExcel')

function generateSameXLSX (t, sourceBuffers, ws) {
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  const targetBuffers = XLSX.write(wb, { type: 'buffer' })
  t.deepEqual(sourceBuffers, targetBuffers)
}

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const buffers = jsonToExcel(data, props)
  generateSameXLSX(t, buffers, {
    A1: { v: 'a', t: 's' },
    B1: { v: 'b', t: 's' },
    C1: { v: 'c', t: 's' },
    A2: { v: 1, t: 'n' },
    B2: { v: 2, t: 'n' },
    C2: { v: 3, t: 'n' },
    A3: { v: 4, t: 'n' },
    B3: { v: 5, t: 'n' },
    C3: { v: 6, t: 'n' },
    '!merges': [],
    '!ref': 'A1:C3'
  })
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

  const buffers = jsonToExcel(data, props)
  generateSameXLSX(t, buffers, {
    A1: { v: 'a', t: 's' },
    B1: { v: 'b', t: 's' },
    D1: { v: 'e', t: 's' },
    B2: { v: 'c', t: 's' },
    C2: { v: 'd', t: 's' },
    A3: { v: 1, t: 'n' },
    B3: { v: 2, t: 'n' },
    C3: { v: 3, t: 'n' },
    D3: { v: 6, t: 'n' },
    B4: { v: 4, t: 'n' },
    C4: { v: 5, t: 'n' },
    A5: { v: 11, t: 'n' },
    B5: { v: 12, t: 'n' },
    C5: { v: 13, t: 'n' },
    D5: { v: 16, t: 'n' },
    B6: { v: 14, t: 'n' },
    C6: { v: 15, t: 'n' },
    '!merges':[ 
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
      { s: { r: 0, c: 1 }, e: { r: 0, c: 2 } },
      { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } },
      { s: { r: 2, c: 0 }, e: { r: 3, c: 0 } },
      { s: { r: 2, c: 3 }, e: { r: 3, c: 3 } },
      { s: { r: 4, c: 0 }, e: { r: 5, c: 0 } },
      { s: { r: 4, c: 3 }, e: { r: 5, c: 3 } } 
    ],
    '!ref': 'A1:D6',
  })
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

  const buffers = jsonToExcel(data, props)
  generateSameXLSX(t, buffers, { 
    A1: { v: 'a', t: 's' },
    B1: { v: 'b', t: 's' },
    D1: { v: 'c', t: 's' },
    B2: { v: 'd', t: 's' },
    C2: { v: 'e', t: 's' },
    D2: { v: 'd', t: 's' },
    E2: { v: 'e', t: 's' },
    F2: { v: 'f', t: 's' },
    A3: { v: 1, t: 'n' },
    B3: { v: 2, t: 'n' },
    C3: { v: 3, t: 'n' },
    D3: { v: 6, t: 'n' },
    E3: { v: 7, t: 'n' },
    F3: { v: 8, t: 'n' },
    B4: { v: 4, t: 'n' },
    C4: { v: 5, t: 'n' },
    D4: { v: 9, t: 'n' },
    E4: { v: 10, t: 'n' },
    F4: { v: 11, t: 'n' },
    D5: { v: 12, t: 'n' },
    E5: { v: 13, t: 'n' },
    F5: { v: 14, t: 'n' },
    '!merges':[ 
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
      { s: { r: 0, c: 1 }, e: { r: 0, c: 2 } },
      { s: { r: 0, c: 3 }, e: { r: 0, c: 5 } },
      { s: { r: 2, c: 0 }, e: { r: 4, c: 0 } },
      { s: { r: 4, c: 1 }, e: { r: 4, c: 2 } } 
    ],
    '!ref': 'A1:F5',
  })
})

test('with array and object value', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: [2.1, 2.2, 2.3], c: 3 },
    { a: 4, b: { k1: 5.1, k2: 5.2 }, c: 6 }
  ]

  const buffers = jsonToExcel(data, props)
  generateSameXLSX(t, buffers, {
    A1: { v: 'a', t: 's' },
    B1: { v: 'b', t: 's' },
    C1: { v: 'c', t: 's' },
    A2: { v: 1, t: 'n' },
    B2: { v: '2.1, 2.2, 2.3', t: 's' },
    C2: { v: 3, t: 'n' },
    A3: { v: 4, t: 'n' },
    B3: { v: '{"k1":5.1,"k2":5.2}', t: 's' },
    C3: { v: 6, t: 'n' },
    '!merges': [],
    '!ref': 'A1:C3',
  })
})

test('write to file', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  jsonToExcel(data, props, 'test/temp/1.xlsx')
  generateSameXLSX(t, fs.readFileSync('test/temp/1.xlsx'), {
    A1: { v: 'a', t: 's' },
    B1: { v: 'b', t: 's' },
    C1: { v: 'c', t: 's' },
    A2: { v: 1, t: 'n' },
    B2: { v: 2, t: 'n' },
    C2: { v: 3, t: 'n' },
    A3: { v: 4, t: 'n' },
    B3: { v: 5, t: 'n' },
    C3: { v: 6, t: 'n' },
    '!merges': [],
    '!ref': 'A1:C3'
  })
})
