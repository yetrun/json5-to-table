function sortCells (cells) {
  cells.sort((c1, c2) => {
    if (c1.r !== c2.r) {
      return c1.r - c2.r
    } else {
      return c1.c - c2.c
    }
  })
  return cells
}

function showValue (val) {
  if (Array.isArray(val)) {
    return val.join(', ')
  } else if (typeof val === 'object') {
    return JSON.stringify(val)
  } else {
    return val
  }
}

module.exports = {
  sortCells,
  showValue
}
