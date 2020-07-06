const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = src => path.resolve(__dirname, src)

const mpaEntrys = getEntry()

// 多页入口
function getEntry() {
	let entry = {}
	glob
		.sync(path.resolve(__dirname, '../pages/**/index.js'))
		.forEach(function(fileDir) {
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
			title: entryName,
			template: resolve(`../pages/${entryName}/index.html`)
		})
		res.push(plugin)
	}
	return res
}

module.exports = {
	mpaEntrys,
	getHtmlWebpackPluginConfigs,
}
