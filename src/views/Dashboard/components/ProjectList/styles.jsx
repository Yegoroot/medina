export default theme => ({
  root: {},
  portletContent: {
    paddingTop: "0"
  },
  portletFooter: {
    display: "flex",
    justifyContent: "flex-end"
  },
  project: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    "&:not(:first-of-type)": {
      borderTop: `1px solid ${theme.palette.divider}`
    }
  },
  projectImageWrapper: {
    borderRadius: "5px",
    overflow: "hidden",
    height: "64px",
    width: "64px"
  },
  projectImage: {
    width: "100%",
    height: "auto"
  },
  projectDetails: {
    marginLeft: theme.spacing(2),
    flexGrow: 1
  },
  projectTitle: {},
  projectTimestamp: {
    marginTop: theme.spacing(),
    color: theme.palette.text.secondary
  }
});
