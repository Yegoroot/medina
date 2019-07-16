import React, { Component } from "react";
// Externals
import PropTypes from "prop-types";

// redux
import { connect } from "react-redux";
import { signIn } from "ducks/auth";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import { configFirebase } from "common/firebase.config";
firebase.initializeApp(configFirebase);

class SignIn extends Component {
  _isMounted = false; // for fierbase load

  componentDidMount() {
    this._isMounted = true;

    const { signIn } = this.props;

    this.removeAuthObserver = firebase.auth().onAuthStateChanged(user => {
      console.log("AUTH COMPONENT", user);
      if (this._isMounted) {
        // отправляем или null или object
        signIn(user);
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.removeAuthObserver();
  }
  render() {
    return <h1> sdfsdf </h1>;
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func,
  auth: PropTypes.any
};

export default connect(
  state => ({
    auth: state.auth
  }),
  {
    signIn
  }
)(SignIn);
