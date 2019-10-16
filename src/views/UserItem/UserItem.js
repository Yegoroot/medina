import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, IconButton } from "@material-ui/core";
import { ArrowForward as ArrowNextIcon } from "@material-ui/icons";

import { AccountProfile, AccountDetails } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = props => {
  const classes = useStyles();

  const uid = props.match.params.id;

  return (
    <div className={classes.root}>
      <div
        // className={classes.contentHeader}
        onClick={() => props.history.goBack()}
        style={{
          flexDirection: "row-reverse",
          display: "flex",
          paddingBottom: 10
        }}
      >
        <IconButton className={classes.backButton}>
          <ArrowNextIcon />
        </IconButton>
      </div>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountProfile uid={uid} />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails uid={uid} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
