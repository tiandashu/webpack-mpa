## 从零到一搭建webpack4
- 版本"webpack": "^4.43.0","webpack-cli": "^3.3.12"
- 包含mpa、spa

### TODO
多页配置问题

### 开始
```
npm i -D webpack webpack-cli 
npm i -D webpack-dev-server
```

### plugins
```
npm i -D html-webpack-plugin
npm i -D clean-webpack-plugin
npm i -D webpack-bundle-analyzer
npm i -D mini-css-extract-plugin
```

### loaders
```bash
npm i -D style-loader css-loader
npm i -D sass-loader sass
npm i -D postcss-loader autoprefixer

npm i -D mini-css-extract-plugin // 拆分成一个整体css
npm i -D extract-text-webpack-plugin@next // 拆分成单独的css
npm i -D file-loader url-loader

# babel-loader 8.x 对应babel-core 7.x
# babel-loader 7.x 对应babel-core 6.x
npm i -D babel-loader @babel/preset-env @babel/core
npm i @babel/polyfill

```

### vue
```
npm i -D vue-loader vue-template-compiler vue-style-loader
npm i -S vue
```

### npm 脚本
```
"build": "webpack --config build/webpack.config.js",
"dev": "webpack-dev-server --config build/webpack.config.js --open",
"analyz": "NODE_ENV=production npm_config_report=true npm run dev",
```

### webpack 优化

[源码](https://github.com/tiandashu/tl-webpack-vue)

### 实现压缩图片小功能
- 使用canvas进行转化

# webpack混合配置
npm i -D webpack-merge  

# 拷贝文件比如public里的
npm i -D copy-webpack-plugin