import {range} from '@core/utils'


export function shouldResize(event) {
  return event.target.dataset.resize
}
export function isCell(event) {
  return event.target.dataset.id
}

export function matrix($current, $target) {
  const current=$current.id(true)
  const target=$target.id(true)
  const cols=range(current.col, target.col)
  const rows=range(current.row, target.row)
  const arrOfIds= cols.reduce((acc, col)=>{
    rows.forEach((row)=>acc.push(`${row}:${col}`))
    return acc
  }
  , [])
  return arrOfIds
}
export function selectNextCell(key, {col, row}) {
  switch (key) {
  case "ArrowRight":
  case "Tab":
  {
    col++
    break
  }
  case "ArrowDown":
  case "Enter":
  {
    row++
    break
  }
  case "ArrowLeft":
  {
    if (col!=0) {
      col--
    }

    break
  }
  case "ArrowUp":
  {
    if (row!=0) {
      row--
    }

    break
  }

  default:
    break
  }
  return `${row}:${col}`
}
