function countMetaMatrixSize (meta) {
  let maps = []
  let rowSpan = 0
  let colSpan = 0
  for (const key of meta.order) {
    const props = meta.mapping[key]
    let keyRowSpan = 1
    let keyColSpan = 1
    if (props.meta) {
      const [_rowSpan, _colSpan, keyMetaSizeMap] = countMetaMatrixSize(props.meta)
      maps.push(keyMetaSizeMap)
      keyRowSpan = 1 + _rowSpan
      keyColSpan = _colSpan
    }
    rowSpan = Math.max(rowSpan, keyRowSpan)
    colSpan += keyColSpan
  }

  const map = merge(maps)
  map.set(meta, [rowSpan, colSpan])
  return [rowSpan, colSpan, map]
}

// https://stackoverflow.com/questions/32000865/simplest-way-to-merge-es6-maps-sets#answer-32000937
function merge (maps) {
  return new Map((function *() {
    for (const map of maps) {
      yield *map
    }
  })())
}

module.exports = countMetaMatrixSize
