var page = 'subpageB';
import * as _ from 'lodash';

if(page === 'subpageA'){
import(/* webpackChunkName : 'subpageA' */ './SubpageA').then(function (subpageA) {
        console.log(subpageA);
    })
}else if(page === 'subpageB'){
import(/* webpackChunkName : 'subpageB' */ './SubpageB').then(function (subpageB) {
        console.log(subpageB);
    })
}


export default 'pageB';