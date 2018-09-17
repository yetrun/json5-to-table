const test = require('ava')
const jsonToTable = require('../../src/jsonToTable')
const Builder = require('./Builder')

test('ignore meta', t => {
  const data = [
    {
      a: 1,
      b: 2
    },
    {
      a: 3,
      b: 4
    }
  ]
  const builder = new Builder()
  jsonToTable(undefined, data, builder)
  t.pass()
})
