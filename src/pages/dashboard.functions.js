import {storage} from '@core/utils'
function toHTML(key) {
  const model=storage(key)
  const id= key.split(':')[1]
  const date=new Date(model.lastTimeOpened).toString().split('GMT')[0]
  return `<li class="db__record">
    <a href="#excel/${id}">${model.tableName}</a>
    <strong>${date}</strong>
</li>`
}

function getAllkeys() {
  const keys=[]
  for ( let i=0; i<localStorage.length; i++) {
    const key=localStorage.key(i)
    if (key.includes('excel')) {
      keys.push(key)
    }
  }
  return keys
}
export function tableList() {
  const keys= getAllkeys()

  if (!keys.length) return `<div class="db__no-data">There is no data yet</div>`
  return `<div class="db__table db__view">
    <div class="db__list-header">
        <span>Name</span>
        <span>Viewing date</span>
    </div>
</div>
<ul class="db__list">
    ${keys.map((key)=>toHTML(key)).join('')}

</ul>`
}
