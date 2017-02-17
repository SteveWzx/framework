export default {
  pushLoadStack (state) {
    state.showLoading = true
  	state.stack.push(1)
  },
  completeLoad (state) {
  	let stack = state.stack
    stack.pop()
    if (!stack.length) {
      //延时为了更好显示loading效果
      setTimeout(() => {
        state.showLoading = false
      }, 200)
    }
  }
}