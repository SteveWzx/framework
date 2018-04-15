import { $ } from '../common/utils'
import { fetchPost } from '../common/fetch'
import { check } from '../common/form-check'

export default (opts) => {
  const $loginForm = $('login-form')
  const $loginBtn = $('login-btn')
  const $remember = $('login-remember')
  const $clearAccount = $('clear-account')
  const $clearPassword = $('clear-password')
  const $account = $('login-account')
  const $password = $('login-password')
  const $error = $('login-error')

  // 需要表单验证
  $loginForm.onsubmit = async (e) => {
    /**
     * 点击登录
     */
    e.preventDefault()

    const checkResults = check($loginForm)
    console.log(checkResults)

    if (!checkResults.length) {
      let remember = '0'
      if ($remember.getAttribute('checked')) {
        remember = '1'
      }
  
      const data = await fetchPost('/login', {
        account: $account.value,
        password: $password.value,
        remember: remember
      })
  
      if (data.code === 200) {
        opts.success && opts.success()
      } else {
        $error.innerHTML = data.message
      }
    } else {
      const name = checkResults[0].name
      const type = checkResults[0].type
      if (type === 'present' && name === 'account') {
        $error.innerHTML = '请填写您的用户名'
      }
      if (type === 'present' && name === 'password') {
        $error.innerHTML = '请填写您的密码'
      }
    }

  }

  $account.oninput = () => {
    if ($account.value.length) {
      $clearAccount.style.display = 'block'
    } else {
      $clearAccount.style.display = 'none'
    }
    $error.innerHTML = ''
  }

  $clearAccount.onclick = () => {
    $account.value = ''
    $clearAccount.style.display = 'none'
    $error.innerHTML = ''
  }

  $password.oninput = () => {
    $error.innerHTML = ''
  }

}