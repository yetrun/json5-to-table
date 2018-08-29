const metaToMatrix = require('./metaToMatrix')
const dataToMatrix = require('./dataToMatrix')

function jsonToTable (meta, data, builder) {
  builder.table(() => {
    metaToHead(meta, builder)
    dataToBody(meta, data, builder)
  })
}

function metaToHead (meta, builder) {
  builder.head(() => {
    const matrix = metaToMatrix(meta)
    matrix.forEachRow(row => {
      builder.row(() => {
        row.forEach(item => {
          if (item) {
            builder.col(item.title, { rowSpan: item.rowSpan, colSpan: item.colSpan })
          }
        })
      })
    })
  })
}

function dataToBody (meta, data, builder) {
  builder.body(() => {
    for (const rowData of data) {
      const matrix = dataToMatrix(meta, rowData)
      matrix.forEachRow(row => {
        builder.row(() => {
          row.forEach(item => {
            if (item) {
              builder.col(item.data, { rowSpan: item.rowSpan, colSpan: item.colSpan })
            }
          })
        })
      })
    }
  })
}

module.exports = jsonToTable
