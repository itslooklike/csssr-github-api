import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import repo from './repo'
import issues from './issues'
import singleIssue from './singleIssue'

export default combineReducers({ repo, issues, singleIssue, router: routerReducer })
