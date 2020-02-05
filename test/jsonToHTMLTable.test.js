const test = require('./test')
const { Writable } = require('stream');
const fs = require('fs')
const jsonToHTMLTable = require('../lib/jsonToHTMLTable')

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const htmlTable = jsonToHTMLTable(data, props)
  t.is(htmlTable, fs.readFileSync('test/fixtures/simple.html', 'UTF-8'))
})

test.cb('complex generate', t => {
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

  // 构建自定义的 write stream
  let buffer = ''
  const stream = new Writable({
    write(chunk, encoding, done) {
      buffer += chunk.toString()
      done()
    }
  })

  const htmlTable = jsonToHTMLTable(data, props, { writeTo: stream })
  stream.end()
  stream.on('finish', () => {
    t.is(
      buffer,
      fs.readFileSync('test/fixtures/complex.html', 'UTF-8')
    )
    t.end()
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

  const htmlTable = jsonToHTMLTable(data, props)
  t.is(htmlTable, fs.readFileSync('test/fixtures/with-blank-space.html', 'UTF-8'))
})

test('with array and object value', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: [2.1, 2.2, 2.3], c: 3 },
    { a: 4, b: { k1: 5.1, k2: 5.2 }, c: 6 }
  ]

  const htmlTable = jsonToHTMLTable(data, props)
  t.is(htmlTable, fs.readFileSync('test/fixtures/with-array-and-object-value.html', 'UTF-8'))
})

test('generate with title', t => {
  const props = [ 
    { key: 'a', title: 'A' },
    { key: 'b', title: 'B' },
    { key: 'c', title: 'C' } 
  ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const htmlTable = jsonToHTMLTable(data, props)
  t.is(htmlTable, fs.readFileSync('test/fixtures/simple_with_title.html', 'UTF-8'))
})

test('generate with string defs', t => {
  const props = ['a', 'b', 'c']
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const htmlTable = jsonToHTMLTable(data, props)
  t.is(htmlTable, fs.readFileSync('test/fixtures/simple.html', 'UTF-8'))
})
