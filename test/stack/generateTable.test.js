const test = require('ava')
const { Table, Row, Cell, generateTable } = require('../../lib/stack/generateTable')

test('empty object', t => {
  const data = {}
  const schema = [
    { path: 'a' }, { path: 'b' }
  ]

  t.deepEqual(generateTable(data, schema), new Row([
    { val: undefined }, { val: undefined }
  ]))
})

// 基本类型值、null、undefined 等效于空对象
test('null equals to empty object', t => {
  const data = null
  const schema = [
    { path: 'a' }, { path: 'b' }
  ]

  t.deepEqual(generateTable(data, schema), new Row([
    { val: undefined }, { val: undefined }
  ]))
})

test('empty array equals to empty object', t => {
  const data = []
  const schema = [
    { path: 'a' }, { path: 'b' }
  ]

  t.deepEqual(generateTable(data, schema), new Row([
    { val: undefined }, { val: undefined }
  ]))
})

test('simple object', t => {
  const data = { a: 1, b: 2 }
  const schema = [
    { path: 'a' }, { path: 'b' }
  ]

  t.deepEqual(generateTable(data, schema), new Row([
    { val: 1 }, { val: 2 }
  ]))
})

test('simple array', t => {
  const data = [
    { a: 1, b: 2 },
    { a: 3, b: 4 }
  ]
  const schema = [
    { path: 'a' }, { path: 'b' }
  ]

  t.deepEqual(generateTable(data, schema), new Table([
    [ { val: 1 }, { val: 2 } ],
    [ { val: 3 }, { val: 4 } ]
  ]))
})

test('nested object', t => {
  const data = {
    a: 1, 
    b: { 
      c: 2, d: 3
    }
  }
  const schema = [
    { path: 'a' }, 
    { path: 'b', props: [
      { path: 'c' }, { path: 'd' }
    ] }
  ]

  t.deepEqual(generateTable(data, schema), new Row([
    { val: 1 },
    new Row([ { val: 2 }, { val: 3 } ])
  ]))
})

test('nested array', t => {
  const data = {
    a: 1, 
    b: [ 
      { c: 2, d: 3 },
      { c: 4, d: 5 }
    ]
  }
  const schema = [
    { path: 'a' }, 
    { path: 'b', props: [
      { path: 'c' }, { path: 'd' }
    ] }
  ]

  t.deepEqual(generateTable(data, schema), new Row([
    { val: 1 },
    new Table([ 
      [ { val: 2 }, { val: 3 } ],
      [ { val: 4 }, { val: 5 } ]
    ])
  ]))
})

test('path is empty and data is number', t => {
  const data = 1
  const schema = { path: '' }

  t.deepEqual(generateTable(data, schema), new Cell({ val: 1 }))
})

test('path is empty and data is array', t => {
  const data = [1, 2, 3]
  const schema = { path: '' }

  // TODO: 很奇怪，这里 Ava 没有报错而是直接报异常了
  t.notThrows(() => generateTable(data, schema))
})
