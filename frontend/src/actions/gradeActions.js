import axios from 'axios'

import {
  GRADE_LIST_REQUEST,
  GRADE_LIST_SUCCESS,
  GRADE_LIST_FAIL,
} from '../constants/gradeConstants'

export const listGrades = () => async (dispatch) => {
  try {
    dispatch({ type: GRADE_LIST_REQUEST })

    const { data } = await axios.get('/api/grades')

    dispatch({
      type: GRADE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GRADE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
