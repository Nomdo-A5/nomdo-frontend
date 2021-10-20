import { Link } from "react-router-dom";
import React from "react";
import style from "./style/Sidebar.css";

function Sidebar() {
    return (
      <div className="main-bar">
        <div className="option-bar">
          <Link to="/">Home</Link>
        </div>
        <div className="option-bar">
          <Link to="/Dashboard">Workspaces</Link>
        </div>
        <div className="option-bar">
          <Link to="/Dashboard/Boards">Boards</Link>
        </div>
      </div>
    );
}

export default Sidebar;