
const isStr=(el)=>{
  return typeof el==='string'
}
class Dom {
  constructor(selector) {
    this.$el= isStr(selector)?
      document.querySelector(selector) : selector
  }
  append(node) {
    if (node instanceof Dom) {
      node=node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
  }
  clear() {
    this.html('')
    return this
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
  html(html) {
    if (isStr(html)) {
      this.$el.innerHTML=html
      return this
    }
    return this.$el.outerHTML.trim()
  }
}
export function $(selector) {
  return new Dom(selector)
}

$.create=(tegName, classes='')=>{
  const el=document.createElement(tegName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}

