const test = require('./test')
const generateCells = require('../lib/generateHeadCells')
const { AddressableCells } = require('../lib/table_defs')

test('props', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]

  const cells = generateCells(props)
  t.deepEqual(cells, new AddressableCells(    
    { r: 1, c: 1, v: 'a' },
    { r: 1, c: 2, v: 'b' },
    { r: 1, c: 3, v: 'c' }
  ))
})

test('props -> props', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'c' }, { key: 'd' } ]
    },
    { key: 'e' }
  ]

  const cells = generateCells(props)
  t.deepEqual(cells, new AddressableCells(
    { r: 1, c: 1, rs: 2, v: 'a' },
    { r: 1, c: 2, cs: 2, v: 'b' },
    { r: 1, c: 4, rs: 2, v: 'e' },
    { r: 2, c: 2, v: 'c' },
    { r: 2, c: 3, v: 'd' }
  ))
})

test('props -> props,(props -> props)', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'c' }, { key: 'd' } ]
    },
    { 
      key: 'e',
      props: [ 
        { 
          key: 'f',
          props: [ { key: 'g' }, { key: 'h' }]
        }, 
        { key: 'i' } 
      ]
    }
  ]

  const cells = generateCells(props)
  t.deepEqual(cells, new AddressableCells(
    { r: 1, c: 1, rs: 3, v: 'a' },
    { r: 1, c: 2, cs: 2, v: 'b' },
    { r: 2, c: 2, rs: 2, v: 'c' },
    { r: 2, c: 3, rs: 2, v: 'd' },
    { r: 1, c: 4, cs: 3, v: 'e' },
    { r: 2, c: 4, cs: 2, v: 'f' },
    { r: 3, c: 4, v: 'g' },
    { r: 3, c: 5, v: 'h' },
    { r: 2, c: 6, rs: 2, v: 'i' }
  ))
})
