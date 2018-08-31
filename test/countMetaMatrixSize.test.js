const test = require('ava')
const { meta } = require('./fixtures')
const countMetaMatrixSize = require('../src/countMetaMatrixSize')

test('count nested meta matrix size', t => {
  const [, , metaSizeMap] = countMetaMatrixSize(meta.nested)
  // In ava, map wit different order are not equal. Ref: https://github.com/avajs/ava/issues/1380.
  const expectedMetaSizeMap = new Map([
    [meta.nested, [2, 3]],
    [meta.nested.mapping.b.meta, [1, 2]]
  ])
  t.is(metaSizeMap.size, expectedMetaSizeMap.size)
  for (const [key, value] of metaSizeMap) {
    t.true(expectedMetaSizeMap.has(key))
    t.deepEqual(value, expectedMetaSizeMap.get(key))
  }
})
