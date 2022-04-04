
const isStr=(el)=>{
  return typeof el==='string'
}
class Dom {
  constructor(selector) {
    this.$el= isStr(selector)?
      document.querySelector(selector) : selector
  }

  get data() {
    return this.$el.dataset
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
  css(s={}) {
    for (const key in s) {
      if ( Object.prototype.hasOwnProperty.call(s, key)) {
        this.$el.style[key]=s[key]
      }
    }
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  getСoordinates() {
    return this.$el.getBoundingClientRect()
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
  parent(selector) {
    return $(this.$el.closest(selector))
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

