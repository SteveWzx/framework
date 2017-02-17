<template>
  <div :style="{height: '100%'}">
    <h1>Bar</h1>
    <div id="scratch">
        <div id="card">￥5000000元</div>
    </div>
    <div id="qrcodeDefault"></div>
  </div>
</template>

<script>
import LuckyCard from '../assets/js/lucky-card.min.js'
var qrcode = require('../assets/js/index.js')
export default{
	mounted () {
        LuckyCard.case({
            coverColor: '#d05959',
            ratio: .3
        }, function() {
            alert('至于你信不信，我反正不信！');
            this.clearCover();
        })
        // console.log(qrcode)
        var qrnode = new qrcode({
            text: 'https://www.baidu.com/',
            size: 200,
            image : 'https://t.alipayobjects.com/images/rmsweb/T1ZsxhXdxbXXXXXXXX.png',
            imageSize : 50
        })
        document.getElementById('qrcodeDefault').appendChild(qrnode)
	}
}
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
}

body {
    background: #FFFFFF;
}


</style>