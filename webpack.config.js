const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');


module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        home: './pages/home',
    },
    output: {
        path: resolve('dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: "./dist",
        hot: true
    },
    resolve: {
        alias: {

        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        // 启用 HMR
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // 输出 manifest.json
        new ManifestPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'index',
            filename: 'index.html'
        })
    ]
}