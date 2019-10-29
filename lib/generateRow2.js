function generateRow (data, props) {
  const row = []
  for (const prop of props) {
    const dataOfProp = data[prop.key]
    if (prop.props) {
      const rowOfProp = generateRow(dataOfProp, prop.props)
      row.push(...rowOfProp)
    } else {
      row.push(dataOfProp)
    }
  }
  return row
}

module.exports = generateRow
