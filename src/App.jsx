import React from 'react'

/** history */
import { ConnectedRouter } from 'connected-react-router'
import history from './common/history'

/** some styles */
import 'react-perfect-scrollbar/dist/css/styles.css' // Styles
import './assets/scss/index.scss' // Styles

/** routes  */
import Routes from './Routes' // Routes

/** localisation */
import { IntlProvider } from 'react-intl'
import messages from './languages/messages'

// get date from redux
import { connect } from 'react-redux'

import { ThemeProvider } from '@material-ui/styles'
import getTheme from './theme'

const App = ({ locale }) => {
  const theme = getTheme(locale)
  return (
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          {/* 
            если поставить тут то, нужно убрать в ф-ии getTheme()
          <div dir={locale === 'ar' ? 'rtl' : 'ltr'}> */}
          <>
            <Routes />
          </>
          {/* </div> */}
        </IntlProvider>
      </ConnectedRouter>
    </ThemeProvider>
  )
}

export default connect(state => ({
  locale: state.intl.locale,
}))(App)
