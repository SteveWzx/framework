/**
 * Created by dongyuanjie.wudi on 2018/3/20.
 */
import base from './css/base.scss';

var app = document.getElementById('app');
// app.innerHTML = '<div class="'+base.box+'"></div>';
var div = document.createElement('div');
div.className = 'box';
app.appendChild(div);


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