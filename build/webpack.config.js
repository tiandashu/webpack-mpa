const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// 拆分配置
const { rules } = require('./rules')
console.log('-----NODE_ENV-----', process.env.NODE_ENV)

// webpack 默认配置文件
module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'inline-source-map',
	entry: {
		home: resolve('../pages/home'),
	},
	output: {
		path: resolve('../dist'),
		publicPath: '/',
		filename: '[name].[hash:8].js',
	},
	devServer: {
		contentBase: resolve('../dist'),
		hot: true,
		// open: true,
		port: 3000,
		host: '127.0.0.1',
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
		// 启用 HMR
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		// 输出 manifest.json
		new ManifestPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'home',
			filename: 'index.html',
			template: resolve('../pages/home/index.html'),
			title: 'home',
		}),
		new vueLoaderPlugin(),
		new BundleAnalyzerPlugin({
			analyzerHost: '127.0.0.1',
			analyzerPort: '3001',
		}),
	],
}
