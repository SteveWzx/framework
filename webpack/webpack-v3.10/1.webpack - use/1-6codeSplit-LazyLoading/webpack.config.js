var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry : {
        'pageA':path.resolve(__dirname,'pageA'),
        // 'pageB':path.resolve(__dirname,'pageB'),
        // 'vendor':[
        //     'lodash'
        // ]
    },
    output:{
        path: path.resolve(__dirname,'./dist'),
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js',
        publicPath : './dist/'
    },
    plugins:[
        // 提取vendor ,common ,以及webpack 分离  使用names
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks : 2,
        //     chunks : ['pageA','pageB']
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'manifest'],
        //     minChunks : Infinity
        // })

    ]
};
