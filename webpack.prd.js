/*
 * @Descripttion: 
 * @version: 
 * @Author: tianlu.tian
 * @Date: 2020-06-05 10:39:36
 * @LastEditors: tianlu.tian
 * @LastEditTime: 2020-06-05 10:59:14
 */ 
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')


module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    // new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})