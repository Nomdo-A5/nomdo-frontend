/*
  isLogin? If False, will redirected to page "/" (Login Page)
*/

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/authentication";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
