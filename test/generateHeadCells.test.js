const test = require('ava')
const generateCells = require('../lib/generateHeadCells')
const { AddressableCells } = require('../lib/table_defs')

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]

  const cells = generateCells(props)
  t.deepEqual(cells, AddressableCells(    
    { r: 1, c: 1, v: 'a' },
    { r: 1, c: 2, v: 'b' },
    { r: 1, c: 3, v: 'c' }
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

  const cells = generateCells(props)
  t.deepEqual(cells, AddressableCells(
    { r: 1, c: 1, rs: 2, v: 'a' },
    { r: 1, c: 2, cs: 2, v: 'b' },
    { r: 1, c: 4, rs: 2, v: 'e' },
    { r: 2, c: 2, v: 'c' },
    { r: 2, c: 3, v: 'd' }
  ))
})
