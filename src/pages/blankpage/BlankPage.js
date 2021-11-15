import React , { useState, useEffect }from 'react';
import { BASE_API_URL } from '../../constants/urls';
import Nav from "../../components/Nav";
import Sidebar from '../../components/sidebar/Sidebar';
import Task from '../../components/task/Task';
import TaskOnBoard from '../../components/taskOnBoard/TaskOnBoard';
import ProgressBar from '../../components/progressBar/ProgressBar';
import axios from "axios";
import { getToken } from '../../utils/authentication';

import { Layout, Space, Input, Button } from "antd";
import { CgProfile } from 'react-icons/cg';
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import Topbar_Profile from "../../components/Topbar_Profile";
import { BrowserRouter as Router, Route, Link, useHistory, Switch } from "react-router-dom";

import "./BlankPage.css";

import { IoCloudOfflineOutline } from 'react-icons/io5';
import { Tablereport } from "../../components/tablereport/Tablereport";
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import { FloatingBoard } from "../../components/floatingBoard/FloatingBoard";
import { FloatingMoneyReport } from "../../components/floatingMoneyReport/FloatingMoneyReport";
import { JoinWorkspace } from "../../components/joinWorkspace/JoinWorkspace";
import { ClickedTask } from "../../components/clickedTask/ClickedTask";

const BlankPage = () =>{
    const history = useHistory();
    
    const { Header, Content, Sider } = Layout;
    const [task, setTask] = useState([]);
    const [workspace, setWorkspace] = useState([]);  

    useEffect(() => {
        //GetWorkspace()
        GetTask()
      }, [])    

    const GetTask = async () => {
        const token = getToken();
        const response = await axios.get(BASE_API_URL + 'task', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setTask(response.data.task);
        console.log(response);
    };

    return (
        <WorkspaceContextProvider>
            <div>
            <Nav />
            <Layout>
                <Sider>
                    <Sidebar />
                    <div className="floating-button-component">
                        <FloatingButton />
                    </div>
                </Sider>
                <Layout >
                    <div className="main-div">
                        <div className="cloud-logo">
                            <IoCloudOfflineOutline />
                        </div>
                        <div className="no-data-text">
                            No Data
                        </div>
                    </div>
                </Layout>
            </Layout>
            </div>
        </WorkspaceContextProvider>
            
        

    )
}

export default BlankPage;