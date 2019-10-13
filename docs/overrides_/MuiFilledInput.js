export default theme => {
  return {
    root: {
      backgroundColor: theme.palette.background.default,
      "&:hover": {
        backgroundColor: theme.palette.primary.light
      },
      "&$focused": {
        backgroundColor: theme.palette.primary.light
      }
    }
  };
};
