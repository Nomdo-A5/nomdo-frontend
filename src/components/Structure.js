import Sidebar from "./sidebar/Sidebar";
import Topbar from "./Topbar";
import Nav from "./Nav";
import "./style/Structure.css";

import { FloatingButton } from "./floatingButton/FloatingButton";

import Task from "./task/Task";
import Board from "./board/Board";
import Workspace from "./workspace/Workspace";
import MoneyReport from "./moneyreport/MoneyReport";



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
            <Workspace />
            <MoneyReport />
            </div>
        /*</div>*/

    );
}

export default Structure;