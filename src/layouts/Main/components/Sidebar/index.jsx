import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

// Externals
import classNames from 'classnames'
import PropTypes from 'prop-types'

// Material helpers
import { withStyles } from '@material-ui/core'

// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core'

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  // PeopleOutlined as PeopleIcon,
  // ShoppingBasketOutlined as ShoppingBasketIcon,
  InfoOutlined as InfoIcon,
  AccountBoxOutlined as AccountBoxIcon,
  SettingsOutlined as SettingsIcon,
} from '@material-ui/icons'

import styles from './styles'

/*eslint-disable */
const AdapterLink = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
))
/*eslint-enable */

class Sidebar extends Component {
  render() {
    const { classes, className } = this.props

    const rootClassName = classNames(classes.root, className)

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link className={classes.logoLink} to="/">
            {/* <img
              alt="Brainalytica logo"
              className={classes.logoImage}
              src="/images/logos/brainalytica_logo.svg"
            /> */}
            طالب الاسلم
          </Link>
        </div>
        <Divider className={classes.logoDivider} />
        <div className={classes.profile}>
          <Link to="/account">
            <Avatar
              alt="Roman Kutepov"
              className={classes.avatar}
              src="/images/avatars/avatar_11.jpg"
            />
          </Link>
          <Typography className={classes.nameText} variant="h6">
            Roman Kutepov
          </Typography>
          <Typography className={classes.bioText} variant="caption">
            Brain Director
          </Typography>
        </div>
        <Divider className={classes.profileDivider} />
        <List component="div" disablePadding>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={AdapterLink}
            to="/grammar"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Grammar"
            />
          </ListItem>
          {/* <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={AdapterLink}
            to="/users"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Users"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={AdapterLink}
            to="/projects"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Projects"
            />
          </ListItem> */}
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={AdapterLink}
            to="/account"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Account"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={AdapterLink}
            to="/settings"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Settings"
            />
          </ListItem>
        </List>
        <Divider className={classes.listDivider} />
        <List
          component="div"
          disablePadding
          subheader={
            <ListSubheader className={classes.listSubheader}>
              Support
            </ListSubheader>
          }
        >
          <ListItem
            className={classes.listItem}
            component="a"
            href="https://devias.io/contact-us"
            target="_blank"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Customer support"
            />
          </ListItem>
        </List>
      </nav>
    )
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Sidebar)
