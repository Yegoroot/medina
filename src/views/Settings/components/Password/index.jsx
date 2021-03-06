import React, { Component } from 'react'

// Externals
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Material helpers
import { withStyles } from '@material-ui/core'

// Material components
import { Button, TextField } from '@material-ui/core'

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter,
} from 'components'

// localisation
import { FormattedMessage } from 'react-intl'

// Component styles
import styles from './styles'
import { changeLocale } from 'ducks/intl'
import { connect } from 'react-redux'
class Password extends Component {
  state = {
    values: {
      password: '',
      confirm: '',
    },
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state }

    newState.values[field] = value

    this.setState(newState, this.validateForm)
  }

  render() {
    const { classes, className, changeLocale, ...rest } = this.props
    const { values } = this.state

    const rootClassName = classNames(classes.root, className)

    // const handleChangeLocale = locale => changeLocale(locale)

    const ButtonChooseLanguage = locale => {
      return (
        <Button
          onClick={() => changeLocale(locale)}
          color="primary"
          variant="outlined"
        >
          <FormattedMessage
            id="SettingsComponent.buttonChangeLanguage"
            defaultMessage={'change language'}
          />{' '}
          {locale}
        </Button>
      )
    }

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel subtitle="Update password" title="Password" />
        </PortletHeader>
        <PortletContent>
          <form className={classes.form}>
            <TextField
              className={classes.textField}
              label="Password"
              name="password"
              onChange={event =>
                this.handleFieldChange('password', event.target.value)
              }
              type="password"
              value={values.password}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              label="Confirm password"
              name="confirm"
              onChange={event =>
                this.handleFieldChange('confirm', event.target.value)
              }
              type="password"
              value={values.confirm}
              variant="outlined"
            />
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          {['ar', 'ru', 'en'].map(locale => {
            return ButtonChooseLanguage(locale)
          })}
        </PortletFooter>
      </Portlet>
    )
  }
}

Password.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
}

export default connect(null, { changeLocale })(withStyles(styles)(Password))
