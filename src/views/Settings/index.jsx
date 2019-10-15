import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Grid } from "@material-ui/core";

// Custom components
import { Permissions, Password } from "./components";

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

class Settings extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item md={7} xs={12}>
            <Permissions />
          </Grid>
          <Grid item md={5} xs={12}>
            <Password />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
