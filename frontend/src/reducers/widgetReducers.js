import {
  WIDGET_LIST_REQUEST,
  WIDGET_ADD_ITEM,
  WIDGET_EDIT_ITEM,
  WIDGET_REMOVE_ITEM,
} from '../constants/widgetConstants'

export const widgetReducer = (state = { widgetItems: [] }, action) => {
  switch (action.type) {
    case WIDGET_LIST_REQUEST:
      return {
        ...state,
        widgetItems: [...state.widgetItems],
      }

    case WIDGET_ADD_ITEM:
      const item = action.payload

      return {
        ...state,
        widgetItems: [...state.widgetItems, item],
      }
    case WIDGET_EDIT_ITEM:
      const widgetItemd = action.payload

      console.log(action.payload.id)

      const index = state.widgetItems.findIndex(
        (el) => el.id === action.payload.id
      )
      state.widgetItems[index] = action.payload

      return {
        ...state,
        widgetItems: state.widgetItems,
      }

    case WIDGET_REMOVE_ITEM:
      return {
        ...state,
        widgetItems: state.widgetItems.filter((x) => x.id !== action.payload),
      }
    default:
      return state
  }
}
