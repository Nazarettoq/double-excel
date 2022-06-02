import {$} from '@core/dom'

export function resizeOfTable($root, event) {
  return new Promise((resolve)=>{
    const resizer=$(event.target)
    const parent=resizer.parent('[data-type="resizable"]')
    const currX=parent.getСoordinates()
    const type=event.target.dataset.resize
    let finalSize

    document.onmousemove=(e)=>{
      if (type==='col') {
        const delta= e.pageX-currX.right
        finalSize=currX.width+delta+'px'
        resizer.css({right: -delta+"px"})
      } else {
        const delta= e.pageY-currX.bottom
        finalSize=currX.height+delta+'px'
        resizer.css({bottom: -delta+"px"})
      }
    }
    document.onmouseup=( )=>{
      document.onmousemove=null
      document.onmouseup=null
      if (type==='col') {
        $root.findAll(`[data-col="${parent.data.col}"]`)
          .forEach((el)=>el.style.width= finalSize)
        resizer.css({right: '0px'})
      } else {
        parent.css({height: finalSize})
        resizer.css({bottom: '0px'})
      }
      resolve({
        value: finalSize,
        type,
        id: type==='col' ? parent.data.col : parent.data.row,
      })
    }
  })
}
