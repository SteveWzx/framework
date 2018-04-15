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
            //     test:/\.css$/,
            //     use : [
            //         {
            //             loader : 'style-loader'
            //         },
            //         {
            //             loader : 'css-loader'
            //         }
            //     ]
            // },

            // {
            //     test:/\.css$/,
            //     use : [
            //         {
            //             loader : 'style-loader/url'
            //         },
            //         {
            //             loader : 'file-loader'
            //         }
            //     ]
            // }

            // {
            //     test:/\.css$/,
            //     use : [
            //         {
            //             loader : 'style-loader/useable'
            //         },
            //         {
            //             loader : 'css-loader'
            //         }
            //     ]
            // }

            {
                test:/\.css$/,
                use : [
                    {
                        loader : 'style-loader',
                        options : {
                            insertInto:'#app',
                            singleton : true,
                            transform:'./css.transform.js'
                        }
                    },
                    {
                        loader : 'css-loader'
                    }
                ]
            }
        ]
    }
}