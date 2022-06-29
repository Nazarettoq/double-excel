import { CURRENT_STYLE, CHANGE_TEXT, TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TABLE_NAME, LAST_TIME_OPENED} from "./types"

export function rootReducer(state, action) {
  let field
  let val
  switch (action.type) {
  case TABLE_RESIZE:
    field= action.data.type==='col' ? "colState" : 'rowState'
    return {...state, [field]: value(state, action, field)}
  case CHANGE_TEXT:
    field='dataState'
    return {...state,
      currentText: action.data.value,
      [field]: value(state, action, field)}
  case CURRENT_STYLE:
    return {...state, currentStyles: action.data}
  case APPLY_STYLE:
    field='stylesState'
    val=state[field] ||{}
    action.data.ids.forEach((id) => {
      val[id]={...val[id], ...action.data.value}
    })
    return {...state, [field]: val,
      currentStyles: {...state.currentStyles, ...action.data.value}}
  case CHANGE_TABLE_NAME:
    return {...state, tableName: action.data}
  case LAST_TIME_OPENED:
    return {...state, lastTimeOpened: new Date().toJSON()}
  default:
    return state
  }
}
function value(state, action, field) {
  const val=state[field] || {}
  val[action.data.id]=action.data.value
  return val
}
