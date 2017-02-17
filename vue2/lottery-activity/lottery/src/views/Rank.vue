<template>
    <section style="height: 100%" class="pr">
       	<header class="header pa">
       	</header>
       	<div class="ojndj pa zoomInDown">
       		<img src="https://atths.jzb.com/website/fe/lottery/images/ojndj.png" alt="">
       	</div>
       	<div class="r-title pa">
       		<img src="https://atths.jzb.com/website/fe/lottery/images/f3.png" alt="">
       	</div>
       	<div class="r-b pa">
       		<img src="https://atths.jzb.com/website/fe/lottery/images/f5.png" alt="">
       	</div>
       	<div class="r-content pa">
			<dl class="r-p">
				<dt>
					<span class="rc-l fl fc">用户名</span>
					<span class="rc-r fr fc">邀请人数</span>
				</dt>
				<dd  v-for="item in rankList">
					<span class="rc-l fl">{{ item.username }}</span>
					<span class="rc-r fr">{{ item.invite_count }}人</span>
				</dd>
			</dl>
			<dl class="r-r">
				<dt>
					<span></span>
					<span class="fc">&nbsp;排行榜奖励：</span>
				</dt>
				<dd>
					1、活动截止到2月7日12:00结束，结束时排行榜第一名获得乐视50寸电视机一台。
				</dd>
				<dd>
					2、如果出现并列排名，根据成功邀请第一名用户的时间决定，仅发送一人奖品。
				</dd>
				<dd>
					3、邀请人数不足50人时，视为活动失效。
				</dd>
				<dd>
					4、本活动最终解释权归家长帮所有。
				</dd>
			</dl>
       	</div>
    </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default{
    data () {
        return {
        	rankList: []
        }
    },
    methods: {
    	...mapMutations([
    	    'pushLoadStack',
    	    'completeLoad'
    	]),
    	requestData (url, fn) {
    	    this.pushLoadStack()
    	    this.$http.get(url).then(fn).then(this.completeLoad)
    	},
    },
    created () {
    	window.gaFn('邀请排行榜页')
    	this.requestData(`/activity/ranking/${window.userKey}`, (response) => {
    		let data = response.data
    		if (data.errcode === 0) {
    			this.rankList = data.objects 
    		} else {
    			alert(data.errmsg)
    		}
    	})
    }
}
</script>

<style>
.header {
	top: 0px;
	left: 0px;
	width: 100%;
	height: 37.8%;
	background-image: url('https://atths.jzb.com/website/fe/lottery/images/ohead.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.r-title {
	width: 40%;
	height: 4.1%;
	left: 50%;
	top: 26%;
	margin-left: -20%;
	z-index: 10;
}
.r-b {
	width: 85.6%;
	height: 4.1%;
	left: 50%;
	top: 32%;
	margin-left: -42.8%;
	z-index: 10;
}
.r-content {
	width: 100%;
	min-height: 62.2%;
	top: 37.8%;
	background-image: url('https://atths.jzb.com/website/fe/lottery/images/lbg.png');
	background-repeat-y: repeat;
	background-size: 100%;
}
.r-p dt,
.r-p dd {
	font-size: 13px;
	font-size: 4.06vmin;
	height: 40px;
	height: 12.5vmin;
	line-height: 40px;
	line-height: 12.5vmin;
	padding: 0 20px;
	box-sizing: border-box;
	background-image: -webkit-linear-gradient(bottom, #ecbe3a, #ecbe3a 100%);
	background-image: linear-gradient(0deg, #ecbe3a, #ecbe3a 100%);
	background-size: 100% 1px;
	background-repeat: no-repeat;
	background-position: bottom;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .r-p dt,
    .r-p dd {
        background-image: -webkit-linear-gradient(bottom, #ecbe3a, #ecbe3a 50%, transparent 50%);
        background-image: linear-gradient(0deg, #ecbe3a, #ecbe3a 50%, transparent 50%);
        background-size: 100% 1px;
        background-repeat: no-repeat;
        background-position: bottom;
    }
}
.rc-l,
.rc-r {
	color: #555;
	display: inline-block;
	width: 48%;
	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
span.fc {
  color: #d44201;
}
.r-r {
	padding: 7% 10%;
	box-sizing: border-box;
	font-size: 13px;
	font-size: 4.06vmin;
	color: #555;
	line-height: 20px;
	line-height: 6.35vmin;
}
.r-r dt {
	margin-bottom: 5%;
}
.r-r dt span {
	font-size: 15px;
	font-size: 4.69vmin;
	display: inline-block;
	vertical-align: middle;
}
.r-r dt span:first-child {
	border-left: 7px solid #c11d20;
	border-right: 0px;
	border-top: 4px solid transparent;
	border-bottom: 4px solid transparent;
}
</style>



