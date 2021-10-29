import React , { useState, useEffect }from 'react';
import { BASE_API_URL } from '../../constants/urls';
import Nav from "../../components/Nav";
import Sidebar from '../../components/sidebar/Sidebar';
import Task from '../../components/task/Task';
import axios from "axios";
import { getToken } from '../../utils/authentication';

import { Layout, Space } from "antd";

export const Home = () =>{
    
    const { Header, Content, Sider } = Layout;
    const [task, setTask] = useState([]);

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

    useEffect(() => {
        GetTask()
    }, [])
    return (
        <div>
            <Nav />
            <Layout>
                <Sider>
                    <Sidebar />
                </Sider>
                <Layout >
                    <Space wrap style={{ backgroundColor: "#FFFFFF" }}>
                        {task.map(t => (
                            <Task task_id={t.id} task_name={t.task_name} task_description={t.task_description} />
                        ))}
                    </Space>
                </Layout>
            </Layout>
        </div>

    )
}