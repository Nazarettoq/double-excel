import { defaultStyles, newTable } from "@core/constants"
import { clone } from "@core/utils"

const defaultState={
  tableName: newTable,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  lastTimeOpened: new Date().toJSON(),
}
const normalize=(state)=>({
  ...state,
  currentStyles: defaultState,
  currentText: '',
})

export function normalizeInitialState(state) {
  return state ? normalize(state):
    clone(defaultState)
}
