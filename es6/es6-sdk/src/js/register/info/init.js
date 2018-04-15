import "../../common/polyfill"
import render from './render'
import event from './event'

const regInfo = (opts = {}) => {
  const defaultOpts = {
    btnText: '下一步'
  }
  let options = Object.assign(defaultOpts, opts)

  render(options).then(() => {
    event(options)
  })
}

export { regInfo }
