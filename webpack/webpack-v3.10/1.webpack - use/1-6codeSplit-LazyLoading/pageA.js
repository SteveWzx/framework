
// import './SubpageA';
// import './SubpageB';

require.include('./moduleA'); //

var page = 'subpageA';

// if(page === 'subpageA'){
//     require.ensure(['./SubpageA'],function () {
//         var subpageA = require('./SubpageA')
//     },'subpageA')
// }else if(page === 'subpageB'){
//     require.ensure(['./SubpageB'],function () {
//         // var subpageB = require('./SubpageB')
//     },'subpageB')
// }

if(page === 'subpageA'){
    import(/* webpackChunkNam : 'subpageA' */ './SubpageA').then(function (subpageA) {
        console.log(subpageA);
    })
}else if(page === 'subpageB'){
    import(/* webpackChunkNam : 'subpageB' */ './SubpageB').then(function (subpageB) {
        console.log(subpageB);
    })
}


require.ensure(['lodash'],function () {
    var _ = require('lodash');
    _.join([1,2],3);

},'vendor')

export default 'pageA';