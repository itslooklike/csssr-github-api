import { ISSUES_FETCHING_START, ISSUES_FETCHING_END } from '../constants/ActionTypes'

const initialState = {
  fetching: false,
  data: null,
}

const issues = (state = initialState, { type, payload }) => {
  switch (type) {
    case ISSUES_FETCHING_START:
      return { ...state, fetching: true }
    case ISSUES_FETCHING_END:
      return { ...state, fetching: false, data: payload }
    default:
      return state
  }
}

export default issues
