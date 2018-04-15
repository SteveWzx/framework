const getId = (id) => {
  const dom = document.getElementById(id)
  dom && dom.setAttribute('id', dom.id + '-' + Math.floor(Math.random() * 100000))
  return dom
}

const hasClass = (dom, cls) => {
  return dom.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

const addClass = (dom, cls) => {
  dom.className.trim()
  if (!hasClass(dom, cls)) {
    dom.className += ' ' + cls
  }
}

const removeClass = (dom, cls) => {
  if (hasClass(dom, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    dom.className = dom.className.replace(reg, ' ')
  }
}

const isDom = (obj) => {
  try {
    return obj instanceof HTMLElement
  } catch(e) {
    return (typeof obj === 'object') && (obj.nodeType === '1') && (typeof obj.style === 'object')
  }
}

const checkOptions = (obj) => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return false
  }

  if (!obj.container) {
    throw new Error('container can not be empty')
    return false
  }

  if (!isDom(obj.container)) {
    throw new Error('container must be a HTMLElement')
    return false
  }

  return true
}

const getUrlParams = (key) => {
  const query = location.search.replace(/^\?/, '')
  let obj = {}
  query.split('&').map(item => {
    let tmp = item.split('=')
    obj[tmp[0]] = tmp[1]
  })
  if (!key) {
    return obj
  } else {
    return obj[key]
  }
}

/**
 * 事件绑定 or 事件代理
 * bindEvent(el, eventType, fn) // 事件绑定
 * bindEvent(el, eventType, classSelector, fn)  // 事件代理
 */
const bindEvent = (el, eventType, ...args) => {
  let selector, fn, target

  const findNode = (element, selector, endel) => {
    if (element === endel) {
      return
    }
    if (document.querySelector(selector).className === element.className) {
      target = el
      return
    } else {
      findNode(element.parentNode, selector, endel)
    }
  }

  if (typeof args[0] === 'string') {
    selector = args[0]
    if (typeof args[1] === 'function') {
      fn = args[1]
    }
  } else if (typeof args[0] === 'function') {
    fn = args[0]
  }

  el.addEventListener(eventType, function(e) {
    if (!selector) {
      fn.call(el, e)
    } else if (selector) {
      findNode(e.target, selector, el)
      target && fn.call(target, { target: target })
    }
  })
}


export { getId as $, addClass, removeClass, checkOptions, getUrlParams, bindEvent }
