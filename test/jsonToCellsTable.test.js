const test = require('./test')
const jsonToCellsTable = require('../lib/jsonToCellsTable')

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [{ a: 1, b: 2, c: 3 }]

  const cells = jsonToCellsTable(data, props)
  t.deepEqual(cells, {
    head:[
      [
        { r: 1, c: 1, rs: 1, cs: 1, v: 'a' },
        { r: 1, c: 2, rs: 1, cs: 1, v: 'b' },
        { r: 1, c: 3, rs: 1, cs: 1, v: 'c' }
      ]
    ],
    body: [
      [
        { r: 1, c: 1, rs: 1, cs: 1, v: 1 },
        { r: 1, c: 2, rs: 1, cs: 1, v: 2 },
        { r: 1, c: 3, rs: 1, cs: 1, v: 3 }
      ]
    ]
  })
})
