import React from "react";
// Material components
import { Typography } from "@material-ui/core";
import styles from "./styles";
import { withStyles } from "@material-ui/core";

export default withStyles(styles)(props => {
  let { classes } = props;
  return (
    <div className={classes.quote}>
      <div className={classes.quoteInner}>
        <Typography className={classes.quoteText} variant="h1">
          Welcome, We glad to You to present this platphorm. You can use this as
          you like
        </Typography>
        {/* <div className={classes.person}>
          <Typography className={classes.name} variant="body1">
            Islamic
          </Typography>
          <Typography className={classes.bio} variant="body2">
            Manager at inVision
          </Typography>
        </div> */}
      </div>
    </div>
  );
});
