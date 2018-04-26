import { SEARCH_REPO_START, SEARCH_REPO_END } from '../constants/ActionTypes'

const initialState = {
  fetching: false,
  data: null,
}

const searchRepo = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_REPO_START:
      return { ...state, fetching: true }
    case SEARCH_REPO_END:
      return { ...state, fetching: false, data: payload }
    default:
      return state
  }
}

export default searchRepo
