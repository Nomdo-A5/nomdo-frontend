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

function Structure() {
    
    return (
        // <div className="main-div-structure">
        //     <Nav />
        //     <div className="layout-sidebar-topbar">
        //         <div className="sidebar">
        //             <Sidebar />
        //         </div>
        //     </div>

        //kalau mau coba component disinii
        <div>
           <div>            
            <FloatingButton />
            </div>
        </div>
        
    );
}

export default Structure;