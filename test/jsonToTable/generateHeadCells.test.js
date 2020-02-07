const test = require('../test')
const normalizeProps = require('../../lib/jsonToTable/normalizeProps')
const generateHeadCells = require('../../lib/jsonToTable/generateHeadCells')
const { AddressableCells } = require('../../lib/jsonToTable/table_defs')

function generateCells (props) {
  return generateHeadCells(
    normalizeProps(props)
  )
}

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
    { r: 1, c: 2, rs: 2, cs: 2, v: 'b' },
    { r: 3, c: 2, rs: 1, v: 'c' },
    { r: 3, c: 3, rs: 1, v: 'd' },
    { r: 1, c: 4, cs: 3, v: 'e' },
    { r: 2, c: 4, cs: 2, v: 'f' },
    { r: 3, c: 4, v: 'g' },
    { r: 3, c: 5, v: 'h' },
    { r: 2, c: 6, rs: 2, v: 'i' }
  ))
})

test('allocation algorithm', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: ['b1', 'b2']
    },
    { 
      key: 'c',
      props: [ 
        { 
          key: 'd',
          props: [ 
            { 
              key: 'd1' ,
              props: ['d1_1', 'd1_2']
            }, 
            { key: 'd2' }
          ]
        }, 
        { key: 'e' } 
      ]
    }
  ]

  const cells = generateCells(props)
  t.deepEqual(cells, new AddressableCells(
    { r: 1, c: 1, rs: 4, v: 'a' },
    { r: 1, c: 2, rs: 2, cs: 2, v: 'b' },
    { r: 3, c: 2, rs: 2, v: 'b1' },
    { r: 3, c: 3, rs: 2, v: 'b2' },
    { r: 1, c: 4, cs: 4, v: 'c' },
    { r: 2, c: 4, cs: 3, v: 'd' },
    { r: 2, c: 7, rs: 3, cs: 1, v: 'e' },
    { r: 3, c: 4, cs: 2, v: 'd1' },
    { r: 3, c: 6, rs: 2, v: 'd2' },
    { r: 4, c: 4, v: 'd1_1' },
    { r: 4, c: 5, v: 'd1_2' }
  ))
})

test('props with title', t => {
  const props = [ 
    { key: 'a', title: 'A' }, 
    { key: 'b', title: 'B' }, 
    { key: 'c', title: 'C' } 
  ]

  const cells = generateCells(props)
  t.deepEqual(cells, new AddressableCells(    
    { r: 1, c: 1, v: 'A' },
    { r: 1, c: 2, v: 'B' },
    { r: 1, c: 3, v: 'C' }
  ))
})
