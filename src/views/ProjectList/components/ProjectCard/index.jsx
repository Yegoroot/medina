import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Typography, Divider } from "@material-ui/core";

// Material icons
import {
  AccessTime as AccessTimeIcon,
  GetApp as GetAppIcon
} from "@material-ui/icons";

// Shared components
import { Paper } from "components";

// Component styles
import styles from "./styles";

class ProjectCard extends Component {
  render() {
    const { classes, className, project } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper className={rootClassName}>
        <div className={classes.imageWrapper}>
          <img alt="Project" className={classes.image} src={project.imageUrl} />
        </div>
        <div className={classes.details}>
          <Typography className={classes.title} variant="h4">
            {project.title}
          </Typography>
          <Typography className={classes.description} variant="body1">
            {project.description}
          </Typography>
        </div>
        <Divider />
        <div className={classes.stats}>
          <AccessTimeIcon className={classes.updateIcon} />
          <Typography className={classes.updateText} variant="body2">
            Updated 2hr ago
          </Typography>
          <GetAppIcon className={classes.downloadsIcon} />
          <Typography className={classes.downloadsText} variant="body2">
            {project.totalDownloads} Downloads
          </Typography>
        </div>
      </Paper>
    );
  }
}

ProjectCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectCard);
