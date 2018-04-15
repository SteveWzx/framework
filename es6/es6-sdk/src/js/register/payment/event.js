import { $ } from '../../common/utils'
import { fetchPost } from '../../common/fetch'

export default (opts) => {
  const $form = $('register-payment-form')
  let formValues = {}

  Array.from($form.elements).forEach(item => {
    if (item.name) {
      formValues[item.name] = item.value
    }
  })

  $form.onsubmit = async (e) => {
    e.preventDefault()
    console.log('submit')
    let data = await fetchPost('/register/payment', formValues)
    console.log(data)
    if (data.code === 200) {
      opts.success && opts.success(data)
    }
  }
}
