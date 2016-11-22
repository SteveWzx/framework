<template>
  <div>

    <navbar></navbar>

    <div class="container">
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
<<<<<<< HEAD
/* 根组件就像是 AngularJS 的 $rootScope，同时也负责全局布局 */
=======
/* 根组件的作用有点像是 AngularJS 的 $rootScope */
// import userService from 'SERVICE/userService'
>>>>>>> 4e52d160ad8dbf59b841ef1b50801ab74c341b0c
import Navbar from 'COMPONENT/Navbar/'

export default {
  // 路由会自动将该组件挂载到 #app 上
  // el: () => '#app',
  
  components: { Navbar },

<<<<<<< HEAD
  // 注意：顶级变量必须设置默认值方能引入 observer
  data () {
    return {
      userData: null
=======
  // 顶级变量必须设置默认值方能引入 observer
  data () {
    return {
      // userService, // 实现 userService 挂载 data 的可追踪
      userData: null // 须与 userService.data【手动】同步
>>>>>>> 4e52d160ad8dbf59b841ef1b50801ab74c341b0c
    }
  }
}
</script>
