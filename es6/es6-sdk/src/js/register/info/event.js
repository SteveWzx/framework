import { fetchPost } from '../../common/fetch'
import { $ } from '../../common/utils'
import { check } from '../../common/form-check'

export default (opts = {}) => {
  const $form = $('register-info-form')

  const tipMap = {
    'nickname': '昵称',
    'email': '电子邮箱'
  }
  let formValues = {}
  Array.from($form.elements).forEach(item => {
    if (item.name) {
      formValues[item.name] = item.value
    }
  })

  $form.onsubmit = async (e) => {
    e.preventDefault()

    let checkResults = check($form)
    if (checkResults.length) {
      const name = checkResults[0].name
      const type = checkResults[0].type
      const message = checkResults[0].message

      if (type === 'present') {
        alert(tipMap[name] + message)
      } else {
        alert(message)
      }
    } else {
      let data = await fetchPost('/register/info', formValues)
      if (data.code === 200) {
        opts.success && opts.success(data)
      } else {
        opts.error && opts.error(data)
      }
    }
  }
}
