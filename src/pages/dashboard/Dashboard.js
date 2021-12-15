import React, { useContext, useState, useEffect } from 'react'
import { Card, Row, Col, Button, Input, Layout, Avatar, Modal } from 'antd';
import './Dashboard.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Nav from "../../components/Nav";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { BrowserRouter as Router, Route, Link, useHistory, useParams } from "react-router-dom";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import { FiEdit } from 'react-icons/fi';

import TaskOnDashboard from '../../components/taskOnDashboard/TaskOnDashboard';
import Income from "../../components/reportIncome/ReportIncome";
import { BsArrowRight } from 'react-icons/bs';
import ReportImage from './ReportImage.svg'
import TaskImage from './Tasks.svg'
import TeamMember from './TeamMember.svg'
import Initial from './Initial.svg'
import IncomeStairs from './IncomeStairs.svg'
import OutcomeStairs from './OutcomeStairs.svg'
import TaskDone from './TaskDone.svg'
import TaskUndone from './TaskUndone.svg'
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';


function refreshPage() {
    window.location.reload(true);
}

const Dashboard = () => {

    const { Sider } = Layout;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const context = useContext(WorkspaceContext)
    const { workspace_id } = useParams()
    const [overview, setOverview] = useState([])
    const token = getToken()
    const { activeWorkspace, GetWorkspaceById } = useContext(WorkspaceContext)
    const [taskOverview, setTaskOverview] = useState([])
    const [members, setMembers] = useState([])

    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
            <Nav />
            <div>
                <Layout >
                    <Sider>
                        <Sidebar />
                    </Sider>
                    <Layout className="main-layout">
                        <div className="spacer" />
                        <div className="layout-title-dashboard">
                            <div className="workspace-title-dashboard-1">
                                <div className="workspace-title-dashboard-1-1">
                                    {activeWorkspace.workspace_name}
                                </div>
                                <div className="workspace-title-dashboard-1-2">
                                    <Button
                                        type="link" 
                                        onClick={showModal} 
                                        style={{ color: "#4ABDAC"}}
                                    >
                                        <FiEdit
                                        style={{ height: "90px"}}/>
                                    </Button>
                                </div>
                                <Modal title="" visible={isModalVisible} 
                                    onOk={handleOk} onCancel={handleCancel}
                                    style={{ textAlign: "center" }}
                                    okText="Save" width={520}>
                                    
                                    <div>
                                        <Row>
                                            <div>
                                                <div className="task-name-top">
                                                        Task Name
                                                </div>
                                                <div className="clock-and-input">
                                                    <div className="clock-logo">
                                                    </div>
                                                    <div className="due-date-and-input">
                                                        <div className="due-date">
                                                            Due 24, Aug 2021
                                                        </div>
                                                        <div className="due-date">
                                                            Members
                                                        </div>
                                                        <div className="description-name">
                                                            Description
                                                        </div>
                                                        <div className="due-date">
                                                            Rahmafatin
                                                        </div>
                                                        <div className="input-area">
                                                            <div className="form-input-join-name">
                                                                <Input.TextArea style={{ borderRadius: "10px 10px 10px 10px" }} placeholder="Add a Description" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Row>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        <div className="layout-main">
                            <div className="layout-main-left">
                                <div className="layout-main-left-title">
                                    Overview
                                </div>
                                <div className="overview-images">
                                    <Card
                                        style={{
                                            width: "300px",
                                            height: "100%",
                                            borderRadius: "18px",
                                            display: "flex",
                                            justifyContent: "left",
                                            marginRight: "1em",
                                            backgroundColor: "#FFFFFF",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                        bodyStyle={{
                                            paddingLeft: "10px",
                                            paddingRight: "10px",
                                            paddingBottom: "10px",
                                            paddingTop: "5px"
                                        }}
                                    >
                                        <div className="overview-card-outer-left">
                                            <div className="overview-title">
                                                Task Overview
                                            </div>
                                            <div className="images-container-income-outcome">
                                                <div className="income-overview">
                                                    <img
                                                        style={{ borderRadius: "15px" }}
                                                        className="imagez" src={TaskDone} height={75} alt=""
                                                    />
                                                    <div className="value-at-overview">
                                                        {taskOverview.task_done}
                                                    </div>
                                                    <div className="value-text-overview">
                                                        Completed Task
                                                    </div>
                                                </div>
                                                <div className="outcome-overview">
                                                    <img
                                                        style={{ borderRadius: "15px" }}
                                                        className="imagez" src={TaskUndone} height={75} alt=""
                                                    />
                                                    <div className="value-at-overview">
                                                        {taskOverview.task_count - taskOverview.task_done}
                                                    </div>
                                                    <div className="value-text-overview">
                                                        Unfinished Task
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card
                                        style={{
                                            width: "300px",
                                            height: "100%",
                                            borderRadius: "18px",
                                            display: "flex",
                                            justifyContent: "left",
                                            marginRight: "1em",
                                            backgroundColor: "#FFFFFF",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                        bodyStyle={{
                                            paddingLeft: "10px",
                                            paddingRight: "10px",
                                            paddingBottom: "10px",
                                            paddingTop: "5px"
                                        }}
                                    >
                                        <div className="overview-card-outer-left">
                                            <div className="overview-title-group">
                                                <div className="overview-title">
                                                    Balance Overview
                                                </div>
                                                {context.workspace.map(w => (
                                                    <div className="overview-details">
                                                        <Link to={{ pathname: `/report/${w.id}`, state: { workspace: w.id } }}>
                                                            See details
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="images-container-income-outcome">
                                                <div className="income-overview">
                                                    <img
                                                        style={{ borderRadius: "15px" }}
                                                        className="imagez" src={IncomeStairs} height={75} alt=""
                                                    />
                                                    <div className="value-at-overview">
                                                        {new Intl.NumberFormat('ID').format(overview.income_balance)}
                                                    </div>
                                                    <div className="value-text-overview">
                                                        Income
                                                    </div>
                                                </div>
                                                <div className="outcome-overview">
                                                    <img
                                                        style={{ borderRadius: "15px" }}
                                                        className="imagez" src={OutcomeStairs} height={75} alt=""
                                                    />
                                                    <div className="value-at-overview">
                                                        {new Intl.NumberFormat('ID').format(overview.outcome_balance)}
                                                    </div>
                                                    <div className="value-text-overview">
                                                        Outcome
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                <div className="dashboard-bottom">
                                    <div className="layout-main-left-title">
                                        Incoming Task
                                    </div>
                                    <div className="layout-main-left-tasks-double">
                                        <div className="layout-main-left-tasks-display">
                                            <div className="layout-main-left-tasks">
                                                <TaskOnDashboard />
                                            </div>
                                            <div className="layout-main-left-tasks">
                                                <TaskOnDashboard />
                                            </div>
                                            <div className="layout-main-left-tasks">
                                                <TaskOnDashboard />
                                            </div>
                                        </div>
                                        <div className="layout-main-left-tasks-display">
                                            <div className="layout-main-left-tasks">
                                                <TaskOnDashboard />
                                            </div>
                                            <div className="layout-main-left-tasks">
                                                <TaskOnDashboard />
                                            </div>
                                            <div className="layout-main-left-tasks">
                                                <TaskOnDashboard />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="layout-main-right">
                                <div className="layout-main-left-title">
                                    Members
                                </div>
                                <div className="member-boxes-overview">
                                    <Card
                                        style={{
                                            width: "280px",
                                            height: "100%",
                                            borderRadius: "18px",
                                            display: "flex",
                                            justifyContent: "left",
                                            marginRight: "1em"
                                        }}
                                        bodyStyle={{
                                            padding: "0"
                                        }}
                                    >
                                        <div className="container-card-member-1">
                                            <div className="card-main-division-member">
                                                <div className="team-member-image">
                                                    <img
                                                        style={{ borderRadius: "15px" }}
                                                        className="imagez" src={TeamMember} height={35} alt=""
                                                    />
                                                </div>
                                                <div className="team-member-name">
                                                    Team Members
                                                </div>
                                            </div>
                                            {members.map(member => (
                                                <div className="members-name-and-logo">
                                                    <div className="team-member">
                                                        <img
                                                            style={{ borderRadius: "15px" }}
                                                            className="imagez" src={Initial} height={30} alt=""
                                                        />
                                                    </div>
                                                    <div className="team-name">
                                                        {member.name}
                                                    </div>
                                                </div>
                                            ))}
                                            
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Layout>
                    <div className="floating-button-component">
                        <FloatingButton />
                    </div>
                </Layout>
            </div>

        </WorkspaceContextProvider>
    );
}

export default Dashboard;