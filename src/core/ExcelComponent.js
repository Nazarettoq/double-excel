import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners)
    this.name=options.name ||''
    this.observer=options.observer
    this.unsubscribers=[]
    this.prepare()
  }
  $dispatch(event, ...args) {
    this.observer.dispatch(event, ...args)
  }
  $on(event, fn) {
    const unsub=this.observer.subscribe(event, fn)
    this.unsubscribers.push(unsub)
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
