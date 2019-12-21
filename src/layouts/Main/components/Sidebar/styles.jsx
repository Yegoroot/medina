export default theme => {
  let rtl = theme.direction === 'rtl'
  return {
    root: {
      backgroundColor: theme.palette.white,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingLeft: theme.spacing(),
      paddingRight: theme.spacing(),
    },
    logoWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '63px',
      flexShrink: 0,
    },
    logoLink: {
      fontSize: 30,
    },
    logoImage: {
      cursor: 'pointer',
    },
    logoDivider: {
      marginBottom: theme.spacing(2),
    },
    profile: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: 'fit-content',
    },
    avatar: {
      width: '100px',
      height: '100px',
    },
    nameText: {
      marginTop: theme.spacing(2),
    },
    bioText: {},
    profileDivider: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    listSubheader: {
      textAlign: rtl ? 'right' : 'left',
      color: theme.palette.text.secondary,
    },
    listItem: {
      textAlign: rtl ? 'right' : 'left',
      flexDirection: 'row',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        [rtl
          ? 'border-right'
          : 'border-left']: `4px solid ${theme.palette.primary.main}`,
        // borderLeft: `4px solid ${theme.palette.primary.main}`,
        borderRadius: '4px',
        '& $listItemIcon': {
          color: theme.palette.primary.main,
          [rtl ? 'margin-right' : 'margin-left']: '-4px',
          // marginLeft: "-4px"
        },
      },
      '& + &': {
        marginTop: theme.spacing(),
      },
    },
    activeListItem: {
      [rtl
        ? 'border-right'
        : 'border-left']: `4px solid ${theme.palette.primary.main}`,
      // borderLeft: `4px solid ${theme.palette.primary.main}`,
      borderRadius: '4px',
      backgroundColor: theme.palette.primary.light,
      '& $listItemText': {
        color: theme.palette.text.primary,
      },
      '& $listItemIcon': {
        color: theme.palette.primary.main,
        [rtl ? 'margin-right' : 'margin-left']: '-4px',
        // marginLeft: "-4px"
      },
    },
    listItemIcon: {
      [false ? 'margin-left' : 'margin-right']: 0,
      // marginRight: 0,
      minWidth: false ? 'inherit' : 50,
    },
    listItemText: {
      paddingRight: false ? 15 : 'initial',
      fontWeight: 500,
      color: theme.palette.text.secondary,
    },
    listDivider: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
  }
}
