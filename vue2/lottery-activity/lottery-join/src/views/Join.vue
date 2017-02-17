<template>
    <section class="bg">
        <div class="jndj pa">
          <img src="https://atths.jzb.com/website/fe/lottery/images/hjndj.png" alt="">
        </div>
        <div class="i-card pa">
        	<img src="https://atths.jzb.com/website/fe/lottery/images/invite.png" alt="">
        </div>
        <div class="i-content pa">
        	<p>来自小明的邀请</p>
        	<p>加入家长帮，</p>
        	<p>立即赠您2016家长帮年度精品课</p>
        	<p>专家名师陪孩子一起成长</p>
        </div>
        <div class="mobile pa">
        	<p class="err-in" :style="{opacity: errShow ? 1 : 0}">* 输入错误请重新输入</p>
        	<input type="mobile" placeholder="输入手机号码接收邀请" maxlength="11" @input="monitorInput" ref="mobile">
        </div>
        <div class="btn j-btn pa" :class="{'init-btn': initBtn}" @click="sumitMobile">
          <span>领取新人红包</span>
        </div>
        <div class="i-rule j-rule pa">
        	<div>仅限新人领取，</div>
        	<div class="d-rule">
        		<p>查看详规则></p>
        	</div>
        </div>
        <div class="verification-code pf" v-show="verificationShow">
        	<div class="vc pa">
        		<ul class="v-in">
        			<li class="pr">
        				<div class="vl pa">验证码</div>
        				<div class="vm">
        					<img src="../assets/imgs/qri.png" alt="">
        				</div>
        				<div class="vr pa"></div>
        				<i></i>
        			</li>
        			<li class="v-wr">
        				<input type="text" placeholder="请输入验证码"  v-model="verificationCode">
        			</li>
        		</ul>
        		<div class="v-btn pa" @click="getVerificationCode">确定</div>
        	</div>
        </div>
    </section>
</template>

<script>
export default{
    data () {
        return {
        	errShow: false,
        	initBtn: true,
        	verificationShow: true,
        	verificationCode: ''
        }
    },
    components: {
    },
    methods:  {
    	monitorInput (event) {
    		this.errShow = false
    		if (event.target.value.length === 11) {
    			this.initBtn = false
    		} else {
    			this.initBtn = true
    		}
    	},
    	sumitMobile (event) {
    		if (!this.initBtn) {
    			let reg = /^\d{11}$/
    			if (reg.test(this.$refs.mobile.value)) {
    				console.log('kkk')
    			} else {
    				this.errShow = true
    			}	
    		}
    	},
    	getVerificationCode () {
    		console.log(this.verificationCode)
    		this.verificationShow = false
    	}
    }
}
</script>

<style>
.i-card {
	z-index: 10;
	width: 90.3%;
	height: 93.9%;
	top: 4%;
	left: 50%;
	margin-left: -45.15%;
}
.i-content {
	width: 90%;
	top: 28%;
	left: 50%;
	margin-left: -45%;
	z-index: 20;
	text-align: center;
	color: #555;
	font-size: 13px;
	font-size: 4.6vmin;
}
.i-content p:first-child {
	color: #bd1d1e;
	font-size: 15px;
	font-size: 4.69vmin;
}
.i-content p:nth-child(2) {
	margin-top: 7%;
}
.i-content p:nth-child(3),
.i-content p:nth-child(4) {
	margin-top: 3.5%;
}
.mobile {
	width: 80%;
	top: 56%;
	left: 50%;
	margin-left: -40%;
	z-index: 20;
}
.err-in {
	color: #e61c1d;
	font-size: 12px;
	font-size: 3.75vmin;
	text-align: center;
	margin-bottom: 5px;
	opacity: 0;
}
input[type='mobile'] {
	width: 100%;
	display: inline-block;
	border: 1px solid #999;
	height: 40px;
	text-align: center;
	font-size: 16px;
	font-size: 5vmin;
}
.init-btn {
	background-color: #b0b0b0;
	border-bottom-color: #929292;
}
.j-btn {
	top: 70%;
	z-index: 20;
}
.j-rule {
	width: 80%;
	left: 50%;
	margin-left: -40%;
	top: 82%;
	z-index: 20;
	text-align: center;
}
.j-rule div {
	display: inline-block;
}
.verification-code {
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	background-color: rgba(51, 51, 51, 0.78);
	z-index: 100;
}
.v-in {
	height: 100%;
}
.v-in div {
	vertical-align: middle;
}
.vc {
	width: 78.1%;
	height: 35.1%;
	left: 50%;
	top: 28%;
	margin-left: -39.05%;
	background-color: #fff;
}
.vc li {
	height: 40%;
	box-sizing: border-box;
	padding-top: 14%;
}
.vc li:nth-of-type(1) {
	border-bottom: 1px solid #e8e8e8;
}
.vc li:nth-of-type(1) div {
	display: inline-block;
}
.v-in {
	box-sizing: border-box;
	padding: 0 20px;
}
.vl {
	top: 46%;
	left: 0px;
	width: 25%;
	color: #000;
	font-size: 15px;
}
.vm {
	margin-left: 34%;
	width: 66px;
	height: 36px;
}
.v-in .vr {
	top: 40%;
	right: 0px;
	width: 22px;
	height: 27px;
	background-image: url('../assets/imgs/i1.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.vc .v-wr {
	padding-top: 0px;
}
.v-wr input {
	height: 100%;
	outline: none;
	font-size: 16px;
}
.v-btn {
	height: 20%;
	padding-top: 3%;
	background-color: #d44100;
	text-align: center;
	color: #fff;
	font-size: 18px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	box-sizing: border-box;
}
</style>



