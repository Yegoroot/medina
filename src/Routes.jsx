import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Views
import Dashboard from "./views/Dashboard";
import ProjectList from "./views/ProjectList";
import UserList from "./views/UserList";
import Typography from "./views/Typography";
import Icons from "./views/Icons";
import Account from "./views/Account";
import Settings from "./views/Settings";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import UnderDevelopment from "./views/UnderDevelopment";
import NotFound from "./views/NotFound";
import { ProtectRoute } from "components";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Route component={Dashboard} exact path="/dashboard" />
        <Route component={UserList} exact path="/users" />
        <Route component={ProjectList} exact path="/projects" />
        <Route component={Typography} exact path="/typography" />
        <Route component={Icons} exact path="/icons" />
        <ProtectRoute component={Account} exact path="/account" />
        <Route component={Settings} exact path="/settings" />
        <Route component={SignUp} exact path="/sign-up" />
        <Route component={SignIn} exact path="/sign-in" />
        <Route component={UnderDevelopment} exact path="/under-development" />
        <Route component={NotFound} exact path="/not-found" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}