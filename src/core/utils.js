
export function capitalizeFirstLetter(str) {
  if (typeof str !=='string') {
    return ''
  }
  return str.charAt(0).toUpperCase()+str.slice(1)
}
export function range(start, end) {
  if (start>end) {
    [end, start]=[start, end]
  }
  return new Array((end-start)+1)
    .fill('')
    .map((_, index)=>start+index)
}
export function setPonterToEnd(elem) {
  const sel = window.getSelection()
  sel.selectAllChildren(elem)
  sel.collapseToEnd()
}
