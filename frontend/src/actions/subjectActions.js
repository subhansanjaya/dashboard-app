import axios from 'axios'

import {
  SUBJECT_LIST_REQUEST,
  SUBJECT_LIST_SUCCESS,
  SUBJECT_LIST_FAIL,
} from '../constants/subjectConstants'

export const listSubjects = () => async (dispatch) => {
  try {
    dispatch({ type: SUBJECT_LIST_REQUEST })

    const { data } = await axios.get('/api/subjects')

    dispatch({
      type: SUBJECT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUBJECT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
