const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成配置的html文件
const ExtraTextWebpackPlugin = require('extract-text-webpack-plugin'); //将css从js中分离出来

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/app.js'),
        page: path.resolve(__dirname, 'src/page.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].[chunkhash:5].js'
    },
    module: {
        rules: [
            //处理scss
            {
                test: /\.scss$/,
                use: ExtraTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss', //说明下边的插件都是为了postcss
                                plugins: [
                                    require('postcss-cssnext')({
                                        "browsers": [
                                            "> 1%",
                                            "last 50 versions",
                                            "IE > 7",
                                            "ff>20"
                                        ]
                                    }),
                                    require('cssnano')()
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        // 生成HTML
        // https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'app.html', //相对于输出目录路径
            title: 'dognwudi', // 配置不会替换模板文件中的title，除非使用了ejs语法： <title> <%= htmlWebpackPlugin.options.title%> </title>
            inject: 'head', // body,false
            chunks: 'all', //此生成页包含的chunks
            excludeChunks: [], //去除的chunks
            favicon: './favicon.ico', // icon
            minify: { //对生成的html文档进行压缩操作
                removeComments: true, //去掉注释
                collapseWhitespace: true, //去掉空行
                minifyJS: true,
                minifyCSS: true
            }
        }),
        // ExtraTextWebpackPlugin.extract 配合使用
        new ExtraTextWebpackPlugin({
            filename: 'css/[name].[contenthash:5].css' //name 对应的entry中的name
        })
    ]
}