const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
        app : path.resolve(__dirname,'src/app.js')
    },
    output:{
    	path: path.resolve(__dirname,'dist/'),
        filename:'[name].[hash:5].js'
    },

    plugins:[
        // https://github.com/jantimon/html-webpack-plugin
    	new HtmlWebpackPlugin({
    		template:'./index.html',
            filename : 'app.html', //相对于输出目录路径
            title: 'dognwudi', // 配置不会替换模板文件中的title，除非使用了ejs语法： <title> <%= htmlWebpackPlugin.options.title%> </title>
            inject : 'head', // body,false
            chunks:'all', //此生成页包含的chunks
            excludeChunks: [], //去除的chunks
            favicon : './favicon.ico', // icon
            minify :{ //对生成的html文档进行压缩操作
                removeComments: true, //去掉注释
                collapseWhitespace : true, //去掉空行
                minifyJS : true,
                minifyCSS : true
            }
    	})
    ]
}
