import Sidebar from "./sidebar/Sidebar";
import Topbar from "./Topbar";
import Nav from "./Nav";
import "./style/Structure.css";
import Task from "./task/Task";


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
            <Task />
        </div>
        
    );
}

export default Structure;