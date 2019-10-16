import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { CircularProgress, Typography } from "@material-ui/core";

// Shared services
import { getUsers, getUser } from "ducks/users";

// Custom components
import { UsersToolbar, UsersTable } from "./components";

// Component styles
import styles from "./style";

import { connect } from "react-redux";

class UserList extends Component {
  state = {
    selectedUsers: []
  };

  componentDidMount() {
    this.props.getUsers(10);
  }

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  renderUsers() {
    const { classes } = this.props;
    console.log(this.props);
    const {
      isLoadingGetUsers,
      users
      // error
    } = this.props.users;

    if (isLoadingGetUsers) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    // if (error) {
    //   return <Typography variant="h6">{error}</Typography>;
    // }

    if (users.length === 0) {
      return <Typography variant="h6">There are no users</Typography>;
    }

    return (
      <UsersTable
        //
        getUser={(id) => this.props.getUser(id)}
        onSelect={this.handleSelect}
        users={users}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedUsers } = this.state;

    return (
      <div className={classes.root}>
        <UsersToolbar selectedUsers={selectedUsers} />
        <div className={classes.content}>{this.renderUsers()}</div>
      </div>
    );
  }
}

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({
    users: state.users
  }),
  { getUsers, getUser }
)(withStyles(styles)(UserList));
