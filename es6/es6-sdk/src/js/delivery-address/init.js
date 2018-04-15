import '../common/polyfill.js'
import render from './render'
import event from './event'

const delivery = (opts = {}) => {
  var defaultOpts = {

  }
  var options = Object.assign(defaultOpts, opts)

  render(options).then(() => {
    event(options)
  })
}

export { delivery }
