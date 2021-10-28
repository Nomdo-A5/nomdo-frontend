import Sidebar from "./sidebar/Sidebar";
import Topbar from "./Topbar";
import Nav from "./Nav";
import "./style/Structure.css";

import { FloatingBoard } from "./floatingBoard/FloatingBoard";
import { FloatingWorkspace } from "./floatingWorkspace/FloatingWorkspace";
import { FloatingMoneyReport } from "./floatingMoneyReport/FloatingMoneyReport";
import { JoinWorkspace } from "./joinWorkspace/JoinWorkspace";

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
            <FloatingBoard />
            <FloatingWorkspace />
            <FloatingMoneyReport />
            <JoinWorkspace />
            </div>
        /*</div>*/

    );
}

export default Structure;