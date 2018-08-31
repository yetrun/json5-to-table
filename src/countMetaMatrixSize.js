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

// TODO: 更高效地实现 
function merge (maps) {
  let mergedMap = new Map()
  for (const map of maps) {
    mergedMap = new Map([...mergedMap, ...map])
  }
  return mergedMap
}

module.exports = countMetaMatrixSize
