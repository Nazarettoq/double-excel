import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { createTable } from './table.temlate'
import { resizeOfTable } from './resizer'
import { isCell, shouldResize, matrix, selectNextCell } from './table.functions'
import { TableSelection } from './TableSelection'
import * as actions from '@/redux/actionCreators'
import { defaultStyles } from '@core/constants'
import { parse } from '@core/parse'

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
    return createTable(25, this.store.getState())
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()
    const $cell = this.$root.findEl(`[data-id="0:0"]`)
    this.selectCell($cell)
    this.$on('Formula:input', (value)=>{
      this.selection.currentselected
        .attr('data-value', value)
        .text(parse(value))
      this.updateTextinStore(value)
    })
    this.$on('Formula:enter', ()=>{
      this.selection.currentselected.focus()
    })
    this.$on('Toolbar:applayStyle', (value)=>{
      this.selection.applayStyle(value)
      this.$dispatch(actions.applyStyleAC({
        value,
        ids: this.selection.selectedIds,
      }))
    })
  }

  selectCell($cell) {
    this.selection.selectOne($cell)
    this.$emit('Table:select', $cell)
    const styles=$cell.getStyles(Object.keys(defaultStyles))
    console.log(styles)
    this.$dispatch(actions.changeStylesAC(styles))
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
  updateTextinStore(value) {
    this.$dispatch(actions.changeTextAC({
      id: this.selection.currentselected.id(),
      value,
    }))
  }
  onInput(event) {
    this.updateTextinStore($(event.target).text())
  }
  async tableResize(event) {
    try {
      const data =await resizeOfTable(this.$root, event)
      this.$dispatch(actions.tableResizeAC(data))
    } catch (error) {
      console.error("Resize erorr: ", error.message)
    }
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.tableResize(event)
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
