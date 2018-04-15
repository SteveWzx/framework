// es6 module
import  sum from  './sum';

// commonjs
var minus = require('./minus');

// amd
require(['./mut'],function (mut) {
    console.log(mut(2, 3));
});

console.log(sum(2, 5));
console.log(minus(5,1));