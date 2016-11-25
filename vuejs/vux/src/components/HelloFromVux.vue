<template>
  <div class="vux-demo">
    <img class="logo" src="../assets/vux_logo.png">
    <h1>{{ msg }}</h1>
  </div>
  <group title="cell demo">
    <cell title="Vux" value="Cool" is-link></cell>
  </group>
  <div>
    <icon type="success"></icon>
    <icon type="info"></icon>
    <icon type="info_circle"></icon>
    <icon type="warn"></icon>
    <icon type="waiting"></icon>
    <icon type="waiting_circle"></icon>
    <icon type="safe_success"></icon>
    <icon type="safe_warn"></icon>
    <icon type="success_circle"></icon>
    <icon type="success_no_circle"></icon>
    <icon type="circle"></icon>
    <icon type="download"></icon>
    <icon type="cancel"></icon>
    <icon type="search"></icon>
    <icon type="clear"></icon>
    <br/>
    <icon type="success" class="icon_big"></icon>
    <icon type="info" class="icon_big"></icon>
    <icon type="safe_success" class="icon_big"></icon>
    <icon type="safe_warn" class="icon_big"></icon>
  </div>
  <div>
    <tab :line-width="2" active-color="#fc378c">
      <tab-item :selected="demo2 === item" v-for="item in list2" @click
        ="demo2 = item">{{item}}</tab-item>
    </tab>
  </div>
</template>

<script>
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
import Icon from 'vux/src/components/icon'
import Tab from 'vux/src/components/tab/tab'
import TabItem from 'vux/src/components/tab/tab-item'

export default {
  components: {
    Group,
    Cell,
    Icon,
    Tab,
    TabItem
  },
  data () {
    return {
      msg: 'Hello World!',
      demo2: '美食',
      list2: ['精选', '美食', '电影', '酒店', '外卖']
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
