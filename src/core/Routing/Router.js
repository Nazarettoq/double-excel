import {$} from '@core/dom'
import { ActiveRoute } from './ActiveRoute'
export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided')
    }
    this.page=null
    this.$placeholder=$(selector)
    this.changedPageHeandler=this.changedPageHeandler.bind(this)
    this.routes=routes
    this.init()
  }
  init() {
    window.addEventListener('hashchange', this.changedPageHeandler)
    this.changedPageHeandler()
  }
  changedPageHeandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear()
    const Page= ActiveRoute.path.includes('excel')? this.routes.excel :
      this.routes.dashboard

    this.page=new Page(ActiveRoute.param)
    this.$placeholder.append(this.page.getRoot())
    this.page.afterRender()
  }
  destroy() {
    window.removeEventListener('hashchange', this.changedPageHeandler)
  }
}
