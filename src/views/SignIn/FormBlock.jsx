import React from "react";
import { Link, withRouter } from "react-router-dom";
import compose from "recompose/compose";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import PropTypes from "prop-types";

import {
  Typography,
  // Button,
  IconButton,
  TextField
} from "@material-ui/core";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class FormBlock extends React.Component {
  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    let {
      classes,
      values,
      touched,
      // isValid,
      submitError,
      errors,
      handleFieldChange,
      // handleSignIn,
      firebase,
      uiConfig
    } = this.props;

    const showEmailError = touched.email && errors.email;
    const showPasswordError = touched.password && errors.password;

    return (
      <div className={classes.content}>
        <div className={classes.contentHeader}>
          <IconButton className={classes.backButton} onClick={this.handleBack}>
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
                  handleFieldChange("email", event.target.value)
                }
                type="text"
                value={values.email}
                variant="outlined"
              />
              {showEmailError && (
                <Typography className={classes.fieldError} variant="body2">
                  {errors.email[0]}
                </Typography>
              )}
              <TextField
                className={classes.textField}
                label="Password"
                name="password"
                onChange={event =>
                  handleFieldChange("password", event.target.value)
                }
                type="password"
                value={values.password}
                variant="outlined"
              />
              {showPasswordError && (
                <Typography className={classes.fieldError} variant="body2">
                  {errors.password[0]}
                </Typography>
              )}
            </div>
            {submitError && (
              <Typography className={classes.submitError} variant="body2">
                {submitError}
              </Typography>
            )}
            {/* {isLoading ? (
                <CircularProgress className={classes.progress} />
              ) : (
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!isValid}
                  onClick={handleSignIn}
                  size="large"
                  variant="contained"
                >
                  Sign in now
                </Button>
              )} */}
            <Typography className={classes.signUp} variant="body1">
              Dont have an account?{" "}
              <Link className={classes.signUpUrl} to="/sign-up">
                Sign up
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    );
  }
}

FormBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  values: PropTypes.object,
  isValid: PropTypes.any,
  submitError: PropTypes.any,
  errors: PropTypes.object,
  history: PropTypes.object.isRequired,
  className: PropTypes.string,
  handleFieldChange: PropTypes.func,
  touched: PropTypes.object,
  handleSignIn: PropTypes.func,
  firebase: PropTypes.any,
  uiConfig: PropTypes.object
};

export default compose(
  withRouter,
  withStyles(styles)
)(FormBlock);
