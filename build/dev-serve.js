const express = require('express')
const webpack = require('webpack')
const common = require('./webpack.common')
const path = require('path')

const app = express()
const compiler = webpack(common)

// 配置本地服务，根据url直接访问

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: common.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

app.use(devMiddleware)

// 路由
app.get('/:viewname?', function(req, res, next) {
  var viewname = req.params.viewname ? req.params.viewname + '.html' : 'index.html'
  var filepath = path.join(compiler.outputPath, viewname)
  // 使用webpack提供的outputFileSystem
  compiler.outputFileSystem.readFile(filepath, function(err, result) {
    if (err) {
        // something error
        return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
});
})

module.exports = app.listen(8080, function(err) {
  if(err) {
    console.error('listren', err)
    return
  }
  console.log('serve start at: http://127.0.0.1:8080')
})