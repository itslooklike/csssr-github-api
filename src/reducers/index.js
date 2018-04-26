import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import repo from './repo'
import issues from './issues'
import singleIssue from './singleIssue'
import searchUser from './searchUser'
import searchRepo from './searchRepo'

export default combineReducers({
  repo,
  issues,
  singleIssue,
  searchUser,
  searchRepo,
  router: routerReducer,
})
