import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.temlate'
import {resizeOfTable} from './resizer'
import {shouldResize} from './table.functions'

export class Table extends ExcelComponent {
  static className='excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }
  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeOfTable(this.$root, event)
    }
  }
}

