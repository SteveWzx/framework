import { $, addClass, removeClass } from '../common/utils'
import { fetchJson, fetchPost } from '../common/fetch'
import findTpl from './findTpl'

export default async (opts) => {
  const findInfo = await fetchJson('/security-info', {})
  const $chooseMobile = $('choose-mobile')
  const $chooseEmail = $('choose-email')
  const $dialog = $('forget-dialog')

  const forget = async (type) => {
    const sendVerifyCode = await fetchPost('/send-forget-verifycode', { type: type })
    const $verifyInput = $('forget-verify-input')
    const $forgetBtn = $('forget-confirm-btn')
    const $number = $('forget-verify-number')
    const $close = $('forget-verify-dialog-close')
    const typeTool = (type === 'email') ? '邮件' : '短信'

    if (sendVerifyCode.code === 200) {
      $dialog.style.display = 'block'
      $verifyInput.oninput = () => {
        const MSGLENGTH = 6
        let value = $verifyInput.value
        $verifyInput.value = value.replace(/\D/g, '')
        if ($verifyInput.value.length > (MSGLENGTH - 1)) {
          $forgetBtn.removeAttribute('disabled')
          removeClass($forgetBtn, 'disabled')
          addClass($forgetBtn, 'btn-primary')
          if (value.length > MSGLENGTH) {
            $verifyInput.value = value.substring(0, MSGLENGTH)
          }
        }
      }

      $forgetBtn.onclick = async () => {
        let data = await fetchPost('/forget', {
          number: $number.innerText,
          verifyCode: $verifyInput.value
        })
        if (data.code === 200) {
          opts.success && opts.success(type, typeTool)
        }
      }
    } else {
      alert('验证‘ + typeTool + ’发送失败')
    }

    $close.onclick = () => {
      $dialog.style.display = 'none'
      $verifyInput.value = ''
      $number.innerHTML = ''
    }
  }

  $chooseMobile.onclick = () => {
    $dialog.innerHTML = findTpl('手机', findInfo.data.mobile)
    forget('mobile')
  }

  $chooseEmail.onclick = () => {
    $dialog.innerHTML = findTpl('邮箱', findInfo.data.email)
    forget('email')
  }
}
