import axios from 'axios'
import { ISSUES_FETCHING_START, ISSUES_FETCHING_END } from '../constants/ActionTypes'
import { API_GITHUB } from '../constants/Api'

export const getIssues = dispatch => async (user, rep, amount) => {
  const url = API_GITHUB + `/repos/${user}/${rep}/issues?per_page=${amount}`

  dispatch({
    type: ISSUES_FETCHING_START,
  })

  const { data } = await axios.get(url)

  dispatch({
    type: ISSUES_FETCHING_END,
    payload: data,
  })
}
