import Slider from '../../common/slider'
import { $, addClass, removeClass } from '../../common/utils'
import { fetchPost } from '../../common/fetch';
import { check } from '../../common/form-check'

export default (opts) => {
  let mobileVerifyToken
  const $mobileInput = $('register-mobile-input')
  const $verifyInput = $('register-verify-input')
  const $verifyBtn = $('register-verify-btn')
  const $mobileBtn = $('register-mobile-btn')
  const $mobileForm = $('register-mobile-form')
  const $verifyForm = $('register-verify-form')
  const $verifyMobile = $('register-verify-mobile')
  const $dialog = $('register-verify-dialog')
  const $dialogClose = $('register-verify-dialog-close')

  const slider = new Slider({
    container: $('register-verify-wrapper'),
    success: async ($wrapper, $text, offsetArr) => {
      const offsetMsg = offsetArr.join(':')
      let data = await fetchPost('/getMobileVerifyToken', {
        offsetMsg: offsetMsg
      })
      if (data.code === 200) {
        mobileVerifyToken = data.mobileVerifyToken
        addClass($wrapper, 'success')
        $text.innerHTML = '验证成功'
      } else {
        addClass($wrapper, 'failer')
        $text.innerHTML = '验证失败'
      }
      $verifyBtn.removeAttribute('disabled')
      removeClass($verifyBtn, 'disabled')

    }
  })

  $verifyBtn.onclick = async () => {
    let checkResults = check($mobileForm)

    if (checkResults.length) {
      const type = checkResults[0].type
      if (type === 'present') {
        alert('请填写您的手机号')
      } else if (type === 'mobile') {
        alert('请填写正确格式的手机号')
      }

    } else {
      let data = await fetchPost('/register/getVerifyCode', {
        mobile: $mobileInput.value,
        mobileVerifyToken: mobileVerifyToken
      })
      if (data.code === 200) {
        console.log(data)
        $dialog.style.display = 'block'
        $verifyMobile.innerHTML = data.mobile
        mobileVerifyToken = ''
        slider.reset()
      } else {
        alert('手机号验证失败')
      }
    }
  }

  $dialogClose.onclick = () => {
    $dialog.style.display = 'none'
    mobileVerifyToken = ''
    slider.reset()
  }

  $verifyInput.oninput = () => {
    const MESSAGE_LENGTH = 6
    let value = $verifyInput.value
    $verifyInput.value = value.replace(/\D/, '')

    if ($verifyInput.value.length > (MESSAGE_LENGTH - 1)) {
      $mobileBtn.removeAttribute('disabled')
      removeClass($mobileBtn, 'disabled')
      addClass($mobileBtn, 'primary-btn')
      if (value.length > MESSAGE_LENGTH) {
        $verifyInput.value = value.substring(0, MESSAGE_LENGTH)
      }
    } else {
      $mobileBtn.setAttribute('disabled', 'disabled')
      removeClass($mobileBtn, 'btn-primary')
      addClass($mobileBtn, 'disabled')
    }
  }

  $mobileBtn.onclick = async () => {
    let data = await fetchPost('/register/mobile', {
      mobile: $verifyMobile.innerText,
      verifyCode: $verifyInput.value,
      mobileVerifyToken: mobileVerifyToken
    })
    if (data.code === 200) {
      opts.success && opts.success(data.token)
    } else {
      alert('验证码错误')
    }
  }

}
