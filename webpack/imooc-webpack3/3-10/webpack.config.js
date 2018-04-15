var webpack = require('webpack')
var PurifyWebpack = require('purifycss-webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

var path = require('path')
var glob = require('glob-all')

var extractLess = new ExtractTextWebpackPlugin({
    filename: 'css/[name].bundle.css',
})

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: '[name].bundle.js'
    },

    resolve: {
        alias: {
            jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
        }
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                use: extractLess.extract(
                    {
                        fallback: {
                            loader: 'style-loader',
                            options: {
                                singleton: true,
                                // transform: './css.transform.js'
                            }
                        },
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 2
                                    // minimize: true,
                                    // modules: true,
                                    // localIdentName: '[path][name]_[local]_[hash:base64:5]'
                                }
                                // loader: 'file-loader'
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: [
                                        require('postcss-sprites')({
                                            spritePath: 'dist/assets/imgs/sprites',
                                            retina: true
                                        }),      
                                        require('postcss-cssnext')()
                                    ]
                                }
                            },
                            {
                                loader: 'less-loader'
                            }
                        ]
                    })
            },

            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         publicPath: '',
                    //         outputPath: 'dist/',
                    //         useRelativePath: true
                    //     }
                    // }
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            limit: 1000,
                            publicPath: '',
                            outputPath: 'dist/',
                            useRelativePath: true
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            pngquant: {
                                quality: 80
                            }
                        }
                    }
                ]
            },

            {
                test:/\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            limit: 5000,
                            publicPath: '',
                            outputPath: 'dist/',
                            useRelativePath: true
                        }
                    }
                ]
            },

            {
                test: path.resolve(__dirname, 'src/app.js'),
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            $: 'jquery'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        extractLess,
        new PurifyWebpack({
            paths: glob.sync([
                './*.html',
                './src/*.js'
            ])
        }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}