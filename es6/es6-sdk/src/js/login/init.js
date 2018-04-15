import '../common/polyfill'
import render from './render'
import bindEvent from './event'

const login = (opts = {}) => {
  const defaultOpts = {
    loginBtnText: '登 录',
    accountPlaceholder: '手机号/邮箱/账号',
    passwordPlaceholder: '请填写密码',
    accountLabel: '',
    passwordLabel: '',
    autocomplete: false,
    showRemember: false
  }

  const options = Object.assign(defaultOpts, opts)
  render(options)
  bindEvent(options)
}

export { login }