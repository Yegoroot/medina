export default theme => {
  let rtl = theme.direction === 'rtl'
  return {
    topbar: {
      position: 'fixed',
      width: '100%',
      top: 0,
      left: 0,
      right: 'auto',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    topbarShift: {
      [rtl ? 'margin-right' : 'margin-left']: '271px',
      // marginRight: "271px" :,
      width: 'calc(-271px + 100vw)',
    },
    drawerPaper: {
      zIndex: 1200,
      width: '271px',
    },
    sidebar: {
      width: '270px',
      overflowX: 'auto',
    },
    content: {
      marginTop: '64px',
      // backgroundColor: theme.palette.background.default,
      backgroundColor: 'rgba(255, 255, 255, 0.96)',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      minHeight: 'calc(100vh - 64px)',
    },
    contentShift: {
      [rtl ? 'margin-right' : 'margin-left']: '270px',
      // marginRight: "270px"
    },
  }
}
