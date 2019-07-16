import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

// redux
import { connect } from "react-redux";
import { addUser, moduleName } from "ducks/users";

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }

  onChange(key, value) {
    let newState = this.state;
    newState[key] = value;
    this.setState(newState);
  }

  onAdded() {
    const { addUser } = this.props;
    console.log(this.state);
    addUser(this.state);
  }

  render() {
    let { open, handleClose } = this.props;
    let { name, email } = this.state;
    return (
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Added New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            onChange={e => this.onChange("name", e.target.value)}
            value={name}
            margin="dense"
            id="name"
            label="Name "
            type="name"
            fullWidth
          />
          <TextField
            onChange={e => this.onChange("email", e.target.value)}
            value={email}
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.onAdded()} color="primary">
            Added
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default connect(
  state => ({
    users: state[moduleName]
  }),
  { addUser }
)(FormDialog);
