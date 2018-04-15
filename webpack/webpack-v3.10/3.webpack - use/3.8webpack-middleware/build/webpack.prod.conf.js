const webpack = require('webpack');
const purifyCss = require('purifycss-webpack');
const htmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const glob = require('glob-all');

module.exports = {
    plugins:[
        new purifyCss({
            paths: glob.sync([
                path.join(__dirname, './*.html'),
                path.join(__dirname, './src/*.js')
            ])
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new htmlInlineChunkPlugin({
            inlineChunks: ['manifest']
        }),

        new cleanWebpackPlugin(['dist']),
        new webpack.optimize.UglifyJsPlugin()
    ]
}