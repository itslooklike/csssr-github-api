import { ISSUES_FETCHING_START, ISSUES_FETCHING_END } from '../constants/ActionTypes'
const api = 'https://api.github.com/repos/facebook/react/issues'

export const onSearchStart = dispatch => async () => {
  dispatch({
    type: ISSUES_FETCHING_START
  })

  const result = await fetch(api)
  const json = await result.json()
  console.log(json)

  dispatch({
    type: ISSUES_FETCHING_END,
    payload: json
  })
}
