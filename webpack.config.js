const path = require('path')

module.exports = {
  mode: 'production',
  target: 'web',
  entry: [
    '@babel/polyfill',
    './src/index.js'
  ],
  output: {
    library: 'NestedJSONToTable',
    path: path.resolve(__dirname, 'dist'),
    filename: 'nested-json-to-table.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
