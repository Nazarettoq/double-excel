import './scss/index.scss'
import {Excel} from './components/excel/Excel'
import {Table} from './components/table/Table'
import {Header} from './components/header/Header'
import {Toolbar} from './components/toolbar/Toolbar'
import {Formula} from './components/formula/Formula'
import { rootReducer } from './redux/rootReducer'
import { createStore } from '@core/createStore'
import { debounce, storage } from '@core/utils'
import { initialState } from './redux/initialState'

const store=createStore(rootReducer, initialState)
const sateListener=debounce((state)=>{
  storage('excel-state', state)
}, 300)
store.subscribe(sateListener)
const excel =new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})
excel.render()
