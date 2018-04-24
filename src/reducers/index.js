import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import issues from './issues'

export default combineReducers({ issues, router: routerReducer })
