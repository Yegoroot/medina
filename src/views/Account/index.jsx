import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Redux
import { connect } from "react-redux";

// compotition with function
import compose from "recompose/compose";

// Material components
import { Grid } from "@material-ui/core";

// Shared layouts
import { Dashboard as DashboardLayout } from "layouts";

// Custom components
import { AccountProfile, AccountDetails } from "./components";

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

class Account extends Component {
  state = { tabIndex: 0 };

  render() {
    const { classes, auth } = this.props;

    console.log("Auth", auth);

    return (
      <DashboardLayout title="Account">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={4} md={6} xl={4} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xl={8} xs={12}>
              <AccountDetails />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  connect(
    state => ({
      auth: state.auth
    })
    // {}
  ),
  withStyles(styles)
)(Account);
