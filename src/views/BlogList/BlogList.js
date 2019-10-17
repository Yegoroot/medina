import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const ProjectItem = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>{props.match.params.id}</h1>

      <Grid container spacing={4}>
        <Grid item sm={3} xs={12}>
          sdfsdf
        </Grid>
        <Grid item sm={9} xs={12}>
          dfgdfg
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectItem;
