import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import PropTypes from "prop-types";

import {
  Typography,
  IconButton,
  TextField,
  Grid,
  Button
} from "@material-ui/core";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import validate from "validate.js";

import _ from "underscore";

import firebase from "firebase/app";
import "firebase/auth";
import { signIn, moduleName, signInSocial } from "ducks/auth";
import { connect } from "react-redux";

import {
  LaunchScreen
  // Snackbar
} from "components";
import { messageShow } from "ducks/message";

// Building block
import ImgBlock from "./ImgBlock";

// Form validation schema
import schema from "./schema";

class SignIn extends React.Component {
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

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = errors ? false : true;

    this.setState(newState);
  }, 300);

  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleSignIn = () => {
    let { email, password } = this.state.values;
    this.props.signIn(email, password);
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;
    this.setState(newState, this.validateForm);
  };

  // handleMessage = () => {
  //   this.props.messageShow({
  //     message:
  //       "hello and welcomw to another life in this place we can use something interersting",
  //     variant: "error",
  //     position: {
  //       vertical: "bottom",
  //       horizontal: "right"
  //     }
  //   });
  // };

  render() {
    let uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: data => {
          this.props.signInSocial(data);
          return false; // component need false in our case
        }
      }
    };

    let { classes, auth } = this.props;
    let { values, touched, isValid, submitError, errors } = this.state;

    const showEmailError = touched.email && errors.email;
    const showPasswordError = touched.password && errors.password;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteWrapper} item lg={5}>
            <ImgBlock classes={classes} />
          </Grid>

          <Grid className={classes.content} item lg={7} xs={12}>
            {/* <button onClick={this.handleMessage}>Message Show </button>
            <Snackbar /> */}

            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography className={classes.title} variant="h2">
                    Sign in
                  </Typography>
                  <Typography className={classes.subtitle} variant="body1">
                    Sign in with social media
                  </Typography>

                  {/* -------------------------------- */}
                  <div className="firebaseAuth">
                    <StyledFirebaseAuth
                      uiConfig={uiConfig}
                      firebaseAuth={firebase.auth()}
                    />
                  </div>
                  {/* -------------------------------- */}

                  <Typography className={classes.sugestion} variant="body1">
                    or login with email address
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      onChange={event =>
                        this.handleFieldChange("email", event.target.value)
                      }
                      type="text"
                      value={values.email}
                      variant="outlined"
                    />
                    {showEmailError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.email[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Password"
                      name="password"
                      onChange={event =>
                        this.handleFieldChange("password", event.target.value)
                      }
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    {showPasswordError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.password[0]}
                      </Typography>
                    )}
                  </div>
                  {submitError && (
                    <Typography className={classes.submitError} variant="body2">
                      {submitError}
                    </Typography>
                  )}
                  {auth.isLoading ? (
                    <LaunchScreen />
                  ) : (
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  )}
                  <Typography className={classes.signUp} variant="body1">
                    Dont have an account?{" "}
                    <Link className={classes.signUpUrl} to="/sign-up">
                      Sign up
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  className: PropTypes.string,
  auth: PropTypes.object,
  signIn: PropTypes.func,
  signInSocial: PropTypes.func,

  messageShow: PropTypes.func
};

export default compose(
  connect(
    state => ({
      auth: state[moduleName]
    }),
    { signIn, signInSocial, messageShow }
  ),
  withStyles(styles)
)(SignIn);
