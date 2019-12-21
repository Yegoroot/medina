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

const App = ({ locale }) => {
  return (
    <ConnectedRouter history={history}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <>
          <Routes />
        </>
      </IntlProvider>
    </ConnectedRouter>
  )
}

export default connect(state => ({
  locale: state.intl.locale,
}))(App)
