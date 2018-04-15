var webpack = require('webpack');
var purifyCss = require('purifycss-webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var htmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');

var path = require('path');
var glob = require('glob-all');

var extraSass = new extractTextWebpackPlugin({
    filename : 'css/[name]-bundle-[hash:5].css'
});

module.exports = {
    entry : {
        'app' : path.resolve(__dirname,'src/app.js')
    },
    output :{
        path : path.resolve(__dirname,'dist'),
        publicPath : '/', //实际网站下
        filename : 'js/[name].bundle-[hash:5].js',
        // chunkFilename:'[name].bundle-[hash:5].js'
    },
    module:{
        rules:[
            {
                test : /\.js$/,
                use:[
                    {
                        loader : 'babel-loader',
                        options:{
                            presets:['env']
                        }
                    }
                ]
            },
            {
                test:/\.scss$/,
                use : extractTextWebpackPlugin.extract({
                    fallback:{
                        loader : 'style-loader',
                        options : {
                            singleton : true
                        }
                    },
                    use:[
                        {
                            loader : 'css-loader',
                            // options :{
                            //     minimize : true,
                            //     modules:true,
                            //     localIdentName : '[path][name]__[local]--[hash:base64:5]'
                            // }
                        },
                        {
                            loader : 'postcss-loader',
                            options:{
                                ident : 'postcss', //说明下边的插件都是为了postcss
                                plugins:[
                                    // require('autoprefixer')(),
                                    require('postcss-sprites')({
                                        spritePath : './dist/assets/imgs/sprites/',
                                        retina : true
                                    }),
                                    require('postcss-cssnext')()
                                ]
                            }
                        },
                        {
                            loader : 'sass-loader'
                        }
                    ]
                })
            },
            {
                test:/\.(png|jpg|gif|jpeg)$/,
                use:[
                    // {
                    //     loader:'file-loader',
                    //     options:{
                    //         publicPath:'./assets/imgs/',  //相对于dist
                    //         outputPath:'',
                    //         useRelativePath:true,
                    //     }
                    // }
                    {
                        loader:'url-loader',
                        options:{
                            name : '[name]-[hash:5].[ext]',
                            limit : 10000,
                            outputPath:'assets/imgs/'
                        }
                    },
                    {
                        loader : 'img-loader',
                        options : {
                            pngquant : {
                                // quality: 80,
                                speed : 2
                            }
                        }
                    }
                ]
            },
            {
                test : /\.(eot|woff2?|ttf|svg)$/,
                use :[
                    {
                        loader : 'url-loader',
                        options:{
                            name : '[name]-[hash:5].[ext]',
                            limit : 5000,
                            publicPath:'',
                            outputPath:'/',
                            useRelativePath:true
                        }
                    }
                ]
            },
            {
                test : path.resolve(__dirname,'src/app.js'),
                use:[
                    {
                        loader:'imports-loader',
                        options:{
                            $ : 'jquery'
                        }
                    }
                ]
            },
            // {
            //     test : /\.html$/,
            //     use:[
            //         {
            //             loader :'html-loader',
            //             options:{
            //                 attrs:['img:src','img:data-src']
            //             }
            //         }
            //     ]
            // }
        ]
    },
    resolve:{
        alias:{
            jquery$ : path.resolve(__dirname,'src/lib/jquery.min.js')
        }
    },
    plugins:[
        // new extractTextWebpackPlugin({
        //     filename:'[name].min.css',
        //     // allChunks:false //指定提取的css范围
        // }),
        extraSass,

        new purifyCss({
            paths: glob.sync([
                path.join(__dirname,'./*.html'),
                path.join(__dirname,'./src/*.js')
            ])
        }),


        new webpack.optimize.CommonsChunkPlugin({
            name : 'manifest'
        }),
        new htmlInlineChunkPlugin({
            inlineChunks : ['manifest']
        }),

        new htmlWebpackPlugin({
            filename : 'index.html',
            template : './index.html',
            inject : true,
            // chunks : ['app'], //指定加载数组中的chunks
            minify:{
                collapseWhitespace : true
            }
        }),

        // new webpack.ProvidePlugin({
        //     $ : 'jquery'  // jquery 是模块名
        // }),

        new webpack.optimize.UglifyJsPlugin(),

        new cleanWebpackPlugin(['dist'])
    ],
    devServer:{
        // inline:false, // iframe模式
        port : 9001,
        // historyApiFallback:true
        historyApiFallback:{
            rewrites:[
                {
                    from:/^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
                    to:function (context) {
                        return '/' + context.match[1] + context.match[2] + '.html'
                    }
                }
            ]
        },
        proxy:{
            '/':{
                target : "https://m.weibo.cn",
                changeOrigin : true,
                logLevel : "debug",
                pathRewrite:{
                    '^/comments' : '/api/comments'
                },
                headers:{
                    'Cookie':"_T_WM=5b42533032269b3a63c9c29a6d80f58a; ALF=1524643702; SCF=AkxXZqi13fXur8L0U-TKT7oScxEQzvSGXIkbsxEAjTQQa3fPtBAyvecYthGY27W3wsRT1b8WrMUeYiG32CnwzV4.; SUB=_2A253vNoDDeRhGeNN7FAY9S_FwzuIHXVVXuZLrDV6PUJbktANLRjukW1NSYw6R2OzEZKK1A7LCM_iZE2s0n36OR1D; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WW5iuwzFW8On-gndcq_Ny7u5JpX5K-hUgL.Fo-0S0z4SK241hM2dJLoI0qLxKnL1K2LBKeLxKnLBo2L1hqLxKnLBo2L1hqLxKML1-2L1hBLxKMLBKML12zLxK-LBKBLBK.t; SUHB=0rrr72uEFZRxXL; SSOLoginState=1522051704; M_WEIBOCN_PARAMS=oid%3D4221822696396734%26luicode%3D10000011%26lfid%3D1005055372951987%252Fhome%26uicode%3D20000174; H5_INDEX=3; H5_INDEX_TITLE=%E8%91%A3%E8%B1%86%E8%B1%86%E7%9A%84%E7%A7%8B%E5%A4%A9"
                }
            }
        }
    }
}