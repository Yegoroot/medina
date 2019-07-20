import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";

import { moduleName, messageClear } from "ducks/message";
import { connect } from "react-redux";
import readingTime from "reading-time";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

function CustomizedSnackbars(props) {
  const classes = useStyles2();

  const { open, message, position, variant } = props.message;
  const { messageClear } = props;

  if (!props.message) return null;

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    messageClear(); // from REDUX
  }

  return (
    <Snackbar
      anchorOrigin={position}
      open={open}
      autoHideDuration={readingTime(message).time * 3}
      onClose={handleClose}
    >
      <MySnackbarContentWrapper
        className={classes.margin}
        onClose={handleClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
}

CustomizedSnackbars.propTypes = {
  messageClear: PropTypes.func, // redux action
  message: PropTypes.exact({
    message: PropTypes.any,
    position: PropTypes.object,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
  })
};

export default connect(
  state => ({
    message: state[moduleName]
  }),
  { messageClear }
)(CustomizedSnackbars);
