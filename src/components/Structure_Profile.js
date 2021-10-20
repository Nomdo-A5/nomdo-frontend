import Sidebar from "./Sidebar";
import Topbar_Profile from "./Topbar_Profile";
import Nav from "./Nav";
import "./style/Structure_Profile.css";

function Structure_Profile() {
    return (
        <div className="main-div-structure-profile">
            <Nav />
            <div className="layout-sidebar-topbar-profile">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="topbar-profile">
                    <Topbar_Profile />
                </div>
            </div>
        </div>
        
    );
}

export default Structure_Profile;