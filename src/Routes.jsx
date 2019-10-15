import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components";

// Views
import Dashboard from "./views/Dashboard";
import ProjectList from "./views/ProjectList";
import UserList from "./views/UserList";
import Typography from "./views/Typography";
import Account from "./views/Account";
import Settings from "./views/Settings";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import UnderDevelopment from "./views/UnderDevelopment";
import NotFound from "./views/NotFound";
// import { ProtectRoute } from "components";

import { Main as MainLayout } from "./layouts";
import { Minimal as MinimalLayout } from "./layouts";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <RouteWithLayout
          component={Dashboard}
          exact
          layout={MainLayout}
          path="/dashboard"
          title="Dashboard"
        />
        <RouteWithLayout
          component={UserList}
          exact
          layout={MainLayout}
          path="/users"
        />

        <RouteWithLayout
          component={ProjectList}
          exact
          layout={MainLayout}
          path="/projects"
        />
        <RouteWithLayout
          component={Typography}
          exact
          layout={MainLayout}
          path="/typography"
        />
        <RouteWithLayout
          component={Account}
          exact
          layout={MainLayout}
          path="/account"
        />

        {/* <ProtectRoute component={Account} exact path="/account" /> */}
        <RouteWithLayout
          component={Settings}
          exact
          layout={MainLayout}
          path="/settings"
        />
        <RouteWithLayout
          component={UnderDevelopment}
          exact
          layout={MinimalLayout}
          path="/under-development"
        />
        {/* <Route component={UnderDevelopment} exact path="/under-development" /> */}

        <Route component={SignUp} exact path="/sign-up" />
        <Route component={SignIn} exact path="/sign-in" />

        <Route component={NotFound} exact path="/not-found" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
