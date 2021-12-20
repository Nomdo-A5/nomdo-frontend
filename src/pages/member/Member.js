import React, {useState, useContext, useEffect} from 'react'
import { Card, Row, Col, Button, Input, Layout } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import './Member.css';
import Sidebar from '../../components/sidebar/Sidebar';
import NavbarMain from "../../components/NavbarMain";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { BrowserRouter as Router, Route, Link, useHistory, useParams } from "react-router-dom";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import MemberCard from "../../components/memberCard/MemberCard";
import PageTitle from '../../components/pageTitle/PageTitle';

import { FloatingButton } from "../../components/floatingButton/FloatingButton";

import '../../components/taskOnBoard/TaskOnBoard.css';
import TaskOnBoard from '../../components/taskOnBoard/TaskOnBoard';
import Income from "../../components/reportIncome/ReportIncome";
import { BsArrowRight } from 'react-icons/bs';
import { getToken } from '../../utils/authentication';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';

function refreshPage() {
    window.location.reload(true);
  }

const Member = () =>{

    const { Sider } = Layout;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const context = useContext(WorkspaceContext)
    const { workspace_id } = useParams()
    const [overview, setOverview] = useState([])
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
        <NavbarMain />
        <div>
            <Layout >
                <Sider>
                    <Sidebar />
                </Sider>
                <Layout className="main-layout" style={{ backgroundColor: "white" }}>
                    <div className="spacer"/>
                    <div className="floating-button-component">
                        <FloatingButton />
                    </div>
                    <PageTitle/>
                    <div className="layout-main-member">
                        <div className="layout-main-title">
                            Members and Teams
                        </div>
                        <div className="layout-main-content">
                            <div className="layout-main-card">
                                <MemberCard/>
                            </div>
                            <div className="layout-main-card">
                                <MemberCard/>
                            </div>
                            <div className="layout-main-card">
                                <MemberCard/>
                            </div>
                            <div className="layout-main-card">
                                <MemberCard/>
                            </div>
                            <div className="layout-main-card">
                                <MemberCard/>
                            </div>
                            <div className="layout-main-card">
                                <MemberCard/>
                            </div>
                        </div>
                    </div>
                </Layout>
            </Layout>
        </div>
        
        </WorkspaceContextProvider>
    );
}

export default Member;