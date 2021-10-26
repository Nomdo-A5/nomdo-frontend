import Sidebar from "./sidebar/Sidebar";
import Topbar from "./Topbar";
import Nav from "./Nav";
import "./style/Structure.css";
import { FloatingButton } from "./floatingButton/FloatingButton";


function Structure() {
    return (
        // <div className="main-div-structure">
        //     <Nav />
        //     <div className="layout-sidebar-topbar">
        //         <div className="sidebar">
        //             <Sidebar />
        //         </div>
        //         <div>
                    
        //         </div>
        //     </div>
        // </div>

        //kalau mau coba component disini
        <div>
            <FloatingButton />
        </div>
        
    );
}

export default Structure;