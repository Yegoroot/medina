// Service methods
const signIn = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

handleSignIn = async () => {
  try {
    const { history } = this.props;
    const { values } = this.state;

    this.setState({ isLoading: true });

    await signIn(values.email, values.password);

    localStorage.setItem("isAuthenticated", true);

    history.push("/dashboard");
  } catch (error) {
    this.setState({
      isLoading: false,
      serviceError: error
    });
  }
};
