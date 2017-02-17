<template>
	<section class="obg pr">
		<div class="ojndj pa zoomInDown">
			<img src="https://atths.jzb.com/website/fe/lottery/images/ojndj.png" alt="">
		</div>
		<div class="qr pa">
			<p>我的专属二维码</p>
			<div id="qrcodeDefault" ref="qrCode"></div>
			<p>扫一扫 领取春节大礼包</p>
		</div>
		<div class="btn i-btn pa">
		  <span>发送给好友</span>
		</div>
		<div class="i-rule pa">
			<p>* 分享本页，即获得2个元宝</p>
			<p>* 邀请好友后，双方都将获取奖励礼包</p>
			<div class="d-rule">
				<p>查看详细奖品规则></p>
			</div>
			
		</div>
	</section>
</template>

<script>
var qrCode = require('../assets/js/index.js')
export default{
    data(){
        return{

        }
    },
    components:{

    },
    mounted () {
    	let qrEle = this.$refs.qrCode
    	let qrNode = new qrCode({
    	    text: 'https://www.baidu.com/',
    	    size: qrEle.clientWidth - 10,
    	    image : 'https://atths.jzb.com/website/fe/pub_images/logo.png',
    	    imageSize : 50
    	})
    	qrEle.style.height = qrEle.clientWidth - 10 + 'px'
    	qrEle.appendChild(qrNode)
	}
}
</script>

<style>
.obg {
	width: 100%;
	height: 100%;
	background-image: url('https://atths.jzb.com/website/fe/lottery/images/obg.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.ojndj {
	width: 53.1%;
	height: 13.4%;
	left: 50%;
	margin-left: -26.05%;
	top: 5%;
}
.qr {
	text-align: center;
	width: 100%;
	top: 27%;
	color: #665c3f;
	font-size: 13px;
	font-size: 4.6vmin;
}
.i-btn {
	top: 65%;
}
#card {
    height: 100%;
    font-weight: bold;
    font-size: 30px;
    line-height: 100px;
    text-align: center;
    background: #FAFAFA;
}
#scratch {
    width: 200px;
    height: 100px;
    margin: 50px auto 0;
    border: 1px solid #ccc;
}
#qrcodeDefault {
    width: 40.6%;
    height: 40.6%;
    margin: 7px auto;
    background-color: #fff;
    padding: 5px;
}
.i-rule {
	width: 80%;
	left: 50%;
	top: 78%;
	margin-left: -40%;
	color: #665c3f;
	font-size: 13px;
	font-size: 4.6vmin;
}
.i-rule p:nth-child(2) {
	margin-top: 4%;
}
.d-rule {
	margin-top: 2%;
	padding-left: 3.2%;
	box-sizing: border-box;
}
.d-rule p{
	text-decoration: underline;
}
</style>


