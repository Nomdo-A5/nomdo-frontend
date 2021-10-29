import Sidebar from "./sidebar/Sidebar";
import Topbar from "./Topbar";
import Nav from "./Nav";
import { FloatingButton } from "./floatingButton/FloatingButton";
import Task from "./task/Task";
import { Layout, Space } from "antd";
import 'antd/dist/antd.css'
import { useState, useEffect } from "react";
import { BASE_API_URL } from "../constants/urls";
import axios from "axios";
import { getToken } from "../utils/authentication";
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
        // <div className="main-div-structure">
        //     <Nav />
        //     <div className="layout-sidebar-topbar">
        //         <div className="sidebar">
        //             <Sidebar />
        //         </div>
        //     </div>

        <div>      
            <div>
            //kalau mau coba component disinii
            <FloatingButton />
            <FloatingBoard />
            <FloatingWorkspace />
            <FloatingMoneyReport />
            <JoinWorkspace />

            </div>
        </div>
        
    );
}

export default Structure;