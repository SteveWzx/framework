const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成配置的html文件
const ExtraTextWebpackPlugin = require('extract-text-webpack-plugin'); //将css从js中分离出来
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清除打包文件

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/app.js'),
        page: path.resolve(__dirname, 'src/page.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: 'http://localhost:9001/',
        filename: '[name].[hash:5].js'
        // filename: '[name].[chunkhash:5].js'        
    },
    module: {
        rules: [
            //处理js
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
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
                                    require('postcss-sprites')({
                                        spritePath: './dist/imgs/sprite/',
                                        //仅对sprite文件夹中的图片进行合并
                                        filterBy: function (image) {
                                            if (!/\/imgs\/sprite\//.test(image.url)) {
                                                return Promise.reject();
                                            }
                                            return Promise.resolve();
                                        }
                                    }),
                                    // css未来规范，css前缀补全
                                    require('postcss-cssnext')({
                                        "browsers": [
                                            "> 1%",
                                            "last 20 versions",
                                            "IE > 7",
                                            "ff>20"
                                        ]
                                    }),
                                    // css压缩
                                    require('cssnano')()
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            //处理css中的img
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            limit: '1000',
                            outputPath: './imgs/'
                        }
                    },
                    // //img处理
                    // {
                    //     loader: 'img-loader',
                    //     options: {
                    //         pngquant: {
                    //             quality: 80,
                    //             speed: 2
                    //         },
                    //         mozjpeg: {
                    //             quality: 80
                    //         }
                    //     }
                    // }
                ]
            },
            //处理html中的img
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src']
                    }
                }
            }
        ]
    },
    plugins: [
        // 生成HTML
        // https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html', //相对于输出目录路径
            title: 'dognwudi', // 配置不会替换模板文件中的title，除非使用了ejs语法： <title> <%= htmlWebpackPlugin.options.title%> </title>
            inject: 'body', // body,false
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
            // filename: 'css/[name].[contenthash:5].css' //name 对应的entry中的name
            filename: 'css/[name].[hash:5].css' //name 对应的entry中的name
            
        }),
        // 清除打包文件
        new CleanWebpackPlugin(['dist']),

        //热更新
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        port: 9001,
        historyApiFallback:true,
        // historyApiFallback: {
        //     rewrites: [
        //         {
        //             from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
        //             to: function (context) {
        //                 return '/' + context.match[1] + context.match[2] + '.html'
        //             }
        //         }
        //     ]
        // },
        hot: true, //热更新
        hotOnly: true,
        contentBase: path.join(__dirname, './src')
    }
}

    //   "babel-core": "^6.26.0",
    //   "babel-loader": "^7.1.4",
    //   "babel-preset-env": "^1.6.1",
    //   "clean-webpack-plugin": "^0.1.19",
    //   "css-loader": "^0.28.11",
    //   "cssnano": "^3.10.0",
    //   "extract-text-webpack-plugin": "^3.0.2",
    //   "file-loader": "^1.1.11",
    //   "html-loader": "^0.5.5",
    //   "html-webpack-plugin": "^3.1.0",
    //   "img-loader": "^2.0.1",
    //   "node-sass": "^4.7.2",
    //   "postcss": "^6.0.20",
    //   "postcss-cssnext": "^3.1.0",
    //   "postcss-loader": "^2.1.2",
    //   "postcss-sprites": "^4.2.1",
    //   "sass-loader": "^6.0.7",
    //   "style-loader": "^0.20.3",
    //   "url-loader": "^1.0.1",
    //   "webpack": "^3.10.0",
    //   "webpack-dev-server": "^2.9.7"