import React from "react";
import { Route, Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { moduleName } from "ducks/auth";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/sign-in", state: { from: props.location } }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  location: PropTypes.any,
  component: PropTypes.any,
  auth: PropTypes.object.isRequired
};

// withRouter for get ride of error in console
export default //  withRouter(
connect(state => ({
  auth: state[moduleName]
}))(PrivateRoute);
// );
