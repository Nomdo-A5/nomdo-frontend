import "./style/Topbar_Profile.css";
import User_Profile from "./User_Profile";
import User_Setting from "./User_Setting";
import {Route, Switch, Link } from "react-router-dom";

function Topbar_Profile(){
    return(
        <div className="workspace-main-topbar">
            <div className="workspace-upper-topbar">
                <div className="workspace-title">
                    <h1>Profile Name</h1>
                </div>
                <div className="workspace-boxes-profile">
                    <Link to="/User_Profile" className="workspace-boxes-user-profile">
                        <h5>Profile</h5>
                    </Link>
                    <Link to="/User_Profile/User_Setting" className="workspace-boxes-user-setting">
                        <h5>Setting</h5>
                    </Link>
                </div>
            </div>
            <div className="workspace-downer-topbar">
                <Switch>
                    <Route exact path="/User_Profile" component={User_Profile} />
                    <Route exact path="/User_Profile/User_Setting" component={User_Setting} />
                </Switch>
            </div>
        </div>
    );
}

export default Topbar_Profile;