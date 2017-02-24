import * as types from '../types'

import getScrollData from '../../utils/scroll'

const state = {
  articleList: false,
  scroll: {
    scrollTop: 0,
    scrollHeight: 0,
    windowHeight: 0,
    scrollBottom: 0
  },
  scrollDirection: 'up' // down | up
}

const getters = {
  // articleList: ({status}) => status.articleList
  // tips: 上面这种方法是错误的。这里的getters传入进来的不是state的根对象，
  // 而是当前的state对象，在这里也就相当于是state = state.status
  // 所以可以放心的用state
  articleList: state => state.articleList
}

const mutations = {
  [types.ARTICLE_LIST] (state) {
    state.articleList = !state.articleList
  },
  [types.SCROLLDATA] (state, scrollObj) {
    state.scrollDirection = scrollObj.scrollTop > state.scroll.scrollTop
      ? 'down' : 'up'
    state.scroll = scrollObj
  }
}

const actions = {
  articleListSwitch ({ commit }) {
    commit(types.ARTICLE_LIST)
  },
  pushScrollData ({ commit }) {
    // console.log('scroll！')
    commit(types.SCROLLDATA, getScrollData(), { silent: true })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
