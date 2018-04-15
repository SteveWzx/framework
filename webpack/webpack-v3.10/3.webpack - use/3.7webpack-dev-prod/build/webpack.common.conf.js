const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.conf')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin') //抽离css样式 防止将样式打包在js中引起页面样式加载错乱的现象
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const generateConfig = env => {

    const extraSass = new ExtractTextWebpackPlugin({
        filename: 'css/[name]-bundle-[hash:5].css'
    });

    const scriptLoader = [
        {
            loader: 'babel-loader'
        }
    ].concat(env === 'production'
        ? []
        : [{
            loader: 'eslint-loader',
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }]);
    const cssLoader = [
        {
            loader: 'css-loader',
            options:{
                importLoaders: 2,
                sourceMap: env === 'development'
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss', //说明下边的插件都是为了postcss
                sourceMap: env === 'development' ,
                plugins: [
                    require('postcss-cssnext')()
                ].concat(
                    env === 'production'
                    ?   require('postcss-sprites')({
                            spritePath: 'dist/assets/imgs/sprites/',
                            retina: true
                        })
                    : []
                )
            }
        },
        {
            loader: 'sass-loader',
            options:{
                sourceMap: env === 'development'
            }
        }
    ]
    const styleLoader = env === 'production'
        ? extraSass.extract({
            fallback:'style-loader', //loader应用于当 CSS 没有被提取
            use:cssLoader //loader 被用于将资源转换成一个 CSS 导出模块
        })
        : [{
            loader :'style-loader'
        }].concat(cssLoader)

    const fileLoader = env === 'development'
    ? [{
            loader:'file-loader',
            options:{
                name : '[name]-[hash:5].[ext]',
                outputPath :'assets/imgs/'
            }
        }]
     : [{
            loader: 'url-loader',
            options: {
                name: '[name]-[hash:5].[ext]',
                limit: 1000,
                outputPath: 'assets/imgs/'
            }
        }]

    return {
        entry: {
            'app': './src/app.js'
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/',
            filename: 'js/[name].bundle-[hash:5].js'
        },
        resolve: {
            alias: {
                jquery$: path.resolve(__dirname, '../src/lib/jquery.min.js')
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, '../src')],
                    exclude: [path.resolve(__dirname, '../src/lib')],
                    use: scriptLoader
                },
                {
                    test: /\.scss$/,
                    use: styleLoader
                },
                {
                    test: /\.(png|jpg|gif|jpeg)$/,
                    use: fileLoader.concat(
                        env === 'production'
                        ? {
                            loader: 'img-loader',
                            options: {
                                pngquant: {
                                    quality: 80
                                }
                            }
                        }
                        : []
                    )
                },
                {
                    test: /\.(eot|woff2?|ttf|svg)$/,
                    use: fileLoader
                }
            ]
        },
        plugins:[
            extraSass,
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
                // chunks : ['app'], //指定加载数组中的chunks
                minify: {
                    collapseWhitespace: true
                }
            }),
            new webpack.ProvidePlugin({
                $ : 'jquery'  // jquery 是模块名
            })
        ]
    }
}

module.exports = env => {
    let config = env === 'production'
        ? productionConfig
        : developmentConfig;

    return merge(generateConfig(env), config)
}
