// 1. design
// 1. export a function
// 2. API 设计
//
// 2.1: check($input, 'mobile', cb)
// 2.2: <input type="text" valid="mobile">

const rules = {
  mobile: (v) => {
    if (!v.match(/^1(3|4|5|7|8)\d{9}$/)) {
      return {
        type: 'mobile',
        message: '手机号不正确'
      }
    }
  },
  ltFFFF: (v) => {
    if (v.match(/\u{ffff}-\u{fffff}/u)) {
      return {
        type: 'ltFFFF',
        message: '您输入了非法字符'
      }
    }
  },
  noOther: (v) => {
    if (v.match(/[\p{C}]/u)) {
      return {
        type: 'noOther',
        message: '您输入了非法字符'
      }
    }
  },
  email: (v) => {
    if (!v.match(/^([\w\d_\.\-])+\@(([\w\d\-])+\.)+([\w\d]{2,4})+$/)) {
      return {
        type: 'email',
        message: '请输入正确的邮箱格式'
      }
    }
  },
  present: (v) => {
    if (!v.trim()) {
      return {
        type: 'present',
        message: '必填'
      }
    }
  }
}
const check = (form) => {
  if (!form || !form.elements) {
    return
  }

  const elements = form.elements;
  let checkResults = []

  Array.from(elements).filter(item => {
    return item.getAttribute('valid')
  }).map(item => {
    const valids = item.getAttribute('valid').split(', ')
    const value = item.value
    let errorArr = []
    valids.forEach(valid => {
      if (rules[valid]) {
        let result = rules[valid](value)
        result && errorArr.push(result)
      }
    })

    if (errorArr.length) {
      checkResults.push({
        dom: item,
        errorArr: errorArr,
        name: item.name,
        message: errorArr[0].message,
        type: errorArr[0].type
      })
    }
  })

  return checkResults
}

export { check }
