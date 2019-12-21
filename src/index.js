import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './common/serviceWorker' // Service worker

// initial firebase
import 'common/firebase.config'

import App from './App'

import store from './redux'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)

serviceWorker.unregister()
