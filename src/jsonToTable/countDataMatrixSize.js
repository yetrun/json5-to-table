// data must be object
function countDataMatrixSize (meta, data = {}) {
  let totalRowSpan = 0
  let totalColSpan = 0
  for (const key of meta.order) {
    const props = meta.mapping[key]
    if (props.meta) {
      // 统一按照数组处理
      let keyDataArray = data[key]
      if (!Array.isArray(keyDataArray)) {
        keyDataArray = [keyDataArray]
      }

      // 层排
      let _totalRowSpan = 0
      let _totalColSpan = 0
      for (const keyData of keyDataArray) {
        const [_rowSpan, _colSpan] = countDataMatrixSize(props.meta, keyData)
        _totalRowSpan += _rowSpan
        _totalColSpan = _colSpan
      }

      totalRowSpan = Math.max(_totalRowSpan, totalRowSpan)
      totalColSpan += _totalColSpan
    } else {
      totalRowSpan = Math.max(totalRowSpan, 1)
      totalColSpan += 1
    }
  }
  return [totalRowSpan, totalColSpan]
}

module.exports = countDataMatrixSize
