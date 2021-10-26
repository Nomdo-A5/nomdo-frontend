import Sidebar from "./sidebar/Sidebar";
import Topbar from "./Topbar";
import Nav from "./Nav";
import "./style/Structure.css";
import Task from "./task/Task";
import Board from "./board/Board";


function Structure() {
    return (
        /*<div className="main-div-structure">
            <Nav />
            <div className="layout-sidebar-topbar">
                <div className="sidebar">
                    <Sidebar />
                </div>
            </div>*/

            <div>
            //kalau mau coba component disinii
            <Board />
            </div>
        /*</div>*/
        
    );
}

export default Structure;