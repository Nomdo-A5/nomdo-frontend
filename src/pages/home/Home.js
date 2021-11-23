import React , { useState, useEffect }from 'react';
import { BASE_API_URL } from '../../constants/urls';
import Nav from "../../components/Nav";
import Sidebar from '../../components/sidebar/Sidebar';
import Task from '../../components/task/Task';
import TaskOnBoard from '../../components/taskOnBoard/TaskOnBoard';
import ProgressBar from '../../components/progressBar/ProgressBar';
import axios from "axios";
import { getToken } from '../../utils/authentication';

import { Layout, Space } from "antd";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';

import "./Home.css";

import { Tablereport } from "../../components/tablereport/Tablereport";
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import { FloatingBoard } from "../../components/floatingBoard/FloatingBoard";
import { FloatingMoneyReport } from "../../components/floatingMoneyReport/FloatingMoneyReport";
import { JoinWorkspace } from "../../components/joinWorkspace/JoinWorkspace";
import { ClickedTask } from "../../components/clickedTask/ClickedTask";

const Home = () =>{
    
    const { Sider } = Layout;
    const [task, setTask] = useState([]);    

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
                    <Space wrap style={{ paddingLeft: "30px", backgroundColor: "#FFFFFF" }}>
                        {task.map(t => (
                            <Task key={t.id} task_id={t.id} task_name={t.task_name} task_description={t.task_description} />
                        ))}
                    </Space>
                </Layout>
            </Layout>
            </div>
        </WorkspaceContextProvider>
            
        

    )
}

export default Home;