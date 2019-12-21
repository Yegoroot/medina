export default theme => {
  let rtl = theme.direction === 'rtl'
  return {
    root: {
      borderBottom: `1px solid ${theme.palette.border}`,
      backgroundColor: theme.palette.white,
      display: 'flex',
      alignItems: 'center',
      height: '64px',
      zIndex: theme.zIndex.appBar,
    },
    toolbar: {
      minHeight: 'auto',
      width: '100%',
      flexDirection: 'row',
    },
    title: {
      marginLeft: theme.spacing(),
    },
    menuButton: {
      marginLeft: '-4px',
    },
    notificationsButton: {
      [rtl ? 'margin-right' : 'margin-left']: 'auto',
    },
    signOutButton: {
      marginLeft: theme.spacing(),
    },
  }
}
