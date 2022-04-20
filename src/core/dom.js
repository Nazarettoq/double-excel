import { setPonterToEnd} from "./utils"

const isStr = (el) => {
  return typeof el === 'string'
}
class Dom {
  constructor(selector) {
    this.$el = isStr(selector) ? document.querySelector(selector) : selector
  }

  get data() {
    return this.$el.dataset
  }
  addClass(className) {
    this.$el.classList.add(className)
    return this
  }
  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
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
  css(s = {}) {
    for (const key in s) {
      if (Object.prototype.hasOwnProperty.call(s, key)) {
        this.$el.style[key] = s[key]
      }
    }
  }
  id(spred) {
    if (spred) {
      const id = this.id().split(':')
      return {
        row: +id[0],
        col: +id[1],
      }
    }

    return this.$el.dataset.id
  }
  focus() {
    this.$el.focus()
    setPonterToEnd( this.$el)
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  findEl(selector) {
    return $(this.$el.querySelector(selector))
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
  text(text) {
    if (isStr(text)) {
      this.$el.textContent=text
      return this
    }
    if (this.$el.tagName.toLowerCase()==='input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }
  html(html) {
    if (isStr(html)) {
      this.$el.innerHTML = html
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

$.create = (tegName, classes = '') => {
  const el = document.createElement(tegName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
