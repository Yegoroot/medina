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

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.querySelector('#root')
)

serviceWorker.unregister()
