const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const resolve = (dir) => path.resolve(__dirname, dir)
const { mpaEntrys, getHtmlWebpackPluginConfigs } = require('./mpa')
console.log(99999, mpaEntrys)
console.log(88888, getHtmlWebpackPluginConfigs())
module.exports = {
	mode: process.env.NODE_ENV,
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
		// 输出 manifest.json
		...getHtmlWebpackPluginConfigs(),
		new vueLoaderPlugin(),
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
