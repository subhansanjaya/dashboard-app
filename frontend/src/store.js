import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { studentListReducer } from './reducers/studentReducers'
import { gradeListReducer } from './reducers/gradeReducers'
import { subjectListReducer } from './reducers/subjectReducers'
import { widgetReducer } from './reducers/widgetReducers'

const reducer = combineReducers({
  studentList: studentListReducer,
  gradeList: gradeListReducer,
  subjectList: subjectListReducer,
  widgetList: widgetReducer,
})

const widgetItemsFromStorage = localStorage.getItem('widgetItems')
  ? JSON.parse(localStorage.getItem('widgetItems'))
  : []

const initialState = {
  widgetList: {
    widgetItems: widgetItemsFromStorage,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
