import React, { Component } from "react";
// Externals
import PropTypes from "prop-types";
import compose from "recompose/compose";
import validate from "validate.js";
import _ from "underscore";
import { withStyles } from "@material-ui/core"; // Material helpers

// Material components
import { Grid } from "@material-ui/core";

import LaunchScreen from "components/LaunchScreen/LaunchScreen";

// Building block
import ImgBlock from "./ImgBlock";
import FormBlock from "./FormBlock";

// Component styles
import styles from "./styles";

// Form validation schema
import schema from "./schema";

// redux
import { connect } from "react-redux";
import { signIn } from "ducks/auth";
import { push } from "connected-react-router";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
// import { configFirebase } from "common/firebase.config";
// firebase.initializeApp(configFirebase);

class SignIn extends Component {
  _isMounted = false; // for fierbase load

  state = {
    // EMAIL FORM
    values: {
      email: "",
      password: ""
    },
    touched: {
      email: false,
      password: false
    },
    errors: {
      email: null,
      password: null
    },
    isValid: false,
    isLoading: false,
    submitError: null
  };

  // signInSuccessWithAuthResult = data => {
  //   console.log(data);
  //   // if (data.user) {
  //   // }
  //   return false;
  // };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: data => {
        // this.signInSuccessWithAuthResult(data);
      }
    }
  };

  signOut = () => {
    if (!this.props.auth.user) {
      return;
    } else {
      console.log("signOut");
      firebase.auth().signOut();
      signIn(null);
    }
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = errors ? false : true;

    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;
    this.setState(newState, this.validateForm);
  };

  // handleSignIn = async () => {
  //   try {
  //     const { history } = this.props;
  //     const { values } = this.state;

  //     this.setState({ isLoading: true });

  //     await signIn(values.email, values.password);

  //     localStorage.setItem("isAuthenticated", true);

  //     history.push("/dashboard");
  //   } catch (error) {
  //     this.setState({
  //       isLoading: false,
  //       serviceError: error
  //     });
  //   }
  // };

  render() {
    const { classes } = this.props;

    const { values, touched, errors, isValid, submitError } = this.state;

    const { isLoading } = this.props.auth;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteWrapper} item lg={5}>
            <ImgBlock classes={classes} />
          </Grid>

          <Grid className={classes.content} item lg={7} xs={12}>
            <button onClick={() => this.signOut()}>
              Sign Out{" "}
              {this.props.auth.user ? this.props.auth.user.displayName : ""}
            </button>
            {isLoading ? (
              <div style={{ minHeight: "100vh", position: "relative" }}>
                <LaunchScreen />
              </div>
            ) : (
              <FormBlock
                values={values}
                errors={errors}
                isValid={isValid}
                submitError={submitError}
                touched={touched}
                handleFieldChange={this.handleFieldChange}
                handleSignIn={this.handleSignIn}
                firebase={firebase}
                uiConfig={this.uiConfig}
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }

  componentDidMount() {
    this._isMounted = true;

    const {
      signIn
      //  push
    } = this.props;

    this.removeAuthObserver = firebase.auth().onAuthStateChanged(user => {
      console.log("firebase.auth().onAuthStateChanged USER - ", user);

      if (this._isMounted) {
        // если пользователь существует
        if (user) {
          // push("/account");
        }

        // отправляем или null или object
        signIn(user);
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.removeAuthObserver();
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  signIn: PropTypes.func,
  auth: PropTypes.any,
  push: PropTypes.func
};

export default compose(
  connect(
    state => ({
      auth: state.auth
    }),
    {
      signIn,
      push
    }
  ),
  withStyles(styles)
)(SignIn);
