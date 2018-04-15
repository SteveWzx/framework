var path = require('path');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry : {
        'app' : path.resolve(__dirname,'src/app.js')
    },
    output :{
        path : path.resolve(__dirname,'dist/'),
        publicPath : './dist/',
        filename : '[name].bundle.js',
        chunkFilename:'[name].bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                use : extractTextWebpackPlugin.extract({
                    fallback:{
                        loader : 'style-loader',
                        options : {
                            // insertInto:'#app',
                            singleton : true,
                            transform:'./css.transform.js'
                        }
                    },
                    use:[
                        {
                            loader : 'css-loader',
                            options :{
                                minimize : true,
                                modules:true,
                                localIdentName : '[path][name]__[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader : 'postcss-loader',
                            options:{
                                ident : 'postcss', //说明下边的插件都是为了postcss
                                plugins:[
                                    // require('autoprefixer')(),
                                    require('postcss-cssnext')()
                                ]
                            }
                        },
                        {
                            loader : 'sass-loader'
                        }
                    ]
                })
            }
        ]
    },
    plugins:[
        new extractTextWebpackPlugin({
            filename:'[name].min.css',
            allChunks:false //指定提取的css范围
        })
    ]
}