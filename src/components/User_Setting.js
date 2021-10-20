import React from "react";
import "./style/Topbar_Profile.css";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../utils/authentication";

const User_Setting = () => {
  const history = useHistory();

  const _onLogout = () => {
    logout();
    history.replace("/");
  };

  return (
    <div className="main">
      <div className="main-div-dashboard">
        <div className="login-form">
          <h3>USER SETTING</h3>
        </div>
        <Link to="/" variant="primary" onClick={_onLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default User_Setting;