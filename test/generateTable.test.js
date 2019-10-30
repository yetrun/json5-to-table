const test = require('ava')
const generateTable = require('../lib/generateTable')
const { Table, Row, Data } = require('../lib/table_defs')

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = { a: 1, b: 2, c: 3 }

  const table = generateTable(data, props)
  t.deepEqual(table, new Table(
    new Row(new Data(1), new Data(2), new Data(3))
  ))
})

test('nested generate', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'c' }, { key: 'd' } ]
    },
    { key: 'e' }
  ]
  const data = { a: 1, b: { c: 2, d: 3 }, e: 4 }

  const table = generateTable(data, props)
  t.deepEqual(table, new Table(
    new Row(
      new Data(1),
      new Table(
        new Row(new Data(2), new Data(3))
      ),
      new Data(4) 
    )
  ))
})

test('array generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const table = generateTable(data, props)
  t.deepEqual(table, new Table(
    new Row(new Data(1), new Data(2), new Data(3)),
    new Row(new Data(4), new Data(5), new Data(6))
  ))
})

test('nested array generate', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'c' }, { key: 'd' } ]
    },
    { key: 'e' }
  ]
  const data = {
    a: 1,
    b: [
      { c: 2, d: 3 },
      { c: 4, d: 5 }
    ],
    e: 6
  }

  const table = generateTable(data, props)
  t.deepEqual(table, new Table(
    new Row(
      new Data(1),
      new Table( 
        new Row(new Data(2), new Data(3)),
        new Row(new Data(4), new Data(5)),
      ),
      new Data(6)
    )
  ))
})
