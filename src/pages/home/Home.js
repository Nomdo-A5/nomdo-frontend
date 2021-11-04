import React , { useState, useEffect }from 'react';
import { BASE_API_URL } from '../../constants/urls';
import Nav from "../../components/Nav";
import Sidebar from '../../components/sidebar/Sidebar';
import Task from '../../components/task/Task';
import axios from "axios";
import { getToken } from '../../utils/authentication';

import { Layout, Space } from "antd";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { FloatingWorkspace } from '../../components/floatingWorkspace/FloatingWorkspace';
export const Home = () =>{
    
    const { Header, Content, Sider } = Layout;
    const [task, setTask] = useState([]);
    const [workspace, setWorkspace] = useState([]);  

    useEffect(() => {
        //GetWorkspace()
        GetTask()
      }, [])    

    // const GetWorkspace = async () => {
    //     const token = getToken();
    //     const response = await axios.get(BASE_API_URL + 'workspace', {
    //       headers: {
    //         'Authorization': `Bearer ${token}`
    //       }
    //     });
    //     setWorkspace(response.data.workspace);
    //     console.log(response);
    // };

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
                    <Sidebar/>
                </Sider>
                <Layout >                    
                    <FloatingWorkspace />
                    <Space wrap style={{ backgroundColor: "#FFFFFF" }}>
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