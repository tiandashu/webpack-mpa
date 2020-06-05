/*
 * @Descripttion:
 * @version:
 * @Author: tianlu.tian
 * @Date: 2020-06-05 10:39:50
 * @LastEditors: tianlu.tian
 * @LastEditTime: 2020-06-05 17:16:36
 */

const path = require('path')
const fs = require('fs')
const resolve = (dir) => path.resolve(__dirname, dir)

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')

// 多页入口
const mpaEntrys = getEntry()
function getEntry() {
	let entry = {}
	glob
		.sync(path.resolve(__dirname, 'pages/**/index.js'))
		.forEach(function (fileDir) {
			let pathObj = path.parse(fileDir)
			// 用文件夹名字作为入口名。
			let entryName = pathObj.dir.match(/\/\w+$/g)[0].split('/')[1]
			entry[entryName] = fileDir
		})
	return entry
}

// 多页plugin
function getHtmlWebpackPluginConfigs() {
	const res = []
	for (let [entryName] of Object.entries(mpaEntrys)) {
		const plugin = new HtmlWebpackPlugin({
			filename: `${entryName}.html`,
            chunks: [entryName],
            title: entryName
		})
		res.push(plugin)
	}
	return res
}

module.exports = {
	mode: process.env.NODE_ENV,
	entry: mpaEntrys,
	output: {
		path: resolve('dist'),
		publicPath: './',
		filename: '[name].[hash:8].js',
	},
	resolve: {
		alias: {},
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			},
		],
	},
	plugins: [
        // 输出 manifest.json
        ...getHtmlWebpackPluginConfigs(),
		new CleanWebpackPlugin(),
		// 提取公共chunk, webpack4 已经废弃
		// new webpack.optimize.CommonsChunkPlugin({
		//     name: 'common'
		// })
	],
	// 提取公共chunk
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: 2,
				},
			},
		},
	},
}
