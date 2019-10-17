import React from "react";

import {
  Button,
  TextField,
  Dialog,
  Grid,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions
} from "@material-ui/core";
// import PropTypes from 'prop-types';

// redux
import { connect } from "react-redux";
import { addUser, moduleName, handleModalAddUser } from "ducks/users";

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      nickname: "",
      interests: "",
      phone: "",
      country: "",
      city: "",
      dateBirth: ""
    };
  }

  onChange(key, value) {
    let newState = this.state;
    newState[key] = value;
    this.setState(newState);
  }

  onAdded() {
    this.props.addUser(this.state);
  }

  render() {
    const { users, handleModalAddUser } = this.props;
    let {
      name,
      email,
      nickname,
      interests,
      phone,
      country,
      city,
      dateBirth
    } = this.state;
    return (
      <Dialog
        fullWidth={true}
        maxWidth={false}
        open={users.isOpenModalAddUser}
        onClose={() => handleModalAddUser(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Added New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Grid container>
            <Grid md={6} lg={3} item>
              <TextField
                autoFocus
                onChange={e => this.onChange("name", e.target.value)}
                value={name}
                id="name"
                label="Name"
                type="name"
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid md={6} lg={3} item>
              <TextField
                onChange={e => this.onChange("nickname", e.target.value)}
                value={nickname}
                id="nickname"
                label="NickName"
                margin="dense"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid md={6} lg={3} item>
              <TextField
                onChange={e => this.onChange("interests", e.target.value)}
                value={interests}
                id="interests"
                label="Interests"
                type="text"
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid md={6} lg={3} item>
              <TextField
                onChange={e => this.onChange("phone", e.target.value)}
                value={phone}
                margin="dense"
                id="phone"
                label="Phone"
                type="phone"
                fullWidth
              />
            </Grid>
            <Grid md={6} lg={3} item>
              <TextField
                onChange={e => this.onChange("country", e.target.value)}
                value={country}
                margin="dense"
                id="country"
                label="Country"
                type="country"
                fullWidth
              />
            </Grid>
            <Grid md={6} lg={3} item>
              <TextField
                onChange={e => this.onChange("city", e.target.value)}
                value={city}
                margin="dense"
                id="city"
                label="City"
                type="city"
                fullWidth
              />
            </Grid>
            <Grid md={6} lg={3} item>
              <TextField
                onChange={e => this.onChange("email", e.target.value)}
                value={email}
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
              />
            </Grid>
            <Grid md={6} lg={3} item>
              <TextField
                onChange={e => this.onChange("dateBirth", e.target.value)}
                value={dateBirth}
                margin="dense"
                id="dateBirth"
                label="Date Birth"
                type="dateBirth"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModalAddUser(false)} color="primary">
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
  // open: PropTypes.bool.isRequired,
  // handleClose: PropTypes.func.isRequired
};

export default connect(
  state => ({
    users: state[moduleName]
  }),
  { addUser, handleModalAddUser }
)(FormDialog);
