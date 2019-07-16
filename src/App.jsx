import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import store from "./redux";
import history from "./common/history";

import "react-perfect-scrollbar/dist/css/styles.css"; // Styles
import "./assets/scss/index.scss"; // Styles

// import AuthFirebase from "components/AuthFirebase/AuthFirebase";

import Routes from "./Routes"; // Routes

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <>
            {/* <AuthFirebase /> */}
            <Routes />
          </>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
