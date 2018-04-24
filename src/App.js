import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import PageMain from './containers/PageMain'
import reducers from './reducers'
import './index.css'

const history = createHistory()
const historyMiddleware = routerMiddleware(history)
const middleware = applyMiddleware(historyMiddleware)
const store = createStore(reducers, composeWithDevTools(middleware))

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <PageMain />
          </ConnectedRouter>
        </Provider>
      </BrowserRouter>
    )
  }
}

export default App
