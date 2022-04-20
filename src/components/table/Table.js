import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { createTable } from './table.temlate'
import { resizeOfTable } from './resizer'
import { isCell, shouldResize, matrix, selectNextCell } from './table.functions'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }
  toHTML() {
    return createTable()
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()
    const $cell = this.$root.findEl(`[data-id="0:0"]`)
    this.selectCell($cell)
    this.$on('Formula:input', (text)=>{
      this.selection.currentselected.text(text)
    })
    this.$on('Formula:enter', ()=>{
      this.selection.currentselected.focus()
    })
  }
  selectCell($cell) {
    this.selection.selectOne($cell)
    this.$dispatch('Table:select', $cell)
  }
  onKeydown(event) {
    const keys = [
      'Tab',
      'Enter',
      'ArrowLeft',
      'ArrowDown',
      'ArrowUp',
      'ArrowRight']
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault()
      const currId = this.selection.currentselected.id(true)
      const $nextCell = this.$root.
        findEl(`[data-id="${selectNextCell(event.key, currId)}"]`)
      this.selectCell($nextCell)
    }
  }
  onInput(event) {
    this.$dispatch('Table:input', $(event.target))
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeOfTable(this.$root, event)
    } else if (isCell(event)) {
      const $cell = $(event.target)
      if (event.ctrlKey) {
        const $cells = matrix($cell, this.selection.currentselected).map((id) =>
          this.$root.findEl(`[data-id="${id}"]`),
        )
        this.selection.selectSeveral($cells)
      } else {
        this.selection.selectOne($cell)
        this.selectCell($cell)
      }
    }
  }
}
