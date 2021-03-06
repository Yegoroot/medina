import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { getUser } from 'ducks/users'

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex',
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}))

const AccountProfile = props => {
  const { className, uid, user, getUser, ...rest } = props

  const classes = useStyles()

  useEffect(() => {
    getUser(uid)
  }, [getUser, uid])

  return !user ? (
    <LinearProgress />
  ) : (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              John Doe {props.uid}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.city}, {user.country}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')} ({user.timezone})
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={user.avatar} />
        </div>
        {/* <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress value={70} variant="determinate" />
        </div> */}
      </CardContent>
      <Divider />
      <CardActions>
        <Button className={classes.uploadButton} color="primary" variant="text">
          Invite To Disscus
        </Button>
        {/* <Button variant="text">Remove picture</Button> */}
      </CardActions>
    </Card>
  )
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  getUser: PropTypes.func,
}

export default connect(
  state => ({
    user: state.users.user,
  }),
  { getUser }
)(AccountProfile)
