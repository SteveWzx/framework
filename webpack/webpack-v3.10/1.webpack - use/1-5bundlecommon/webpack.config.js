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
        filename:'[name].[hash:5].bundle.js',
        chunkFilename:'[name].chunk.js'
    },
    plugins:[
        // 提取common
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks : 2
        // })


        // vendor 分离
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks : Infinity
        // })


        // vendor 以及 webpack  分离
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks : Infinity
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     minChunks : Infinity
        // })


        // 提取vendor ,common ,以及webpack 分离
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks : 2,
        //     chunks : ['pageA','pageB']
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks : Infinity
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     minChunks : Infinity
        // })

        // 提取vendor ,common ,以及webpack 分离  使用names
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks : 2,
            chunks : ['pageA','pageB']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks : Infinity
        })
    ]
};
