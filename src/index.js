import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './common/serviceWorker' // Service worker

// initial firebase
import 'common/firebase.config'

//App
import App from './App'

// theme for materail ui
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import store from './redux'
import { Provider } from 'react-redux'
// import { Provider } from 'react-intl-redux'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.querySelector('#root')
)

serviceWorker.unregister()
