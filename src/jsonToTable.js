function jsonToTable (meta, data, builder) {
  builder.table(() => {
    metaToHead(meta, builder)
    dataToBody(meta, data, builder)
  })
}

function metaToHead (meta, builder) {
  builder.head(() => {
    builder.row(() => {
      for (const key of meta.order) {
        builder.col(meta.mapping[key].title)
      }
    })
  })
}

function dataToBody (meta, data, builder) {
  builder.body(() => {
    for (const rowData of data) {
      builder.row(() => {
        for (const key of meta.order) {
          builder.col(rowData[key])
        }
      })
    }
  })
}

module.exports = jsonToTable
