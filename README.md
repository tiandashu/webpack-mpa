## webpack4 配置
- 包含mpa、spa混合搭建

### 目录结构
```
├── src                       
│   └── views                 # 每一个文件夹对应一个页面
│       └── a                 
│           └── index.js
|           └── index.html    # 自定义模板
│       └── b                 
│           └── index.js
├── dist                      # 打包输出的目录
|   └── ...
└── template.html             # 将根据这个模版，生成各个页面的html(公共模板)
└── webpack.config.js
└── dev-server.js             # webpack-dev-server + express   
```

### 开始
```js
// webpack": "^4.43.0","webpack-cli": "^3.3.12"
npm i -D webpack webpack-cli 
npm i -D webpack-dev-server
```

### plugins
```js
npm i -D html-webpack-plugin
npm i -D clean-webpack-plugin
npm i -D webpack-bundle-analyzer
npm i -D mini-css-extract-plugin
npm i -D copy-webpack-plugin
npm i -D webpack-merge 
```

### loaders
```js
npm i -D style-loader css-loader
npm i -D sass-loader sass
npm i -D postcss-loader autoprefixer

npm i -D file-loader url-loader

// babel-loader 8.x 对应babel-core 7.x
// babel-loader 7.x 对应babel-core 6.x
npm i -D babel-loader @babel/preset-env @babel/core
npm i @babel/polyfill

npm i -D mini-css-extract-plugin // 拆分成一个整体css
npm i -D extract-text-webpack-plugin@next // 拆分成单独的css
```

### vue
```js
npm i -D vue-loader vue-template-compiler vue-style-loader
npm i -S vue
```

### npm 脚本
```bash
"build": "webpack --config build/webpack.config.js",
"dev": "webpack-dev-server --config build/webpack.config.js --open",
"analyz": "NODE_ENV=production npm_config_report=true npm run dev",
```

### webpack 优化

[源码](https://github.com/tiandashu/tl-webpack-vue)

### 实现压缩图片小功能
- 使用canvas进行转化