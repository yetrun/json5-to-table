const isPrimitive = require('./isPrimitive')
const Matrix = require('./Matrix')
const countMetaMatrixSize = require('./countMetaMatrixSize')
const countDataMatrixSize = require('./countDataMatrixSize')

function dataToMatrix (meta, data, metaSizeMap) {
  const [rowSpan, colSpan] = countDataMatrixSize(meta, data)
  const matrix = new Matrix(rowSpan, colSpan).fill(false)
  if (!metaSizeMap) {
    [, , metaSizeMap] = countMetaMatrixSize(meta)
  }
  dataToExpandedMatrix(meta, data, matrix, 1, metaSizeMap)
  return matrix
}

// 扩展的dataToMatrix实现，该实现会扩展孤单数据直到最后一行。
// 因为只会从第一行调用该函数，所以只需要提供colFrom参数。
// 该实现返回实际占用的colSpan。
// 特例：
// - data可能是undefined
function dataToExpandedMatrix (meta, data, matrix, colFrom, metaSizeMap) {
  if (isPrimitive(data)) {
    const [_, colSpan] = metaSizeMap.get(meta)
    matrix.set(1, colFrom, { data: data, rowSpan: matrix.rowCount, colSpan: colSpan })
    return colSpan
  }

  let currentColFrom = colFrom

  for (const key of meta.order) {
    const props = meta.mapping[key]
    if (props.meta && Array.isArray(data[key])) {
      // 对象数组
      const keyDataArray = data[key]

      // 紧凑层排
      let currentRowFrom = 1
      for (const keyData of keyDataArray) {
        const _rowSpan = dataToCompactMatrix(props.meta, keyData, matrix, currentRowFrom, currentColFrom, metaSizeMap)
        currentRowFrom += _rowSpan
      }

      // 余下区域merge留白
      const [, colSpan] = metaSizeMap.get(props.meta)
      if (currentRowFrom <= matrix.rowCount) {
        matrix.set(currentRowFrom, currentColFrom, 
          { data: undefined, rowSpan: matrix.rowCount - currentRowFrom + 1, colSpan: colSpan })
      }

      currentColFrom += colSpan
    } else if (props.meta) {
      // 对象
      const keyData = data[key]

      // 单排
      const _colSpan = dataToExpandedMatrix(props.meta, keyData, matrix, currentColFrom, metaSizeMap)

      currentColFrom += _colSpan
    } else {
      // 标量值需要扩展到最后一行
      matrix.set(1, currentColFrom, { data: data[key], rowSpan: matrix.rowCount, colSpan: 1 })

      currentColFrom += 1
    }
  }

  return currentColFrom - colFrom
}

// 紧凑的dataToMatrix实现，该实现仅仅会扩展孤单数据到实际占用的行。
// 余下的空白区域不会做任何处理。
// 同时该实现返回实际占用的rowSpan。
function dataToCompactMatrix (meta, data, matrix, rowFrom, colFrom, metaSizeMap) {
  if (isPrimitive(data)) {
    const [_, colSpan] = metaSizeMap.get(meta)
    matrix.set(1, colFrom, { data: data, rowSpan: 1, colSpan: colSpan })
    return 1
  }

  const unsetRowSpans = []
  let maxRowSpan = 0
  let currentColFrom = colFrom

  for (const key of meta.order) {
    const props = meta.mapping[key]
    if (props.meta) {
      // 统一为对象数组
      const keyDataArray = data[key]
      if (Array.isArray(keyDataArray)) {
        keyDataArray = [keyDataArray]
      }

      // 层排
      let currentRowFrom = rowFrom
      for (const keyData of keyDataArray) {
        const _rowSpan = dataToCompactMatrix(props.meta, keyData, matrix, currentRowFrom, currentColFrom, metaSizeMap)
        currentRowFrom += _rowSpan
      }

      maxRowSpan = Math.max(maxRowSpan, currentRowFrom - rowFrom)
      currentColFrom += colSpan
    } else {
      // 标量值需要比较以便下一次扩展
      const item = { data: data[key], colSpan: 1 }
      matrix.set(rowFrom, currentColFrom, item)
      unsetRowSpans.push(item)

      maxRowSpan = Math.max(maxRowSpan, 1)
      currentColFrom += 1
    }
  }

  for (const unset of unsetRowSpans) {
    unset.rowSpan = maxRowSpan
  }

  return maxRowSpan
}

module.exports = dataToMatrix
