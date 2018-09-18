class Builder {
  table(next) {
    this.data = {}
    this.current = this.data
    next()
    this.current = null
  }

  head(next) {
    this.data.head = []
    this.current = this.data.head
    next()
    this.current = this.data
  }

  body(next) {
    this.data.body = []
    this.current = this.data.body
    next()
    this.current = this.data
  }

  row(next) {
    const rowData = []
    this.current.push(rowData)
    const previous = this.current
    this.current = rowData
    next()
    this.current = previous
  }

  cell(data, at) {
    this.current.push({
      data: data,
      rowSpan: at.rowSpan,
      colSpan: at.colSpan,
      isHead: at.isHead
    })
  }
}

module.exports = Builder
