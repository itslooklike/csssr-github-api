import { SINGLE_ISSUE_FETCHING_START, SINGLE_ISSUE_FETCHING_END } from '../constants/ActionTypes'

const initialState = {
  fetching: false,
  data: null,
}

const singleIssue = (state = initialState, { type, payload }) => {
  switch (type) {
    case SINGLE_ISSUE_FETCHING_START:
      return { ...state, fetching: true }
    case SINGLE_ISSUE_FETCHING_END:
      return { ...state, fetching: false, data: { ...state.data, ...payload } }
    default:
      return state
  }
}

export default singleIssue
