import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import repo from './repo'
import issues from './issues'

export default combineReducers({ repo, issues, router: routerReducer })
