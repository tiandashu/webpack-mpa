exports.rules = [
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
]
