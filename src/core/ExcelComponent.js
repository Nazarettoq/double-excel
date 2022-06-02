import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners)
    this.name=options.name ||''
    this.observer=options.observer
    this.subscribe=options.subscribe || []
    this.store=options.store
    this.unsubscribers=[]
    this.prepare()
  }
  $emit(event, ...args) {
    this.observer.emit(event, ...args)
  }
  $dispatch(action) {
    this.store.dispatch(action)
  }
  storeChanged() {}

  $on(event, fn) {
    const unsub=this.observer.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  isWatching(key) {
    return this.subscribe.includes(key)
  }
  toHTML() {
    return ''
  }
  init() {
    this.initDomListener()
  }
  destroy() {
    this.removeDomListener()
    this.unsubscribers.forEach((unsub)=>unsub())
  }
  prepare() {}
}
