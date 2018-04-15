module.exports = function (css) {
    console.log(css);
    console.log(window.innerWidth);
    if(window.innerWidth < 768){
       return css.replace('pink','green')
    }else {
        return css.replace('pink','orange')
    }
    // return css;
}
