import '../../common/polyfill'
import render from './render'
import bindEvent from './event'
import '../../common/slider'

const regMobile = (opts = {}) => {
  const defaultOpts = {
    
  }

  const options = Object.assign(defaultOpts, opts)

  render(options)
  bindEvent(options)
}

export { regMobile }