// webpack 中打包不同的规范的模块
module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: '[name].[hash:5].js'
    }
}