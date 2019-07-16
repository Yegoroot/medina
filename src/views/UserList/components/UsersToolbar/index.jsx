import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Button, IconButton } from "@material-ui/core";

// Material icons
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";

// Shared components
import { DisplayMode, SearchInput } from "components";

// Component styles
import styles from "./styles";

import { AddUserDialog } from "components";

class UsersToolbar extends Component {
  state = {
    open: false // modal
  };

  handlerOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, className, selectedUsers } = this.props;

    const rootClassName = classNames(classes.root, className);

    let { open } = this.state;

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          {selectedUsers.length > 0 && (
            <IconButton
              className={classes.deleteButton}
              onClick={this.handleDeleteUsers}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <Button
            className={classes.importButton}
            size="small"
            variant="outlined"
          >
            <ArrowDownwardIcon className={classes.importIcon} /> Import
          </Button>
          <Button
            className={classes.exportButton}
            size="small"
            variant="outlined"
          >
            <ArrowUpwardIcon className={classes.exportIcon} />
            Export
          </Button>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => this.handlerOpen()}
          >
            Add
          </Button>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search user"
          />
          <span className={classes.spacer} />
          <DisplayMode mode="list" />
        </div>

        <AddUserDialog open={open} handleClose={this.handleClose} />
      </div>
    );
  }
}

UsersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedUsers: PropTypes.array
};

UsersToolbar.defaultProps = {
  selectedUsers: []
};

export default withStyles(styles)(UsersToolbar);
