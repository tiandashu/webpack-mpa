const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
module.exports = merge(common, {
  devtool: 'inline-source-map',
  // 多页访问需要拼接.html /home.html /index.html
  devServer: {
    contentBase: resolve('../dist'),
    hot: true,
    port: '8080',
    host: '127.0.0.1'
  },
  plugins: [
    new ManifestPlugin(),
  ]
})