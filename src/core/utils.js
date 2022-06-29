
export function capitalizeFirstLetter(str) {
  if (typeof str !=='string') {
    return ''
  }
  return str.charAt(0).toUpperCase()+str.slice(1)
}
export function range(start, end) {
  if (start>end) {
    [end, start]=[start, end]
  }
  return new Array((end-start)+1)
    .fill('')
    .map((_, index)=>start+index)
}
export function setPonterToEnd(elem) {
  const sel = window.getSelection()
  sel.selectAllChildren(elem)
  sel.collapseToEnd()
}
export function storage(key, data=null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}
export function isEqual(a, b) {
  if (typeof a==='object' && typeof b==='object') {
    return JSON.stringify(a)===JSON.stringify(b)
  }
  return a===b
}
export function camleToDashCase(str) {
  return str.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())
}
export function toInlineStyles(styles={}) {
  return Object.keys(styles)
    .map((key)=>`${camleToDashCase(key)}:${styles[key]}`).join(';')
}

export function debounce(func, timeout) {
  let timer
  return function(...args) {
    const wait=()=>{
      clearTimeout(timer)
      func(...args)
    }
    clearTimeout(timer)
    timer=setTimeout(wait, timeout)
  }
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function preventDefault(event) {
  event.preventDefault()
}
