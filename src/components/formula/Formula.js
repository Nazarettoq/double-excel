import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
export class Formula extends ExcelComponent {
  static className='excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formual',
      listeners: ['input', 'keydown'],
      ...options,

    })
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable="true" spellcheck="false">
     </div>`
  }
  init() {
    super.init()
    this.formula=this.$root.findEl('#formula')
    this.$on('Table:select', (cell)=>{
      this.formula.text(cell.text())
    })
    this.$on('Table:input', (cell)=>{
      this.formula.text(cell.text())
    })
  }
  onInput(event) {
    const text=$(event.target).text()
    this.$dispatch('Formula:input', text)
  }
  onKeydown(event) {
    const keys=['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$dispatch('Formula:enter')
    }
  }
}
