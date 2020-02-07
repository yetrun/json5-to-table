const test = require('./test')
const { Writable } = require('stream')
const fs = require('fs')
const jsonToHTMLTable = require('../lib/jsonToHTMLTable')

test('generate string', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const htmlTable = jsonToHTMLTable(data, props)
  t.is(htmlTable, fs.readFileSync('test/fixtures/simple.html', 'UTF-8'))
})

test.cb('generate to file', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const stream = jsonToHTMLTable(data, props, {
    writeTo: 'test/temp/1.html'
  })
  stream.on('finish', () => {
    t.is(fs.readFileSync('test/temp/1.html', 'UTF-8'), fs.readFileSync('test/fixtures/simple.html', 'UTF-8'))
    t.end()
  })
})

test.cb('generate to stream', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
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
      fs.readFileSync('test/fixtures/simple.html', 'UTF-8')
    )
    t.end()
  })
}) 

// 复杂 value 的显示是每个 jsonToTable 实现自己的责任
test('generate with object values', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: [2.1, 2.2, 2.3], c: 3 },
    { a: 4, b: { k1: 5.1, k2: 5.2 }, c: 6 }
  ]

  const htmlTable = jsonToHTMLTable(data, props)
  t.is(htmlTable, fs.readFileSync('test/fixtures/with_object_values.html', 'UTF-8'))
})
