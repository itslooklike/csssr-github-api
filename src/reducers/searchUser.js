import { SEARCH_USER_START, SEARCH_USER_END } from '../constants/ActionTypes'

const initialState = {
  fetching: false,
  data: null,
}

const searchUser = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_USER_START:
      return { ...state, fetching: true }
    case SEARCH_USER_END:
      return { ...state, fetching: false, data: payload }
    default:
      return state
  }
}

export default searchUser
