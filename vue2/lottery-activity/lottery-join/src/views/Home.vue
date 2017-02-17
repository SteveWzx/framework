<template>
    <section class="bg">
        <div class="" style="display: none">
          <img src="https://atths.jzb.com/website/fe/lottery/images/logo300.png" alt="">
        </div>
        <div class="jndj pa">
          <img src="https://atths.jzb.com/website/fe/lottery/images/hjndj.png" alt="">
        </div>
        <div class="i-card pa">
          <img src="https://atths.jzb.com/website/fe/lottery/images/invite.png" alt="">
        </div>
        <div class="i-content pa">
          <p>来自{{ username }}的邀请</p>
          <p>加入家长帮，</p>
          <p>立即赠您2016家长帮年度精品课</p>
          <p>专家名师陪孩子一起成长</p>
        </div>
        <div class="mobile pa">
          <p class="err-in" :style="{opacity: errShow ? 1 : 0}">* {{ errMsg }}</p>
          <input type="number" pattern="\d*" placeholder="输入手机号码接收邀请" maxlength="11" @input="monitorInput" ref="mobile" v-model="mobile" @focus="handleFocus" @blur="handleBlur">
        </div>
        <div class="btn j-btn pa" :class="{'init-btn': initBtn}" @click="sumitMobile">
          <span>领取新人红包</span>
        </div>
        <div class="i-rule j-rule pa">
          <div>仅限新人领取，</div>
          <div class="d-rule">
            <a href="http://jzb.com/bbs/thread-4923235-1-1.html"><p>查看详规则></p></a>
          </div>
        </div>
        <div class="verification-code pf" v-show="verificationShow">
          <div class="vc pa">
            <ul class="v-in">
              <li class="pr">
                <div class="vl pa">验证码</div>
                <div class="vm">
                  <img :src="qrImg" alt="">
                </div>
                <div class="vr pa" @click="refreshVerificationCode"></div>
                <i></i>
              </li>
              <li class="v-wr">
                <input type="number" pattern="\d*" placeholder="请输入验证码"  v-model="verificationCode">
              </li>
            </ul>
            <div class="v-btn pa" @click="getVerificationCode">确定</div>
          </div>
        </div>
    </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default{
    data () {
        return {
          username: '朋友',
          errShow: false,
          errMsg: '输入错误请重新输入',
          initBtn: true,
          mobile: '',
          verificationShow: true,
          verificationCode: '',
          firstTime: true,
          sendData: {},
          qrImg: ''
        }
    },
    methods:  {
      ...mapMutations([
        'pushLoadStack',
        'completeLoad'
      ]),
      handleFocus () {
        if (/iPhone OS 7/.test(navigator.userAgent) || /iPhone OS 8/.test(navigator.userAgent)) {
          document.body.scrollTop = 50
          document.documentElement.scrollTop = 50
        }
      },
      handleBlur () {
        if (/iPhone OS 7/.test(navigator.userAgent) || /iPhone OS 8/.test(navigator.userAgent)) {
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
        }
      },
      monitorInput (event) {
        this.errShow = false
        if (event.target.value.length > 11) {
          let arr = this.mobile.toString().split('')
          arr.pop()
          this.mobile = arr.join('')
          return 
        }
        if (event.target.value.length === 11) {
            this.errMsg = '输入错误请重新输入'
            this.initBtn = false
        } else {
            this.initBtn = true
        }
      },
      sumitMobile (event) {
        if (!this.initBtn) {
            let reg = /^\d{11}$/
            let idReg = /invite\/(\d*)/
            let id = ''
            let sendData = {}
            if (reg.test(this.mobile)) {
                if (idReg.test(window.location)) {
                    id = idReg.exec(window.location)[1]
                } else {
                    id = '3945445'  //开发测试
                }
                sendData.mobile = this.mobile
                sendData.user_id = id
                sendData.code = ''
                if (this.firstTime) {
                    this.sumitRequest(sendData)
                } else {
                    this.refreshVerificationCode()
                    this.sendData = sendData
                    this.verificationShow = true
                }
            } else {
                this.errShow = true
            } 
        }
      },
      sumitRequest (sendData) {
        this.$http({
          method: 'POST',
          url: '/activity/relation/new/',
          body: {
              mobile: sendData.mobile.toString(),
              user_id: sendData.user_id,
              code: sendData.code.toString()
          }
        }).then((response) => {
            let data = response.data
            // console.log(data)
            if (data.errcode === 0) {
                window.gaFn('邀请页 - 领取新人红包')
                window.location = `https://api.jzb.com/webapp/app/index?url=${window.index_url}`
            } else {
                this.firstTime = false
                this.errMsg = data.errmsg
                this.verificationCode = ''
                this.errShow = true
            }
        })

      },
      refreshVerificationCode () {
        this.$http.get('/activity/checkcode/').then((response) => {
            let data = response.data
            if (data.errcode === 0) {
                this.qrImg = data.objects.src
            } else {
                alert(data.errmsg)
            }
        })
      },
      getVerificationCode () {
        this.sendData.code = this.verificationCode
        this.sumitRequest(this.sendData)
        this.verificationShow = false
      }
    },
    created () {
        this.username = window.username
        this.$http.get('/activity/invite/check_need_verify/').then((response) => {
            let data = response.data
            if (data.errcode === 0) {
                this.firstTime = !data.objects.need_verify
            } else {
                alert(data.errmsg)
            }
        })
    },
    mounted () {
      window.gaFn('邀请页')
      this.pushLoadStack()
      this.$el.style.height = this.$el.clientHeight + 'px'
      let eles = this.$el.getElementsByTagName('*')
      for (let i = 0; i < eles.length; i++) {
        eles[i].style.top = eles[i].offsetTop + 'px'
        eles[i].style.height = eles[i].clientHeight + 'px'
      }
      this.verificationShow = false
      this.completeLoad()
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
  /*font-size: 4.06vmin;*/
}
.i-content p:first-child {
  color: #bd1d1e;
  font-size: 15px;
  /*font-size: 4.69vmin;*/
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
  /*font-size: 3.75vmin;*/
  text-align: center;
  margin-bottom: 5px;
  opacity: 0;
}
input[type='number'] {
  width: 100%;
  display: inline-block;
  border: 1px solid #999;
  height: 40px;
  text-align: center;
  font-size: 16px;
  /*font-size: 5vmin;*/
}
.bg .init-btn {
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
.d-rule p {
  text-decoration: underline;
  color: #d44201;
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
  border: 0px;
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

img {
  width: 100%;
  height: 100%;
}
.bg {
  width: 100%;
  height: 100%;
  background-image: url('https://atths.jzb.com/website/fe/lottery/images/hbg.png?v=1');
  background-repeat: no-repeat;
  background-size: 100% 100%; 
}
.view {
  height: 100%;
  overflow: hidden;
}
.jndj {
  width: 38.2%;
  height: 37.4%;
  left: 50%;
  margin-left: -19.1%;
  top: 2%;
}
.hjzb {
  width: 75.6%;
  height: 11.9%;
  left: 50%;
  margin-left: -37.8%;
  top: 46.5%;
}
.prize {
  width: 64.5%;
  height: 16%;
  left: 50%;
  margin-left: -32.25%;
  top: 60%;
}
.btn {
  width: 80%;
  height: 9.1%;
  left: 50%;
  margin-left: -40%;
  text-align: center;
  background-color: #d44100;
  border-radius: 5px;
  display: inline-block;
  box-sizing: border-box;
  padding-top: 4.5%;
  color: #fff;
  font-size: 18px;
  /*font-size: 5.625vmin;*/
  border-bottom: 2px solid #ad3500;
}
.h-btn {
   top: 79%;
}
.h-nav {
  width: 80%;
  left: 50%;
  margin-left: -40%;
  top: 92%;
}
.h-nav span {
  color: #d44201;
  font-size: 13px;
  /*font-size: 4.06vmin;*/
}
@-webkit-keyframes zoomIn {
    0% {
        opacity: 0;
        -webkit-transform: scale(.3);
        transform: scale(.3)
    }
    50% {
        opacity: 1
    }
}

@keyframes zoomIn {
    0% {
        opacity: 0;
        -webkit-transform: scale(.3);
        -ms-transform: scale(.3);
        transform: scale(.3)
    }
    50% {
        opacity: 1
    }
}

.zoomIn {
    -webkit-animation: zoomIn .7s;
    animation: zoomIn .7s;
}

@-webkit-keyframes zoomInDown {
    0% {
        opacity: 0;
        -webkit-transform: scale(.1) translateY(-2000px);
        transform: scale(.1) translateY(-2000px);
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out
    }
    60% {
        opacity: 1;
        -webkit-transform: scale(.475) translateY(60px);
        transform: scale(.475) translateY(60px);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out
    }
}

@keyframes zoomInDown {
    0% {
        opacity: 0;
        -webkit-transform: scale(.1) translateY(-2000px);
        -ms-transform: scale(.1) translateY(-2000px);
        transform: scale(.1) translateY(-2000px);
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out
    }
    60% {
        opacity: 1;
        -webkit-transform: scale(.475) translateY(60px);
        -ms-transform: scale(.475) translateY(60px);
        transform: scale(.475) translateY(60px);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out
    }
}

.zoomInDown {
    -webkit-animation: zoomInDown .9s;
    animation: zoomInDown .9s;
}

@-webkit-keyframes bounceInUp {
    0% {
        opacity: 0;
        -webkit-transform: translateY(2000px);
        transform: translateY(2000px)
    }
    60% {
        opacity: 1;
        -webkit-transform: translateY(-30px);
        transform: translateY(-30px)
    }
    80% {
        -webkit-transform: translateY(10px);
        transform: translateY(10px)
    }
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0)
    }
}

@keyframes bounceInUp {
    0% {
        opacity: 0;
        -webkit-transform: translateY(2000px);
        -ms-transform: translateY(2000px);
        transform: translateY(2000px)
    }
    60% {
        opacity: 1;
        -webkit-transform: translateY(-30px);
        -ms-transform: translateY(-30px);
        transform: translateY(-30px)
    }
    80% {
        -webkit-transform: translateY(10px);
        -ms-transform: translateY(10px);
        transform: translateY(10px)
    }
    100% {
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0)
    }
}

.bounceInUp {
    -webkit-animation: bounceInUp .7s;
    animation: bounceInUp .7s;
}

@-webkit-keyframes flash {
    0%,
    100%,
    50% {
        opacity: 1
    }
    25%,
    75% {
        opacity: 0
    }
}

@keyframes flash {
    0%,
    100%,
    50% {
        opacity: 1
    }
    25%,
    75% {
        opacity: 0
    }
}

.flash {
    -webkit-animation: flash 1.2s .9s;
    animation: flash 1.2s .9s;
}
</style>
