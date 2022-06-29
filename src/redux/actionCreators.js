import {CHANGE_TEXT, TABLE_RESIZE, APPLY_STYLE, CURRENT_STYLE,
  CHANGE_TABLE_NAME, LAST_TIME_OPENED} from "./types"

export function tableResizeAC(data) {
  return {
    type: TABLE_RESIZE, data,
  }
}
export function changeTextAC(data) {
  return {
    type: CHANGE_TEXT, data,
  }
}
export function applyStyleAC(data) {
  return {
    type: APPLY_STYLE,
    data,
  }
}
export function changeStylesAC(data) {
  return {
    type: CURRENT_STYLE,
    data,
  }
}
export function changeTableNameAC(data) {
  return {
    type: CHANGE_TABLE_NAME,
    data,
  }
}
export function lastTimeOpenedAC() {
  return {
    type: LAST_TIME_OPENED,
  }
}
