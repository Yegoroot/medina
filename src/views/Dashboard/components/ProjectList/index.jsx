import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import compose from "recompose/compose";
import { getProjectList } from "ducks/projects";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import {
  Button,
  IconButton,
  Typography,
  CircularProgress
} from "@material-ui/core";

// Material icons
import {
  ArrowRight as ArrowRightIcon,
  MoreVert as MoreVertIcon
} from "@material-ui/icons";

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from "components";

// Component styles
import styles from "./styles";

class ProjectList extends Component {
  signal = true;

  componentDidMount() {
    this.signal = true;

    this.props.getProjectList(4);
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
      <Fragment>
        {projects.map((project, i) => (
          <div className={classes.project} key={i}>
            <div className={classes.projectImageWrapper}>
              <img
                alt="Project Name"
                className={classes.projectImage}
                src={project.imageUrl}
              />
            </div>
            <div className={classes.projectDetails}>
              <Link to="#">
                <Typography className={classes.projectTitle} variant="h5">
                  {project.title}
                </Typography>
              </Link>
              <Typography className={classes.projectTimestamp} variant="body2">
                Updated 5hr ago
              </Typography>
            </div>
            <div>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }

  render() {
    /*eslint-disable */
    // вытаскиеваем getProjectList, чтоб он не передовался в Portlet
    const { classes, className, getProjectList, ...rest } = this.props;
    /*eslint-enable */
    const { projectsTotal } = this.props.projects;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel
            subtitle={`${projectsTotal} in total`}
            title="Latest projects"
          />
        </PortletHeader>
        <PortletContent className={classes.portletContent}>
          {this.renderProjects()}
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button color="primary" size="small" variant="text">
            View all <ArrowRightIcon />
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

ProjectList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  getProjectList: PropTypes.func.isRequired
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
