const test = require('ava')
const generateCells = require('../lib/generateHeadCells')
const { AddressableCell } = require('../lib/table_defs')

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]

  const cells = generateCells(props)
  t.deepEqual(cells, [
    new AddressableCell({ r: 1, c: 1, v: 'a' }),
    new AddressableCell({ r: 1, c: 2, v: 'b' }),
    new AddressableCell({ r: 1, c: 3, v: 'c' })
  ])
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
  t.deepEqual(cells, [
    new AddressableCell({ r: 1, c: 1, rs: 2, v: 'a' }),
    new AddressableCell({ r: 1, c: 2, cs: 2, v: 'b' }),
    new AddressableCell({ r: 1, c: 4, rs: 2, v: 'e' }),
    new AddressableCell({ r: 2, c: 2, v: 'c' }),
    new AddressableCell({ r: 2, c: 3, v: 'd' })
  ])
})
