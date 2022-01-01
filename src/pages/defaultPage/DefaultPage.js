import React, { useContext, useState, useEffect } from 'react'
import { Card, Row, Col, Button, Input, Layout, Avatar, Modal } from 'antd';
import './Home.css';
import Sidebar from '../../components/sidebar/Sidebar';
import NavbarMain from "../../components/NavbarMain";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { BrowserRouter as Router, Route, Link, useHistory, useParams } from "react-router-dom";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import { FiEdit } from 'react-icons/fi';
import TaskDone from './TaskDone.svg'
import TaskUndone from './TaskUndone.svg'
import { BiNotepad, BiUserCircle, BiTask } from 'react-icons/bi';

import TaskOnDashboard from '../../components/taskOnDashboard/TaskOnDashboard';
import IncomingTask from '../../components/incomingTask/IncomingTask';
import Income from "../../components/reportIncome/ReportIncome";
import { BsArrowRight } from 'react-icons/bs';
import DashboardIllust from './dash-image.svg'
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import { UserContext } from '../../context/UserContext';


function refreshPage() {
    window.location.reload(true);
}

const DefaultPage = (props) => {

    const { Header, Footer, Sider, Content } = Layout;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { workspace_id } = useParams()
    const [overview, setOverview] = useState([]);
    const {user} = useContext(UserContext)
    const token = getToken()
    const { activeWorkspace, GetWorkspaceById } = useContext(WorkspaceContext)
    const [taskOverview, setTaskOverview] = useState([])
    const [members, setMembers] = useState([])

    

    const GetOverview = async () => {
        const response = await axios.get(BASE_API_URL + 'report/overview', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': `${workspace_id}`
            }
        })
        console.log(response)
        setOverview(response.data)
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const GetTaskOverview = async () => {
        const response = await axios.get(BASE_API_URL + 'workspace/task-information', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': `${workspace_id}`
            }
        })
        console.log(response)
        setTaskOverview(response.data)
    }

    const GetMember = async () => {
        const response = await axios.get(BASE_API_URL + 'workspace/member', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': `${workspace_id}`
            }
        })
        console.log(response)
        setMembers(response.data.member)
    }
    useEffect(() => {
        GetOverview()
        GetWorkspaceById(workspace_id)
        GetTaskOverview()
        GetMember()
    }, [])

    return (
        <WorkspaceContextProvider>
            <Layout>
                <Header
                    style={{ 
                        backgroundColor: "#4ABDAC"
                    }}
                >
                    <NavbarMain/>
                </Header>
                <Layout style={{backgroundColor:"white"}}>
                    <Sider style={{ backgroundColor: "#4ABDAC" }}>
                        <Sidebar />
                    </Sider>
                    <Content style={{ backgroundColor: "" }}>
                        {props.children}
                    </Content>
                </Layout>
                <div className="floating-button-component">
                    <FloatingButton />
                </div>
            </Layout>
        </WorkspaceContextProvider>
    );
}

export default DefaultPage;