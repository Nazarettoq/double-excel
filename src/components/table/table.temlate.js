
const CODES={
  A: 65,
  Z: 90,
}

const setRow=(index, content)=>{
  // eslint-disable-next-line max-len
  const resize=index? '<div class="row-resize" data-resize="row"> <div class="row-pointer"></div></div>':''
  return ` <div class="row"  data-type="resizable" data-row="${index}">
  <div class="row-info">${index ? index : ''}
  ${resize}
  </div>
  <div class="row-data">${content}</div>
  </div>`
}
const setColumn=(col, index)=>{
  return `
  <div class="column" data-type="resizable" data-col="${index}">${col}
    <div class="col-resize"  data-resize="col">
     <div class="col-pointer"></div>
    </div>
  </div>  
    `
}
const setCell=(row)=>{
  return function(_, col) {
    return `<div 
      contenteditable="true"
      class="cell"
      data-col="${col}"
      data-id="${row}:${col}"
    ></div>`
  }
}
const setColsData=(_, index)=>{
  return String.fromCodePoint(CODES.A+index)
}
export function createTable(rowCount=25) {
  const rows=[]
  const colsCount=CODES.Z-CODES.A+1

  const cols=new Array(colsCount).fill('')
    .map(setColsData)
    .map(setColumn)
    .join('')

  rows.push(setRow(null, cols))


  for (let row=0; row<rowCount; row++) {
    const cells=new Array(colsCount).fill('')
      .map(setCell(row))
      .join('')
    rows.push(setRow(row+1, cells))
  }

  return rows.join('')
}
