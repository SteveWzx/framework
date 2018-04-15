import FetchMock from 'fetch-mock'
import regionData from './data/region-data'

FetchMock.mock('/login', (url, opts) => {
  const params = opts.params
  if (params.account === '18512345678') {
    if (params.password === '123456') {
      return {
        code: 200,
        message: 'success'
      }
    } else {
      return {
        code: 401,
        message: '密码错误'
      }
    }
  } else {
    return {
      code: 400,
      message: '用户名错误'
    }
  }
})

FetchMock.mock('/getMobileVerifyToken', (url, opts) => {
  return {
    code: 200,
    message: 'success',
    mobileVerifyToken: '123456'
  }
})

FetchMock.mock('/register/getVerifyCode', (url, opts) => {
  const params = opts.params
  return {
    code: 200,
    message: 'success',
    mobile: params.mobile
  }
})

FetchMock.mock('/register/mobile', (url, opts) => {
  const params = opts.params
  if (params.verifyCode === '123456') {
    return {
      code: 200,
      message: 'success',
      token: '123456'
    }
  } else {
    return {
      code: 400,
      message: 'invalid_code',
      token: ''
    }
  }
})

FetchMock.mock('/region-data', (url, opts) => {
  return {
    code: 200,
    message: 'success',
    data: regionData
  }
})

FetchMock.mock('/register/info', (url, opts) => {
  return {
    code: 200,
    message: 'success'
  }
})

FetchMock.mock('/register/payment', (url, opts) => {
  return {
    code: 200,
    message: 'success'
  }
})

FetchMock.mock('/profile', (url, opts) => {
  return {
    code: 200,
    message: 'success',
    data: {
      nickname: 'zhangsan',
      mobile: '18512345678',
      email: 'zhangsan@qq.com',
      realname: '张三',
      sex: 1,
      birthday: '1995-01-03',
      regionCode: '9,73,723',
      regionString: '上海市静安区'
    }
  }
})


FetchMock.mock('/delivery-address', (url, opts) => {
  return {
    code: 200,
    massage: 'success',
    data: [{
      name: '张三',
      regionString: '北京市东城区',
      regionCode: '1,1,1',
      detailAddress: '和平北街334号',
      postalcode: '100000',
      mobile: 18512345678,
      telephone: '',
      addrId: 345
    }, {
      name: '张三',
      regionString: '北京市西城区',
      regionCode: '1,1,2',
      detailAddress: '和平北街234号',
      postalcode: '100000',
      mobile: 18512345679,
      telephone: '',
      addrId: 344
    }]
  }
})

FetchMock.mock('/save-delivery', {
  code: 200,
  message: 'success'
})

FetchMock.mock('/del-delivery', {
  code: 200,
  message: 'success'
})

FetchMock.mock('/security-info', {
  code: 200,
  message: 'success',
  data: {
    nickname: 'xiaoming',
    mobile: '18512345678',
    email: 'xiaoming@qq.com',
    password: 1,
    identity: 1,
    secretQuestion: 0
  }
})

FetchMock.mock('/forget', {
  code: 200,
  message: 'success'
})

FetchMock.mock('/send-forget-verifycode', {
  code: 200,
  message: 'success'
})
