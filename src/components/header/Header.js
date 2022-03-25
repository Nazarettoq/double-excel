import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className='excel__header'

  toHTML() {
    return `  <input class="input" value="New table"/>
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
