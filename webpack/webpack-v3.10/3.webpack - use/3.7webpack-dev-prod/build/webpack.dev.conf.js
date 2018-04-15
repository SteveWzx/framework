const webpack = require('webpack')
module.exports = {
    devtool: 'cheap-module-source-map',
    devServer: {
        // inline:false, // iframe模式
        port: 9001,
        overlay: true,
        // historyApiFallback:true
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
                    to: function (context) {
                        return '/' + context.match[1] + context.match[2] + '.html'
                    }
                }
            ]
        },
        proxy: {
            '/': {
                target: "https://m.weibo.cn",
                changeOrigin: true,
                logLevel: "debug",
                pathRewrite: {
                    '^/comments': '/api/comments'
                },
                headers: {
                    'Cookie': "_T_WM=5b42533032269b3a63c9c29a6d80f58a; ALF=1524643702; SCF=AkxXZqi13fXur8L0U-TKT7oScxEQzvSGXIkbsxEAjTQQa3fPtBAyvecYthGY27W3wsRT1b8WrMUeYiG32CnwzV4.; SUB=_2A253vNoDDeRhGeNN7FAY9S_FwzuIHXVVXuZLrDV6PUJbktANLRjukW1NSYw6R2OzEZKK1A7LCM_iZE2s0n36OR1D; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WW5iuwzFW8On-gndcq_Ny7u5JpX5K-hUgL.Fo-0S0z4SK241hM2dJLoI0qLxKnL1K2LBKeLxKnLBo2L1hqLxKnLBo2L1hqLxKML1-2L1hBLxKMLBKML12zLxK-LBKBLBK.t; SUHB=0rrr72uEFZRxXL; SSOLoginState=1522051704; M_WEIBOCN_PARAMS=oid%3D4221822696396734%26luicode%3D10000011%26lfid%3D1005055372951987%252Fhome%26uicode%3D20000174; H5_INDEX=3; H5_INDEX_TITLE=%E8%91%A3%E8%B1%86%E8%B1%86%E7%9A%84%E7%A7%8B%E5%A4%A9"
                }
            }
        },
        hot: true,
        hotOnly: true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}