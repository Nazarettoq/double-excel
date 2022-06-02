import { defaultStyles } from "@core/constants"
import { parse } from "@core/parse"
import { toInlineStyles } from "@core/utils"

const CODES={
  A: 65,
  Z: 90,
}
const WIDTH_DEFAULT=120+'px'
const HEIGHT_DEFAULT=24+'px'
const setRow=(index, content, height)=>{
  // eslint-disable-next-line max-len
  const resize=index? '<div class="row-resize" data-resize="row" ><div class="row-pointer"></div></div>':''
  return ` <div class="row"  data-type="resizable"
   style="height:${height}" data-row="${index}">
  <div class="row-info">${index ? index : ''}
  ${resize}
  </div>
  <div class="row-data">${content}</div>
  </div>`
}
const setColumn=(col, index, width)=>{
  return `
  <div class="column" data-type="resizable" data-col="${index}"
  style="width:${width}"
  >${col}
    <div class="col-resize"  data-resize="col">
     <div class="col-pointer"></div>
    </div>
  </div>  
    `
}
const setCell=(state, row)=>{
  return function(_, col) {
    const id=`${row}:${col}`
    const data=state.dataState[id] || ''
    const styles=toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]})
    return `<div 
      contenteditable="true"
      class="cell"
      data-col="${col}"
      data-id="${id}"
      data-value="${data}"
      style="${styles}; width:${ getWidth(state, col)}"
    >${parse(data)}</div>`
  }
}

const setColsData=(_, index)=>{
  return String.fromCodePoint(CODES.A+index)
}
function getWidth(state, index) {
  return state.colState[index] || WIDTH_DEFAULT
}
function getHeight(state, index) {
  return state.rowState[index] || HEIGHT_DEFAULT
}
export function createTable(rowCount=25, state={}) {
  const rows=[]
  const colsCount=CODES.Z-CODES.A+1

  const cols=new Array(colsCount).fill('')
    .map(setColsData)
    .map((col, index)=>{
      return setColumn(col, index, getWidth(state, index))
    })
    .join('')

  rows.push(setRow(null, cols))


  for (let row=0; row<rowCount; row++) {
    const cells=new Array(colsCount).fill('')
      .map(setCell(state, row))
      .join('')
    rows.push(setRow(row+1, cells, getHeight(state, row+1)))
  }

  return rows.join('')
}
