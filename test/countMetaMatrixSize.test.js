const test = require('ava')
const { meta } = require('./fixtures')
const countMetaMatrixSize = require('../src/countMetaMatrixSize')

test.only('count nested meta matrix size', t => {
  const [, , metaSizeMap] = countMetaMatrixSize(meta.nested)
  // TODO: https://github.com/avajs/ava/issues/1380
  t.deepEqual(metaSizeMap, new Map([
    [meta.nested.mapping.b.meta, [1, 2]],
    [meta.nested, [2, 3]]
  ]))
})
