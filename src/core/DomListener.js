import {capitalizeFirstLetter} from './utils'

export class DomListener {
  constructor($root, listeners=[]) {
    if (!$root) {
      throw new Error('No $root provided for DomListener')
    }
    this.$root=$root
    this.listeners=listeners
  }
  initDomListener() {
    this.listeners.forEach((listener)=> {
      const method=getMethodName(listener)
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name} Component`,
        )
      }
      this[method]=this[method].bind(this)
      // Same as addEventListener()
      this.$root.on(listener, this[method])
    })
  }
  removeDomListener() {
    this.listeners.forEach((listener)=>{
      const method=getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}
function getMethodName(eventName) {
  return 'on'+capitalizeFirstLetter(eventName)
}
