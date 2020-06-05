/*
 * @Descripttion: 
 * @version: 
 * @Author: tianlu.tian
 * @Date: 2020-06-05 10:39:28
 * @LastEditors: tianlu.tian
 * @LastEditTime: 2020-06-05 10:54:08
 */ 
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack')



module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  plugins: [
    new ManifestPlugin(),
    // 启用 HMR
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
})