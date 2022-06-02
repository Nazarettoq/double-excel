import {ExcelComponent} from '@core/ExcelComponent'
import * as actions from '@/redux/actionCreators'
import {$} from '@core/dom'
export class Header extends ExcelComponent {
  static className='excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
      listeners: ['input'],

    })
  }
  onInput(event) {
    const text=$(event.target).text()
    this.$dispatch(actions.changeTableName(text))
  }
  toHTML() {
    const tableName=this.store.getState().tableName
    return `  <input class="input" value="${tableName}"/>
    <div>
        <div class="button">
        <span class="material-icons">delete_forever</span>
        </div>
        <div class="button">
        <span class="material-icons">exit_to_app</span>
        </div>
    </div>`
  }
}
