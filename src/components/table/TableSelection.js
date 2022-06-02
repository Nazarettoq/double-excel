export class TableSelection {
  constructor() {
    this.selectedGroup = []
    this.currentselected = null
  }
  get selectedIds() {
    return this.selectedGroup.map(($el)=>$el.id())
  }
  clear() {
    this.selectedGroup.forEach((el) => el.removeClass('selected'))
    this.selectedGroup = []
  }
  applayStyle(style) {
    this.selectedGroup.forEach(($el)=>$el.css(style))
  }

  selectOne($el) {
    this.clear()
    $el.focus()
    $el.addClass('selected')
    this.selectedGroup.push($el)
    this.currentselected = $el
  }
  selectSeveral($group) {
    this.clear()
    this.selectedGroup = $group
    this.selectedGroup.forEach(($el) => $el.addClass('selected'))
  }
}
