import "./style/Topbar.css";
import Dashboard from "./Dashboard";
import Boards from "./Boards";
import Members from "./Members";
import Balance from "./Balance";
import Workspace_Setting from "./Workspace_Setting";
import {Route, Switch, Link } from "react-router-dom";

function Topbar(){
    return(
        <div className="workspace-main-topbar">
            <div className="workspace-upper-topbar">
                <div className="workspace-title">
                    <h1>NOMDO</h1>
                </div>
                <div className="workspace-boxes">
                    <Link to="/Dashboard" className="workspace-boxes-dashboard">
                        <h5>Dashboard</h5>
                    </Link>
                    <Link to="/Dashboard/Boards" className="workspace-boxes-board">
                        <h5>Board</h5>
                    </Link>
                    <Link to="/Dashboard/Members" className="workspace-boxes-member">
                        <h5>Members</h5>
                    </Link>
                    <Link to="/Dashboard/Balance" className="workspace-boxes-balance">
                        <h5>Balance</h5>
                    </Link>
                    <Link to="/Dashboard/Workspace_Setting" className="workspace-boxes-setting">
                        <h5>Setting</h5>
                    </Link>
                </div>
            </div>
            <div className="workspace-downer-topbar">
                <Switch>
                    <Route exact path="/Dashboard" component={Dashboard} />
                    <Route exact path="/Dashboard/Boards" component={Boards} />
                    <Route exact path="/Dashboard/Members" component={Members} />
                    <Route exact path="/Dashboard/Balance" component={Balance} />
                    <Route exact path="/Dashboard/Workspace_Setting" component={Workspace_Setting} />
                </Switch>
            </div>
        </div>
    );
}

export default Topbar;