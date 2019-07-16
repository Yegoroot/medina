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
import { moduleName, signOut } from "ducks/auth";

class SignIn extends Component {
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

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;
    this.setState(newState, this.validateForm);
  };

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
            <button onClick={() => this.props.signOut()}>
              Sign Out{" "}
              {this.props.auth.profile
                ? this.props.auth.profile.displayName
                : ""}
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
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired
};

export default compose(
  connect(
    state => ({
      auth: state[moduleName]
    }),
    { signOut }
  ),
  withStyles(styles)
)(SignIn);
