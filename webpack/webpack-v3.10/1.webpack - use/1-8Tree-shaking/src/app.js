/**
 * Created by dongyuanjie.wudi on 2018/3/20.
 */
import base from './css/base.scss';

var app = document.getElementById('app');
app.innerHTML = '<div class="'+base.box+'"></div>';

import { a } from './common/util';

console.log(a());

import {chunk} from 'lodash-es';
console.log(chunk([1, 2, 3, 4], 2));