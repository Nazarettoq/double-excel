import { defaultStyles } from "@core/constants"
import { storage } from "@core/utils"

const defaultState={
  tableName: 'New table',
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
}
const normalize=(state)=>({
  ...state,
  currentStyles: defaultState,
  currentText: '',
})
export const initialState =storage('excel-state')?
  normalize(storage('excel-state')):
  defaultState
