module.exports = {
  mode: 'development',
  entry: './lib/index',
  output: {
    filename: 'json-to-table.js',
    library: 'JSONToTable'
  },
  externals: {
    fs: 'fs'
  }
}
