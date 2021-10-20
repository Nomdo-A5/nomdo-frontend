import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Nav from "./Nav";
import "./style/Structure.css";

function Structure() {
    return (
        <div className="main-div-structure">
            <Nav />
            <div className="layout-sidebar-topbar">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="topbar">
                    <Topbar />
                </div>
            </div>
        </div>
        
    );
}

export default Structure;