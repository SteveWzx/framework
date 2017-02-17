<template>
	<section class="obg pr">
		<div class="ojndj pa zoomInDown">
			<img src="https://atths.jzb.com/website/fe/lottery/images/ojndj.png" alt="">
		</div>
		<div class="qr pa" ref="qr">
			<p>我的专属二维码</p>
			<div id="qrcodeDefault" ref="qrCode"></div>
			<p>邀请好友扫一扫 领取春节大礼包</p>
		</div>
		<div class="btn i-btn pa" @click="shareToFriend" ref="ibtn">
		  	<span>发送给好友</span>
		</div>
		<div class="i-rule pa">
			<p>* 分享本页，即获得2个元宝</p>
			<p>* 邀请好友后，双方都将获取奖励礼包</p>
			<div class="d-rule">
				<p @click="linkToIntro">查看详细奖品规则></p>
			</div>
		</div>
	</section>
</template>

<script>
var qrCode = require('../assets/js/index.js')
export default{
    data () {
        return{
        }
    },
    methods: {
    	shareToFriend () {
    		let content = this
    		let uidKey = 'uk' + this.$store.state.user.id
    		window.JzbBridge.ready(function(api){
		      	api.share(content.$store.state.user.qr, 'https://atths.jzb.com/website/fe/pub_images/logo160.png?v=1', "鸡年贺新春！送你家长帮春节红包，快来领吧", "家长的问题@家长帮", '1,0,1,0,1')
		      	if (content.getStorage(uidKey)) {
		      		// let key = content.getUserIdentityKey()
		      		// content.$http.jsonp(`${window.mDomain}/event/reward/share${key}`).then((response) => {
		      		// 	let data = response.data
		      		// 	content.setStorage(uidKey, {
		      		// 		id: content.$store.state.user.id
		      		// 	})
		      		// })
		      	}
		      	window.gaFn('我的邀请码页 - 发送给好友')
		      	content.$http.jsonp(`${window.mDomain}/event/reward/share${content.getUserIdentityKey()}`).then((response) => {
		      		let data = response.data
		      		content.setStorage(uidKey, {
		      			id: content.$store.state.user.id
		      		})
		      	})
		   	})
    	},
    	setStorage: (key, obj) => {
    	    localStorage.setItem(key, JSON.stringify(obj));
		},
		getStorage: (key) => {
		   return JSON.parse(localStorage.getItem(key));
		},
    	getCookie (name) {
    	    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    	    if(arr=document.cookie.match(reg)) {
    	        return unescape(arr[2])
    	    } else {
    	        return null
    	    }
    	},
    	getUserIdentityKey () {
    	  let key = this.getCookie('api_key')
    	  if (!key) {
    	      key = window.userKey
    	  } else {
            key = '?api_key=' + encodeURIComponent(key)
          }
    	  return key
    	},
    	linkToIntro () {
    	  window.JzbBridge.ready(function(api){
    	    api.threadsDetail("4923235", '1')
    	  })
    	}
    },
    mounted () {
    	window.gaFn('我的邀请码页')
    	let winHeight = document.documentElement.clientHeight || document.body.clientHeight
    	let qrEle = this.$refs.qrCode
    	let boxHeight = qrEle.clientHeight
    	let logoUrl = 'https://atths.jzb.com/website/fe/pub_images/logo.png'
    	let logoSize = 40
    	let qrNode = new qrCode({
    	    text: this.$store.state.user.qr,
    	    size: boxHeight - 10,
    	    image : logoUrl,
    	    imageSize : logoSize
    	})
    	qrEle.style.height = boxHeight - 10 + 'px'
    	qrEle.style.width = boxHeight - 10 + 'px'
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
	height: 31.5%;
	top: 27%;
	color: #665c3f;
	font-size: 13px;
	font-size: 4.06vmin;
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
    height: 76%;
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
	font-size: 4.06vmin;
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
	color: #d44201;
	text-decoration: underline;
}
</style>


