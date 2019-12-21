import React, { useState } from 'react'

// Externals
import classNames from 'classnames'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'

// Material helpers
import { withStyles, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'

// Material components
import { Drawer } from '@material-ui/core'

// Custom components
import { Sidebar, Topbar } from './components'

// Component styles
import styles from './styles'

const Dashboard = props => {
  const theme = useTheme()
  const isMobile = !useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  })

  const [isOpen, setOpenSidebar] = useState(!isMobile)

  const handleClose = () => {
    setOpenSidebar(false)
  }

  const handleToggleOpen = () => {
    setOpenSidebar(!isOpen)
  }

  const { classes, title, children } = props
  const shiftTopbar = isOpen && !isMobile
  const shiftContent = isOpen && !isMobile

  return (
    <>
      <Topbar
        className={classNames(classes.topbar, {
          [classes.topbarShift]: shiftTopbar,
        })}
        isSidebarOpen={isOpen}
        onToggleSidebar={handleToggleOpen}
        title={title}
      />
      <Drawer
        anchor={'left'}
        classes={{ paper: classes.drawerPaper }}
        onClose={handleClose}
        open={isOpen}
        variant={isMobile ? 'temporary' : 'persistent'}
      >
        <Sidebar className={classes.sidebar} />
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: shiftContent,
        })}
      >
        {children}
      </main>
    </>
  )
}

Dashboard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
}

export default compose(withStyles(styles))(Dashboard)
