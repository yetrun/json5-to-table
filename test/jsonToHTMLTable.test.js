const test = require('./test')
const { Writable } = require('stream')
const fs = require('fs')
const jsonToHTMLTable = require('../lib/jsonToHTMLTable')

// 生成简单的 HTML 表格
test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const htmlTable = jsonToHTMLTable(data, props)
  t.is(htmlTable, fs.readFileSync('test/fixtures/simple.html', 'UTF-8'))
})

// 生成带有嵌套属性的 HTML 表格，同时测试 stream
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

// 测试带有合并单元格的情况
test('with merged cells', t => {
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

// 测试如何显示数组和对象的单元格
test('with array and object cells', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: [2.1, 2.2, 2.3], c: 3 },
    { a: 4, b: { k1: 5.1, k2: 5.2 }, c: 6 }
  ]

  const htmlTable = jsonToHTMLTable(data, props)
  t.is(htmlTable, fs.readFileSync('test/fixtures/with-array-and-object-value.html', 'UTF-8'))
})

// 测试属性定义中存在标题
test('generate with title prop', t => {
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

// 测试简单的字符串属性的定义
test('generate with simple string props', t => {
  const props = ['a', 'b', 'c']
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const htmlTable = jsonToHTMLTable(data, props)
  t.is(htmlTable, fs.readFileSync('test/fixtures/simple.html', 'UTF-8'))
})
