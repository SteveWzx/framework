<template>
  <section class="home bg">
    <div class="pr view">
      <div class="jndj pa" :class="{zoomInDown: !showLoading}">
        <img src="https://atths.jzb.com/website/fe/lottery/images/hjndj.png" alt="">
      </div>
      <div class="hjzb pa">
        <img src="https://atths.jzb.com/website/fe/lottery/images/hjzb.png?v=1" alt="">
      </div>
      <div class="prize pa" :class="{tada: !showLoading}">
      <!-- <div class="prize pa" :class="{tada: false}"> -->
        <img src="https://atths.jzb.com/website/fe/lottery/images/prize.png?v=1" alt="">
      </div>
      <div class="btn h-btn pa" @click="linkToInvitePage">
        <span>邀请领奖</span>
      </div>
      <div class="h-nav pa">
        <span class="fl" @click="linkToMePage">查看我的邀请</span>
        <span class="fr" @click="linkToIntro">查看奖品介绍</span>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      showLoading: true,
      is_login: false,
      is_visitor: false
    }
  },
  watch: {
    '$store.state.loading.showLoading': function() {
      if (!this.$store.state.loading.showLoading && this.showLoading) {
        this.showLoading = false
      }
    }
  },
  methods: {
    ...mapMutations([
      'pushLoadStack',
      'completeLoad',
      'changeNewUserState',
      'getUserQrCode',
      'getUserId'
    ]),
    requestData (url, fn) {
      this.pushLoadStack()
      this.$http.get(url).then(fn).then(this.completeLoad)
    },
    linkToInvitePage () {
      if (this.is_login) {
        window.gaFn('首页 - 邀请领奖')
        this.$router.push('/invite')
      } else {
        window.JzbBridge.ready(function(api){
          api.noLogin("你还没有登陆", window.location)
        })
      }
    },
    linkToMePage () {
      if (this.is_login) {
        window.gaFn('首页 - 查看我的邀请')
        this.$router.push('/me')
      } else {
        window.JzbBridge.ready(function(api){
          api.noLogin("你还没有登陆", window.location)
        })
      }
    },
    linkToIntro () {
      window.gaFn('首页 - 查看奖品介绍')
      window.JzbBridge.ready(function(api){
        api.threadsDetail("4923235", '1')
      })
    }
  },
  created () {
    window.gaFn('首页')
    this.requestData(`/activity/init/${window.userKey}`, (response) => {
      let data = response.data
      if (data.errcode === 0) {
        if (data.objects.is_new && this.$store.state.user.new) {
          this.changeNewUserState()
          this.$router.push('/new')
        }
        this.is_login = data.objects.is_login
        this.is_visitor = data.objects.is_visitor
        this.getUserQrCode({qr: data.objects.invite_url})
        this.getUserId({id: data.objects.eduu_id})
      } else {
        alert(data.errmsg)
      }
    })
  }
}
</script>

<style>
a {
  width: 100%;
  height: 100%;
  display: block;
}
.home a {
  text-decoration: none;
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
  padding-top: 3.3%;
  color: #fff;
  font-size: 18px;
  font-size: 5.625vmin;
  border-bottom: 2px solid #ad3500;
}
.btn span {
  color: #fff;
  font-size: 18px;
  font-size: 5.625vmin;
  text-decoration: none;
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
.fc {
  color: #d44201;
}
.h-nav span {
  color: #d44201;
  font-size: 13px;
  font-size: 4.06vmin;
  text-decoration: underline;
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
    -webkit-animation: bounceInUp .9s;
    animation: bounceInUp .9s;
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

@-webkit-keyframes tada {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1)
    }
    20% {
        -webkit-transform: scale(0.98) rotate(-1.5deg);
        transform: scale(0.98) rotate(-1.5deg)
    }
    50% {
        -webkit-transform: scale(1.05) rotate(1.5deg);
        transform: scale(1.05) rotate(1.5deg)
    }
    80% {
        -webkit-transform: scale(1.05) rotate(-1.5deg);
        transform: scale(1.05) rotate(-1.5deg)
    }
    100% {
        -webkit-transform: scale(1) rotate(0);
        transform: scale(1) rotate(0)
    }
}

@keyframes tada {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1)
    }
    20% {
        -webkit-transform: scale(0.98) rotate(-1.5deg);
        transform: scale(0.98) rotate(-1.5deg)
    }
    50% {
        -webkit-transform: scale(1.05) rotate(1.5deg);
        transform: scale(1.05) rotate(1.5deg)
    }
    80% {
        -webkit-transform: scale(1.05) rotate(-1.5deg);
        transform: scale(1.05) rotate(-1.5deg)
    }
    100% {
        -webkit-transform: scale(1) rotate(0);
        transform: scale(1) rotate(0)
    }
}

.tada {
    -webkit-animation: tada .8s .5s;
    animation: tada .8s .5s;
}
</style>
