var page = 'subpageA';
import * as _ from 'lodash';

if(page === 'subpageA'){
    import(/* webpackChunkNam : 'subpageA' */ './SubpageA').then(function (subpageA) {
        console.log(subpageA);
    })
}else if(page === 'subpageB'){
    import(/* webpackChunkNam : 'subpageB' */ './SubpageB').then(function (subpageB) {
        console.log(subpageB);
    })
}


export default 'pageA';