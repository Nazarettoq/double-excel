import { creacteToolbar } from './toolbar.template'
import { $ } from '@core/dom'
import { ExcleStateComponent } from '@core/ExcelStateComponent'
import { defaultStyles } from '@core/constants'
export class Toolbar extends ExcleStateComponent {
  static className='excel__toolbar'

  constructor($root, observer) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...observer,
    })
  }
  prepare() {
    return this.initState(defaultStyles)
  }
  get template() {
    return creacteToolbar(this.state)
  }
  toHTML() {
    return this.template
  }
  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }
  onClick(event) {
    const $target= $(event.target)
    if ($target.data.type==='button') {
      const value=JSON.parse($target.data.value)
      this.$emit('Toolbar:applayStyle', value)
    }
  }
}
