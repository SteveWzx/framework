const tpl = (opts = {}) => {
  return `
    <div id="register-payment-wrapper" class="register-payment-wrapper">
      <form id="register-payment-form" onsubmit="return false">
        <label>
          <span>xx宝账号</span>
          <input id="register-payment-username-input" name="username" type="text" placeholder="${opts.paymentUsernamePlaceholder}" />
        </label>
        <label>
          <span>xx宝密码</span>
          <input id="register-payment-password-input" name="password" type="password" placeholder="${opts.paymentPasswordPlaceholder}" />
        </label>
        <input id="register-payment-btn" type="submit" value="下一步"/>
      </form>
    </div>
  `
}

export default (conf) => {
  conf.container.innerHTML = tpl(conf)
}
