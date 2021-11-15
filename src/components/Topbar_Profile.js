import "./style/Topbar_Profile.css";
import User_Profile from "./User_Profile";
import User_Setting from "./User_Setting";
import { BrowserRouter as Router, Route, Link, useHistory, Switch } from "react-router-dom";
import UserProfile  from "../pages/userprofile/UserProfile";

const Topbar_Profile = () => {
    const history = useHistory();
    return(
        <div className="workspace-main-topbar">
            <div className="workspace-upper-topbar">
                <div className="workspace-title">
                    <h1>Profile Name</h1>
                </div>
                <div className="workspace-boxes-profile">
                    <Link to="/report" onClick={() => history.push("/report")}>
                        <h5>Profile</h5>
                    </Link>
                    <Link to="/report" onClick={() => history.push("/report")}>
                        <h5>Setting</h5>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Topbar_Profile;