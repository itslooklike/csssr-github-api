import { SET_REPO_USERNAME, SET_REPO_REPONAME } from '../constants/ActionTypes'

const initialState = {
  userName: 'facebook',
  repoName: 'react',
}

const issues = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_REPO_USERNAME:
      return { ...state, userName: payload }
    case SET_REPO_REPONAME:
      return { ...state, repoName: payload }
    default:
      return state
  }
}

export default issues
