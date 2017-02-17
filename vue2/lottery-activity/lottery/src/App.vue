<template>
  <div class="app" :style="{height: '100%'}">
    <div class="main" :style="{height: '100%'}">
      <router-view></router-view>
      <Imgload v-show='showLoading'></Imgload>
    </div>
  </div>
</template>

<script>
import Imgload from './components/ImgLoad.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      direction: 'forward',
      showLoading: true,
      imgStack: []
    }
  },
  components: {
    Imgload
  },
  computed: {
    showLoading () {
      return this.$store.state.loading.showLoading
    }
  },
  watch: {
     // 如果路由有变化，会执行该方法
     '$route': 'changeRoute'
  },
  methods: {
    ...mapMutations([
      'pushLoadStack',
      'completeLoad'
    ]),
    changeRoute () {
      // console.log('路由改变了')
    },
    imgsLoaded (imgsUrl) {
      let path = 'https://atths.jzb.com/website/fe/lottery/images/'
      imgsUrl.forEach((item) => {
        this.pushLoadStack()
        let imgEle = document.createElement('img')
        if (item === 'logo.png') {
          imgEle.src = 'https://atths.jzb.com/website/fe/pub_images/logo.png'
        } else {
          imgEle.src = path + item
        }
        imgEle.onload =  () => {
          this.completeLoad()
          imgEle = null
        }
      })
    }
  },
  created () {
    this.imgsLoaded(['hbg.png', 'hjndj.png', 'hjzb.png', 'prize.png', 'obg.png', 'ojndj.png', 'invite.png', 'i1.png', 'f1.png', 'sbg.png', 'f2.png', 'f3.png', 'stbg.png', 'f4.png', 'ngif.png', 'f5.png', 'fobg.png', 'lbg.png', 'ndata.png', 'ohead.png', 'logo.png'])
    if (!+window.open) {
      if (/iPhone/.test(navigator.userAgent)) {
        alert('郑重说明：家长帮春节活动内部测试中，1月26日前所有参与数据都是测试数据，均会在上线前清空，概不兑换任何奖品。确认继续请按“好”。')
      } else {
        alert('郑重说明：家长帮春节活动内部测试中，1月26日前所有参与数据都是测试数据，均会在上线前清空，概不兑换任何奖品。确认继续请按“确定”。')
      } 
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
}
body {
  background: #f5f5f5;
}
a {
  text-decoration: underline;
}
</style>

