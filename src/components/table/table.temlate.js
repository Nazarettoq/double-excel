
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
const setCell=(col)=>{
  return `<div contenteditable="true" class="cell" data-col="${col}"></div>`
}
const setColsData=(index)=>{
  return String.fromCodePoint(CODES.A+index)
}
export function createTable(rowCount=25) {
  const rows=[]
  const colsCount=CODES.Z-CODES.A+1

  const cols=new Array(colsCount).fill('')
    .map((_, index)=>setColsData(index))
    .map((el, index)=>setColumn(el, index))
    .join('')

  rows.push(setRow(null, cols))


  for (let i=0; i<rowCount; i++) {
    const cells=new Array(colsCount).fill('')
      .map((_, index)=> setCell(index))
      .join('')
    rows.push(setRow(i+1, cells))
  }

  return rows.join('')
}
