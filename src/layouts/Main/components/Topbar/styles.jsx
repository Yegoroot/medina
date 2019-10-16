export default theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.border}`,
    backgroundColor: theme.palette.white,
    display: "flex",
    alignItems: "center",
    height: "64px",
    zIndex: theme.zIndex.appBar
  },
  toolbar: {
    minHeight: "auto",
    width: "100%",
    flexDirection: theme.rtl ? "row-reverse" : "row"
  },
  title: {
    marginLeft: theme.spacing()
  },
  menuButton: {
    marginLeft: "-4px"
  },
  notificationsButton: {
    [theme.rtl ? "margin-right" : "margin-left"]: "auto"
  },
  signOutButton: {
    marginLeft: theme.spacing()
  }
});
