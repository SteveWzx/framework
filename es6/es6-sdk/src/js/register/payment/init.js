import "../../common/polyfill"
import render from './render'
import event from './event'
import { checkOptions } from '../../common/utils'

const regPayment = (opts) => {
  if (!checkOptions(opts)) {
    return
  }

  var defaultOpts = {
    paymentUsernamePlaceholder: '请输入您的xx宝账号',
    paymentPasswordPlaceholder: '请输入您的xx宝密码'
  }
  var options = Object.assign(defaultOpts, opts)

  render(options)
  event(opts)
}

export { regPayment }
