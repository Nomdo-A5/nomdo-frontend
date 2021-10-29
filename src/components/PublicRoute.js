/*
  isLogin? If True, will redirected to page "/Dashboard" (Dashboard Page)
*/

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/authentication";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
