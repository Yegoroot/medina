export default theme => ({
  root: {},
  tableRow: {
    height: "64px"
  },
  tableCell: {
    whiteSpace: "nowrap"
  },
  tableCellInner: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    display: "inline-flex",
    fontSize: "14px",
    fontWeight: 500,
    height: "36px",
    width: "36px"
  },
  nameText: {
    display: "inline-block",
    marginLeft: theme.spacing(2),
    fontWeight: "bold",
    cursor: "pointer"
    // color: theme.primary.secondary.main
  }
});
