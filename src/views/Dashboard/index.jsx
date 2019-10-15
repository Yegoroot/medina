import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Grid } from "@material-ui/core";

// Custom components
import {
  Budget,
  Users,
  Progress,
  Profit,
  ProjectList,
  OrdersTable
} from "./components";

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  item: {
    height: "100%"
  }
});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget className={classes.item} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Users className={classes.item} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Progress className={classes.item} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Profit className={classes.item} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <ProjectList className={classes.item} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <OrdersTable className={classes.item} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
