<template>
    <section style="height: 100%" class="pr">
    	<header class="header pa">
    	</header>
    	<div class="ojndj pa zoomInDown">
    		<img src="https://atths.jzb.com/website/fe/lottery/images/ojndj.png" alt="">
    	</div>
    	<div class="r-title pa">
    		<img src="https://atths.jzb.com/website/fe/lottery/images/f2.png" alt="">
    	</div>
    	<div class="m-b pa" v-show="hasData">邀请人数：{{ invite_success }}（等待注册{{ invite_total - invite_success }}人）</div>
       	<div class="r-content pa" v-if="hasData">
       		<div>
       			<dl class="r-p m-p">
       				<dt class="fc">
       					<span v-show="invite_rank != -1">全站排名：</span>
       					<span v-show="invite_rank != -1">{{ invite_rank }}</span>
                        <span v-show="invite_rank === -1" style="    text-decoration: none;">未进入排行榜</span>
       					<span>
                            <router-link to="rank" style="display: inline">
                            &nbsp;查看排行榜 >
                            </router-link>
                        </span>
       				</dt>
       				<dd v-for="item in inviteList">
       					<span class="rc-l fl">{{ item.mobile.replace(/^(\d{3})\d{4}(\d{4})$/, (r, r1, r2) => (r1 + '****' + r2))}}</span>
       					<span class="rc-r fr">&nbsp;&nbsp;{{ item.enable ? '已注册' : '等待注册'}}</span>
       				</dd>
       			</dl>
       			<div class="sel-page fc">
       				<span class="fl" v-show="prevPageShow" @click="prevPage">上一页</span>
       				<span class="fr" v-show="nextPageShow" @click="nextPage">下一页</span>
       			</div>
       		</div>
       		<div>
       			<dl class="r-p r-r m-r">
       				<dt>
       					<span></span>
       					<span class="fc">&nbsp;已领取奖品：</span>
       				</dt>
       				<dd v-for="item in reslist">
       					<span class="rc-l fl">{{ item.rname }}</span>
       					<span class="rc-r fr" :class="{'jumb-to-scratch': !+item.ifget}" :logid="item.logid">&nbsp;&nbsp;{{ !+item.ifget ? '前往刮奖' : '已中奖'}}</span>
       				</dd>
       			</dl>
       		</div>
       		<div class="m-btn" v-if="isGift">
       			<p>你还剩{{ rtimes }}次抽奖机会</p>
                <div @click="linkToScratchPage">立即领奖</div>
       		</div>
       		<div class="m-btn" v-else>
                <p v-show="invite_success === 0">好友使用App注册成功后，将获得抽奖资格</p>
                <p v-show="invite_success === 1">再邀请1个人，即可进行抽奖</p>
       			<p v-show="invite_success > 1">抽奖机会已用完，每邀请1人可获1次抽奖资格</p>
       			<div @click="shareToFriend">立即邀请</div>
       		</div>
            <div class="m-btn pa" style="bottom: 0; width: 100%" v-show="isend">
                <p style="opacity: 0">抽奖机会已用完，每邀请1人可获1次抽奖资格</p>
                <div class="is-end">活动已结束</div>
            </div>
       	</div>
       	<div class="r-content pa" v-else>
       		<div class="n-img">
       			<img src="https://atths.jzb.com/website/fe/lottery/images/ndata.png" alt="">
       			<p>还没邀请任何人</p>
       		</div>
       		<div class="m-btn pa" style="bottom: 0; width: 100%">
       			<p style="opacity: 0">抽奖机会已用完，每邀请1人可获1次抽奖资格</p>
       			<div @click="shareToFriend">立即邀请</div>
       		</div>
            <div class="m-btn pa" style="bottom: 0; width: 100%" v-show="isend">
                <p style="opacity: 0">抽奖机会已用完，每邀请1人可获1次抽奖资格</p>
                <div class="is-end">活动已结束</div>
            </div>
       	</div>
    </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default{
    data () {
        return {
        	hasData: true,
        	isGift: false,
            rtimes: 0,
            limit: 5,
            offset: 0,
            total: 0,
            invite_total: 0,
            invite_success: 0,
            invite_rank: -1,
            prevPageShow: false,
            nextPageShow: false,
            inviteList: [],
            reslist: [],
            isend: 0
        }
    },
    methods: {
        ...mapMutations([
            'pushLoadStack',
            'completeLoad',
            'getUserRtimes'
        ]),
        requestData (url, fn) {
            this.pushLoadStack()
            this.$http.get(url).then(fn).then(this.completeLoad)
        },
        getInviteList (limit, offset) {
            let hashFlag = '&'
            if (window.userKey === '') {
                hashFlag = '?&'
            }
            this.requestData(`/activity/relation/${window.userKey}${hashFlag}limit=${limit}&offset=${offset}`, (response) => {
                let data = response.data
                this.total = data.meta.total
                this.invite_success = data.meta.invite_success
                this.invite_rank = data.meta.invite_rank
                this.invite_total = data.meta.invite_total
                this.inviteList = data.objects
                if (this.total === 0) {
                    this.hasData = false
                }
                if (this.offset + this.limit >= this.total) {
                    this.nextPageShow = false
                } else {
                    this.nextPageShow = true
                }
                if (this.offset - this.limit < 0) {
                    this.prevPageShow = false
                } else {
                    this.prevPageShow = true
                }
            })
        },
        prevPage () {
            this.offset = this.offset - this.limit
            this.getInviteList(this.limit, this.offset)
        },
        nextPage () {
            this.offset = this.limit + this.offset
            this.getInviteList(this.limit, this.offset)
        },
        linkToScratchPage () {
            window.gaFn('我的奖品页 - 立即刮奖')
            this.$router.push('/scratch')
        },
        shareToFriend () {
            let content = this
            let uidKey = 'uk' + this.$store.state.user.id
            window.JzbBridge.ready(function(api){
                api.share(content.$store.state.user.qr, 'https://atths.jzb.com/website/fe/pub_images/logo160.png', '鸡年贺新春！送你家长帮春节红包，快来领吧', '家长的问题@家长帮', '1,0,1,0,1')
                content.$http.jsonp(`${window.mDomain}/event/reward/share${content.getUserIdentityKey()}`).then((response) => {
                    let data = response.data
                    content.setStorage(uidKey, {
                        id: content.$store.state.user.id
                    })
                })
                window.gaFn('我的奖品页 - 立即邀请')
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
        }
    },
    created () {
        window.gaFn('我的奖品页')
        this.pushLoadStack()
        this.$http.jsonp(`${window.mDomain}/event/reward/result${this.getUserIdentityKey()}`).then((response) => {
            this.completeLoad()
            let data = response.data
            this.isend = data.isend
            this.reslist = data.reslist
            this.rtimes = data.rtimes
            this.rtimes > 0 ? this.isGift = true : this.isGift = false
            this.getUserRtimes({ rtimes: this.rtimes})
            this.$nextTick(() => {
                let eles = this.$el.querySelectorAll('.jumb-to-scratch')
                Array.prototype.forEach.call(eles, (item) => {
                    item.addEventListener('click', (event) => {
                        let logid = event.target.getAttribute('logid')
                        this.$router.push('/scratch?logid=' + logid)
                    })
                })
            })
        })
        this.getInviteList(this.limit, this.offset)
    }
}
</script>

<style>
a {
    color: #d44201;
    font-size: 13px;
    font-size: 4.06vmin;
    text-decoration: underline;
}
.jumb-to-scratch {
    color: #d44201;
}
.m-b {
	font-size: 13px;
	font-size: 4.06vmin;
	width: 72.8%;
	height: 6.4%;
	top: 35%;
	left: 50%;
	margin-left: -36.4%;
	color: #fff;
	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	z-index: 10;
	background-image: url('https://atths.jzb.com/website/fe/lottery/images/fobg.png');
	background-repeat: no-repeat;
	background-size: 100%;
	padding-top: 1.6%;
	box-sizing: border-box;
}
.m-p {
	color: #555;
}
.m-p dt {
	text-align: center;
	font-size: 13px;
	font-size: 4.06vmin;
	height: 60px;
	height: 18.75vmin;
	line-height: 50px;
	line-height: 15.62vmin;
}
.m-p dt span:nth-child(2) {
	font-size: 20px;
	font-size: 6.25vmin;
}
.m-p dt span:nth-child(3) {
	text-decoration: underline;
}
.sel-page {
	height: 20px;
	height: 6.25vmin;
	margin-top: 5%;
	padding: 0px 18%; 
}
.sel-page span {
	font-size: 15px;
	font-size: 4.26vmin;
	text-decoration: underline;
	box-sizing: border-box;
}
.m-r {
	margin-top: 5%;
	padding: 0px;
}
.m-r dt {
	margin-bottom: 0;
}
.m-btn {
	height: 100px;
	height: 31.25vmin;
	background-color: #f1cb5e;
	margin-top: 30px;
	margin-top: 9.375vmin;
	padding-top: 6%;
	box-sizing: border-box;
}
.m-btn p {
	color: #555;
	font-size: 13px;
	font-size: 4.06vmin;
	text-align: center;
	margin-bottom: 3%;
}
.m-btn div {
	margin-top: 8%;
	width: 255px;
	width: 79.69vmin;
	height: 40px;
	height: 11vmin;
	line-height: 40px;
	line-height: 11vmin;
	background-color: #d44100;
	margin: 5px auto;
	text-align: center;
	color: #fff;
	border-radius: 3px;
	font-size: 18px;
	font-size: 5.625vmin;
	border-bottom: 2px solid #ad3500;
}
.n-img img {
	width: 19.7%;
	height: auto;
	margin: 15px auto;
	display: block;
}
.n-img p {
	color: #555;
	font-size: 13px;
	font-size: 4.06vmin;
	text-align: center;
}
.m-btn .is-end {
    background-color: #b0b0b0;
    border-bottom-color: #929292;
}
</style>
