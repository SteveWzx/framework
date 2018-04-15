/**
 * Created by dongyuanjie.wudi on 2018/3/20.
 */
import base from './css/base.scss';
import { componentA } from './common/a'

var app = document.getElementById('app');
// app.innerHTML = '<div class="'+base.box+'"></div>';
var list = componentA();
list.className = 'box';
app.appendChild(list);


import { a } from './common/util';

console.log(a());

import {chunk} from 'lodash-es';
console.log(chunk([1, 2, 3, 4], 2));

$(function () {
    console.log(1);
});


$.get('/comments/show',{
    id:"4193586758833502",
    page:1
},function (data) {
    console.log(data);
})

$.get('/msg/index',{
    format :'cards'
},function (data) {
    console.log(data);
})

console.log('hot');

//模块热更新处理代码
if(module.hot){
    module.hot.accept('./common/a',function () {
        app.removeChild(list);

        let componentA = require('./common/a').componentA;
        let newList = componentA();
        app.appendChild(newList);
        list = newList;
    });
}