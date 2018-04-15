var path = require('path');
module.exports = {
    entry : {
        'app' : path.resolve(__dirname,'src/app.js')
    },
    output :{
        path : path.resolve(__dirname,'dist/'),
        publicPath : './dist/',
        filename : '[name].bundle.js'
    },
    module:{
        rules:[
            // {
            //     test:/\.less$/,
            //     use : [
            //         {
            //             loader : 'style-loader',
            //             options : {
            //                 // insertInto:'#app',
            //                 singleton : true,
            //                 transform:'./css.transform.js'
            //             }
            //         },
            //         {
            //             loader : 'css-loader',
            //             options :{
            //                 // minimize : true,
            //                 modules:true,
            //                 localIdentName : '[path][name]__[local]--[hash:base64:5]'
            //             }
            //         },
            //         {
            //             loader : 'less-loader'
            //         }
            //     ]
            // }
            {
                test:/\.scss$/,
                use : [
                    {
                        loader : 'style-loader',
                        options : {
                            // insertInto:'#app',
                            singleton : true,
                            transform:'./css.transform.js'
                        }
                    },
                    {
                        loader : 'css-loader',
                        options :{
                            // minimize : true,
                            modules:true,
                            localIdentName : '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader : 'sass-loader'
                    }
                ]
            }
        ]
    }
}