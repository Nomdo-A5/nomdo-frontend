import React, { useState, useEffect } from 'react';
import { BASE_API_URL } from '../../constants/urls';
import NavbarMain from "../../components/NavbarMain";
import Sidebar from '../../components/sidebar/Sidebar';
import Task from '../../components/task/Task';
import TaskOnBoard from '../../components/taskOnBoard/TaskOnBoard';
import ProgressBar from '../../components/progressBar/ProgressBar';
import axios from "axios";
import { getToken } from '../../utils/authentication';

import { Layout, Space } from "antd";
import { WorkspaceContext, WorkspaceContextProvider } from '../../context/WorkspaceContext';

import "./Home.css";

import { Tablereport } from "../../components/tablereport/Tablereport";
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import { FloatingBoard } from "../../components/floatingBoard/FloatingBoard";
import { FloatingMoneyReport } from "../../components/floatingMoneyReport/FloatingMoneyReport";
import { JoinWorkspace } from "../../components/joinWorkspace/JoinWorkspace";
import { ClickedTask } from "../../components/clickedTask/ClickedTask";
import WorkspaceNull from "../workspaceNull/WorkspaceNull"
import { useContext } from 'react';
const Home = () => {

    const { Sider } = Layout;
    const [task, setTask] = useState([]);
    const { workspace } = useContext(WorkspaceContext)
    useEffect(() => {
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
        console.log("Task Count = " + response.data.task.length);
    };

    return (
        <WorkspaceContextProvider>
            <div>
                <div style={{ backgroundColor: "white", position: "absolute", zIndex: "2" }} className="navbar-division">
                    <NavbarMain />
                </div>
                <div className="spacer" />
                <Layout>
                    <Sider style={{ backgroundColor: "white", zIndex: "1" }}>
                        <Sidebar />
                    </Sider>
                    <Layout style={{ zIndex: "0" }}>
                        {workspace.length === 0 ?
                            <WorkspaceNull /> :
                            <Space wrap style={{ paddingLeft: "30px", backgroundColor: "white", zIndex: "0" }}>
                                {task.map(t => (
                                    <Task key={t.id} task_id={t.id} task_name={t.task_name} task_description={t.task_description} />
                                ))}
                            </Space>
                        }

                    </Layout>
                    <div className="floating-button-component">
                        <FloatingButton />
                    </div>
                </Layout>
            </div>
        </WorkspaceContextProvider>



    )
}

export default Home;