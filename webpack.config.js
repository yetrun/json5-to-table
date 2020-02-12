module.exports = {
  mode: 'production',
  entry: './lib/index',
  output: {
    filename: 'json-to-table.min.js',
    library: 'JSONToTable'
  },
  externals: {
    fs: 'fs'
  }
}
