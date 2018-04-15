var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry : {
        'pageA':path.resolve(__dirname,'pageA'),
        'pageB':path.resolve(__dirname,'pageB'),
        'vendor':[
            'lodash'
        ]
    },
    output:{
        path: path.resolve(__dirname,'./dist'),
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js',
        publicPath : './dist/'
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            async : 'async-common',
            children : true,
            minChunks : 2
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks : Infinity
        })

    ]
};
