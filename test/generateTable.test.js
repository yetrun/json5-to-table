// TODO: ava 如果语法错误没有具体的报错
const test = require('ava')
const generateRow = require('../lib/generateTable')
const { Table, Row, Cell } = require('../lib/table_classes')

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = { a: 1, b: 2, c: 3 }

  const row = generateRow(data, props)
  t.deepEqual(row, new Table(
    new Row(new Cell(1), new Cell(2), new Cell(3))
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

  const cells = generateRow(data, props)
  t.deepEqual(cells, new Table(
    new Row(
      new Cell(1),
      new Table(
        new Row(new Cell(2), new Cell(3))
      ),
      new Cell(4) 
    )
  ))
})

test('array generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const cells = generateRow(data, props)
  t.deepEqual(cells, new Table(
    new Row(new Cell(1), new Cell(2), new Cell(3)),
    new Row(new Cell(4), new Cell(5), new Cell(6))
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

  const cells = generateRow(data, props)
  t.deepEqual(cells, new Table(
    new Row(
      new Cell(1),
      new Table( 
        new Row(new Cell(2), new Cell(3)),
        new Row(new Cell(4), new Cell(5)),
      ),
      new Cell(6)
    )
  ))
})
