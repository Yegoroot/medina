import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import compose from "recompose/compose";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import {
  IconButton,
  CircularProgress,
  Grid,
  Typography
} from "@material-ui/core";

// Material icons
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from "@material-ui/icons";

// Custom components
import { ProjectsToolbar, ProjectCard } from "./components";

// Component styles
import styles from "./styles";

import { getProjectList } from "ducks/projects";

class ProjectList extends Component {
  signal = true;

  componentDidMount() {
    this.signal = true;

    this.props.getProjectList(6);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderProjects() {
    const { classes } = this.props;

    const { isLoading, projects } = this.props.projects;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <Typography variant="h6">There are no projects available</Typography>
      );
    }

    return (
      <Grid container spacing={3}>
        {projects.map(project => (
          <Grid item key={project.id} lg={4} md={6} xs={12}>
            <Link to="#">
              <ProjectCard project={project} />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ProjectsToolbar />
        <div className={classes.content}>{this.renderProjects()}</div>
        <div className={classes.pagination}>
          <Typography variant="caption">1-6 of 20</Typography>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

ProjectList.propTypes = {
  classes: PropTypes.object.isRequired,
  getProjectList: PropTypes.func,
  projects: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
};

export default compose(
  connect(
    state => ({
      projects: state.projects
    }),
    { getProjectList }
  ),
  withStyles(styles)
)(ProjectList);
