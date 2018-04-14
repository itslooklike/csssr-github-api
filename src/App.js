import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom'
import PageMain from './containers/PageMain'
import reducers from './reducers'
import './index.css'

const store = createStore(reducers, composeWithDevTools(applyMiddleware()))

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <PageMain />
        </Provider>
      </BrowserRouter>
    )
  }
}

export default App
