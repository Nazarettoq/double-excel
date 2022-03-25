
const CODES={
  A: 65,
  Z: 90,
}

const setRow=(index, content)=>{
  return ` <div class="row">
  <div class="row-info">${index ? index : ''}</div>
  <div class="row-data">${content}</div>
  </div>`
}
const setColumn=(col)=>{
  return `
    <div class="column">${col}</div>
    `
}
const setCell=()=>{
  return `<div contenteditable="true" class="cell"></div>`
}
const setColsData=(index)=>{
  return String.fromCodePoint(CODES.A+index)
}
export function createTable(rowCount=25) {
  const rows=[]
  const colsCount=CODES.Z-CODES.A+1

  const cols=new Array(colsCount).fill('')
    .map((_, index)=>setColsData(index))
    .map((el)=>setColumn(el))
    .join('')

  rows.push(setRow(null, cols))

  const cells=new Array(colsCount).fill(setCell()).join('')

  for (let i=0; i<rowCount; i++) {
    rows.push(setRow(i+1, cells))
  }

  return rows.join('')
}
