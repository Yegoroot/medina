import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { IconButton } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import {
  ArrowBack
  //  ArrowForward,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    paddingBottom: 20
    // flexDirection: "row-reverse",
  },
  icon: {
    marginLeft: -theme.spacing(1)
  }
}));

const ButtonBack = props => {
  const { className } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <IconButton
        className={classes.icon}
        onClick={() => props.history.goBack()}
      >
        <ArrowBack />
      </IconButton>
    </div>
  );
};

ButtonBack.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
};

ButtonBack.defaultProps = {
  // mode: "grid",
  // onChange: () => {}
};

export default withRouter(ButtonBack);
