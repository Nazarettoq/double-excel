export class TableSelection {
  constructor() {
    this.selectedGroup = []
    this.currentselected = null
  }
  clear() {
    this.selectedGroup.forEach((el) => el.removeClass('selected'))
    this.selectedGroup = []
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
