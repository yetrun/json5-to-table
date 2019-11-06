const jsonToHTMLTable = require('../lib/jsonToHTMLTable')

function table1 () {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const table = jsonToHTMLTable(data, props)
  document.getElementById('table1').appendChild(table)
}

function table2 () {
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

  jsonToHTMLTable(data, props, { replaceWith: document.getElementById('table2') })
}

function table3 () {
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

  const table = jsonToHTMLTable(data, props, { targetFormat: 'sourceCode' })
  document.getElementById('table3').innerHTML = table
}

function table4 () {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: [2.1, 2.2, 2.3], c: 3 },
    { a: 4, b: { k1: 5.1, k2: 5.2 }, c: 6 }
  ]

  jsonToHTMLTable(data, props, { replaceWith: '#table4' })
}

table1()
table2()
table3()
table4()
