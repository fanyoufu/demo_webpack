const path = require('path');
const {optimize}  = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  mode: 'development',
  entry:'./src/js/main.js',
  output:{
    // publicPath:'./build/',
    path:path.resolve(__dirname, './build'),
    filename:'[name].js'
  },
  devServer: {
    // 配置 webpack-dev-server的选项
    host: '127.0.0.1',  // 配置启动ip地址
    port: 10088,  // 配置端口
    open: true,  // 配置是否自动打开浏览器
    hot:true
  },
  module:{ // 处理非js模块
    rules:[ // 规则
      // {
      //   test: /\.css$/, 		// 正则测试
      //   // use: ExtractTextPlugin.extract({
      //   //   fallback: 'style-loader',
      //   //   use: ['css-loader']
      //   // })
      //   use: ['style-loader','css-loader'] 	// loader
      // },
      {
        test: /\.(less|css)$/, 		// 正则测试
        use: [
          {
            // loader: MiniCssExtractPlugin.loader
            loader:'style-loader'
          },
          { 
            loader: 'css-loader', 
            options: { importLoaders:2 } 
          },
          'postcss-loader',
          'less-loader'
        ],
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader','less-loader']
        // })
        // use: ['style-loader',{loader:'css-loader',
        //   options:{
        //     url:true
        //   }
        // },'less-loader'] 	// loader
      },
      {
        test:/\.(png|svg)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit: 3*1024,
              name: '[name]-[hash].[ext]',
              outputPath:'images'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,  // 排除目录
        use: [
            {
              loader:'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          ]  // es6转es5
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new HtmlWebpackPlugin({ // 打包输出HTML
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'index.html', // 文件名
      template: path.resolve('./src/index.html')
    }),
    new VueLoaderPlugin()
  ],
  optimization: {
    splitChunks: {
        chunks: 'async',
        minSize: 10*1024,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendor:{//node_modules内的依赖库
            chunks:'all',
            test: /[\\/]node_modules[\\/]/,
            name:'vendor',
            minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
            maxInitialRequests: 5,
            minSize: 0,
            priority:100,
            // enforce: true?
          },
          common: {// ‘src/js’ 下的js文件
              chunks:'all',
              test:/[\\/]src[\\/]js[\\/]/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
              name: 'common', //生成文件名，依据output规则
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority:1
          }
        }
    }
  }
};