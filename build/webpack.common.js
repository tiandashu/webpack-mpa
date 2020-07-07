const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const resolve = (dir) => path.resolve(__dirname, dir)

//提取公共配置
const { mpaEntrys, getHtmlWebpackPluginConfigs } = require('./mpa')
const { rules } = require('./rules')

console.log('-----NODE_ENV-----', process.env.NODE_ENV)
module.exports = {
	mode: process.env.NODE_ENV || 'development',
	entry: mpaEntrys,
	output: {
		path: resolve('../dist'),
		publicPath: '/',
		filename: '[name].[hash:8].js',
	},
	resolve: {
		alias: {
			$vue: 'vue/dist/vue.runtime.esm.js',
			'@': path.resolve(__dirname, '../pages'),
		},
		extensions: ['.js', '.json', '.vue'],
	},
	module: {
		rules
	},
	plugins: [
		...getHtmlWebpackPluginConfigs(),
		new vueLoaderPlugin(),
		new CleanWebpackPlugin(),
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
