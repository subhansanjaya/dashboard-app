import axios from 'axios'
import {
  WIDGET_LIST_REQUEST,
  WIDGET_ADD_ITEM,
  WIDGET_EDIT_ITEM,
  WIDGET_REMOVE_ITEM,
} from '../constants/widgetConstants'

export const listWidgets = () => async (dispatch) => {
  dispatch({
    type: WIDGET_LIST_REQUEST,
  })
}

export const addToWidget = (
  id,
  widgetType,
  chartType,
  semester,
  grade,
  subject,
  student,
  year
) => async (dispatch, getState) => {
  dispatch({
    type: WIDGET_ADD_ITEM,
    payload: {
      id: id,
      widgetType: widgetType,
      chartType: chartType,
      semester: semester,
      grade: grade,
      subject: subject,
      student: student,
      year: year,
    },
  })

  // localStorage.setItem(
  //   'widgetItems',
  //   JSON.stringify(getState().widgetList.widgetItems)
  // )
}

export const editFromWidget = (
  id,
  widgetType,
  chartType,
  semester,
  grade,
  subject,
  student,
  year
) => async (dispatch, getState) => {
  dispatch({
    type: WIDGET_EDIT_ITEM,
    payload: {
      id: id,
      widgetType: widgetType,
      chartType: chartType,
      semester: semester,
      grade: grade,
      subject: subject,
      student: student,
      year: year,
    },
  })

  // localStorage.setItem(
  //   'widgetItems',
  //   JSON.stringify(getState().widgetList.widgetItems)
  // )
}

export const removeFromWidget = (id) => (dispatch, getState) => {
  dispatch({
    type: WIDGET_REMOVE_ITEM,
    payload: id,
  })

  // localStorage.setItem(
  //   'widgetItems',
  //   JSON.stringify(getState().widgetList.widgetItems)
  // )
}
