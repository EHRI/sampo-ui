const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.client.common.js')

const outputDirectory = 'dist/public'

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 8080,
    open: true,
    historyApiFallback: true,
    devMiddleware: {
      publicPath: '/'
    }
  },
  output: {
    path: path.resolve(__dirname, outputDirectory),
    publicPath: '/'
  }
})
