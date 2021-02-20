import {
  GRADE_LIST_REQUEST,
  GRADE_LIST_SUCCESS,
  GRADE_LIST_FAIL,
} from '../constants/gradeConstants'

export const gradeListReducer = (state = { grades: [] }, action) => {
  switch (action.type) {
    case GRADE_LIST_REQUEST:
      return { loading: true, grades: [] }
    case GRADE_LIST_SUCCESS:
      return { loading: false, grades: action.payload }
    case GRADE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
