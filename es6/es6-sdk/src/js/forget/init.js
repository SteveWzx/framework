import "../common/polyfill"
import render from './render'
import event from './event'

const forget = (opts) => {
  const defaultOpts = {

  }
  const options = Object.assign(defaultOpts, opts)

  render(options)
  event(options)
}

export { forget }
