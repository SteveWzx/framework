const webpack = require('webpack')
const proxy = require('./proxy')
const historyfallback = require('./historyfallback')

module.exports = {
    devtool: 'cheap-module-source-map',
    devServer: {
        // inline:false, // iframe模式
        port: 9001,
        overlay: true,
        // historyApiFallback:true
        historyApiFallback: historyfallback,
        proxy:proxy,
        hot: true,
        hotOnly: true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}