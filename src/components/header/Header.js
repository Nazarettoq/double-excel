import {ExcelComponent} from '@core/ExcelComponent'
import * as actions from '@/redux/actionCreators'
import {$} from '@core/dom'
import { ActiveRoute } from '@/core/Routing/ActiveRoute'
import { newTable } from '@/core/constants'
export class Header extends ExcelComponent {
  static className='excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
      listeners: ['input', 'click'],

    })
  }
  onInput(event) {
    const text=$(event.target).text()
    event.target.onblur = ()=> {
      if (text==='') {
        event.target.value=newTable
        this.$dispatch(actions.changeTableNameAC(newTable))
      }
    }
    this.$dispatch(actions.changeTableNameAC(text))
  }

  onClick(event) {
    const data=$(event.target)
    if (data.data.button==='delete') {
      const conf=confirm('Are you sure?')
      if (conf) {
        localStorage.removeItem('excel:'+ActiveRoute.param)
        ActiveRoute.navigate('#dashboard')
      }
    } else if (data.data.button==='exit') {
      ActiveRoute.navigate('#dashboard')
    }
  }
  toHTML() {
    const tableName=this.store.getState().tableName
    return `  <input class="input" data-input="input" value="${tableName}"/>
    <div>
        <div class="button" data-button="delete">
        <span class="material-icons" data-button="delete">delete_forever</span>
        </div>
        <div class="button" data-button="exit">
        <span class="material-icons" data-button="exit">exit_to_app</span>
        </div>
    </div>`
  }
}
