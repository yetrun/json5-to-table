function countMetaMatrixSize (meta) {
  let rowSpan = 0
  let colSpan = 0
  for (const key of meta.order) {
    const props = meta.mapping[key]
    let keyRowSpan = 1
    let keyColSpan = 1
    if (props.meta) {
      const [_rowSpan, _colSpan] = countMetaMatrixSize(props.meta)
      keyRowSpan = 1 + _rowSpan
      keyColSpan = _colSpan
    }
    rowSpan = Math.max(rowSpan, keyRowSpan)
    colSpan += keyColSpan
  }
  return [rowSpan, colSpan]
}

module.exports = countMetaMatrixSize
