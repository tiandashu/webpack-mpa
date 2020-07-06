const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin
// webpack 默认配置文件
module.exports = {
	mode: 'development',
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
		port: 8081,
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
		rules: [
			{
				test: /\.vue$/,
				use: ['vue-loader'],
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [require('autoprefixer')],
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.(jpe?g|png|gif)$/i, //图片文件
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'img/[name].[hash:8].[ext]',
								},
							},
						},
					},
				],
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'media/[name].[hash:8].[ext]',
								},
							},
						},
					},
				],
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'fonts/[name].[hash:8].[ext]',
								},
							},
						},
					},
				],
			},
		],
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
