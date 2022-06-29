import {$} from '@core/dom'
import { Observer } from '@core/Observer'
import { StoreSubscriber } from '@/redux/StoreSubscriber'
import * as actions from '@/redux/actionCreators'
import { preventDefault } from '@/core/utils'

export class Excel {
  constructor( options) {
    this.components=options.components || []
    this.observer= new Observer()
    this.store=options.store
    this.subscriber=new StoreSubscriber( this.store)
  }
  getRoot() {
    const $root= $.create('div', 'excel')

    const componentOptions={
      observer: this.observer,
      store: this.store,
    }
    this.components= this.components.map((Component) => {
      const $el= $.create('div', Component.className)
      const component=new Component($el, componentOptions)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }
  init() {
    if (process.env.NODE_ENV==='production') {
      document.addEventListener('contextmenu', preventDefault)
    }
    this.store.dispatch(actions.lastTimeOpenedAC())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach((component) => {
      component.init()
    })
  }
  destroy() {
    this.subscriber.unSubscribeFromStore()
    document.removeEventListener('contextmenu', preventDefault)
    this.components.forEach((component)=>component.destroy())
  }
}
