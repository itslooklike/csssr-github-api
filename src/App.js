import React from 'react'
import PageMain from './containers/PageMain'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'
import './index.css'

const store = createStore(reducers, composeWithDevTools(applyMiddleware()))

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <PageMain />
      </Provider>
    )
  }
}

export default App
