import React from 'react'
import { Card, Row, Col, Button, Input, Layout } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import './Dashboard.css';
import Sidebar from '../sidebar/Sidebar';
import Nav from "../Nav";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';

import '../taskOnBoard/TaskOnBoard.css';
import TaskOnBoard from '../taskOnBoard/TaskOnBoard';

function refreshPage() {
    window.location.reload(true);
  }

const Dashboard = () =>{

    const { Sider } = Layout;
    return (
        <WorkspaceContextProvider>
        <Nav />
        <div>
            <Layout >
                <Sider>
                    <Sidebar />
                </Sider>
                <Layout style={{backgroundColor: "white"}}>
                    <div className="layout-title">
                        Workspace Name
                    </div>
                    <div className="layout-main">
                        <Card
                            style={{
                                width: "360px",
                                height: "250px",
                                borderRadius: "16px",
                                marginRight: "24px",
                                boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                                backgroundColor: "#F6F6F6"
                            }}
                            title="Money Report"
                        >
                            <Row>
                                <div className="report-form-main">
                                    <div className="report-items">
                                        <div className="item-name">
                                            Income<span className="tabs">: </span>
                                        </div>
                                        <div className="item-name">
                                            Outcome<span className="tabs">: </span>
                                        </div>
                                        <div className="item-name">
                                            Saldo<span className="tabs">: </span>
                                        </div>
                                        <div className="item-name">
                                            Deskripsi<span className="tabs">: </span>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </Card>
                        <Card
                            style={{
                                width: "360px",
                                height: "250px",
                                borderRadius: "16px",
                                marginRight: "24px",
                                boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                                backgroundColor: "#F6F6F6"
                            }}
                            title="New Workspace"
                        >
                            <Row>
                                <div className="done-and-given-task-main">
                                    <div className="done-and-given-task-container">
                                        <div className="item-name">
                                            Given Task<span className="tabs">: </span>
                                        </div>
                                        <div className="item-name">
                                            Done Task<span className="tabs">: </span>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </Card>
                        <div className="incoming-tasks">
                            <div className="incoming-tasks-text">
                                Your Incoming Tasks
                            </div>
                            <TaskOnBoard />
                        </div>
                    </div>
                </Layout>
            </Layout>
        </div>
        
        </WorkspaceContextProvider>
    );
}

export default Dashboard;