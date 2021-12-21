import Sidebar from "./sidebar/Sidebar";
import Topbar_Profile from "./Topbar_Profile";
import NavbarMain from "./NavbarMain";
import "./style/Structure_Profile.css";

function Structure_Profile() {
    return (
        <div className="main-div-structure-profile">
            <NavbarMain />
            <div className="layout-sidebar-topbar-profile">
                
                <div className="topbar-profile">
                    <Topbar_Profile />
                </div>
            </div>
        </div>
        
    );
}

export default Structure_Profile;