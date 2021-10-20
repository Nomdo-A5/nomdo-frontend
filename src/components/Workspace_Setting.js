import React from "react";
import "./style/Topbar.css";
import "./style/Boards.css";
import { Link, useHistory } from "react-router-dom";

const Workspace_Setting = () => {
  const history = useHistory();

  return (
    <div className="main">
      <div className="main-div-dashboard">
        <div className="login-form">
          <h3>SETTING WORKSPACE</h3>
        </div>
      </div>
    </div>
  );
};

export default Workspace_Setting;