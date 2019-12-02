import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AccountProfile, AccountDetails } from "./components";
import { ButtonBack } from "components";

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
      <ButtonBack />

      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountProfile uid={uid} />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails uid={uid} />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <Link to={`/users/${uid}/articles`}> This articles's blog </Link>
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          {/* ---------------- */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
