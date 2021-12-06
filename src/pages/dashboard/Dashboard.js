import React, {useContext} from 'react'
import { Card, Row, Col, Button, Input, Layout } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import './Dashboard.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Nav from "../../components/Nav";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import { WorkspaceContext } from "../../context/WorkspaceContext";

import '../../components/taskOnBoard/TaskOnBoard.css';
import TaskOnBoard from '../../components/taskOnBoard/TaskOnBoard';
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

function refreshPage() {
    window.location.reload(true);
  }

const Dashboard = () =>{

    const { Sider } = Layout;
  const context = useContext(WorkspaceContext)
    return (
        <WorkspaceContextProvider>
        <Nav />
        <div>
            <Layout >
                <Sider>
                    <Sidebar />
                </Sider>
                <Layout className="main-layout">
                    <div className="spacer"/>
                    <div className="layout-title-dashboard">
                        Workspace Name
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
                                                    0
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
                                                    3
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
                                                    300.000
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
                                                    100.000
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
                                            <TaskOnBoard/>
                                        </div>
                                        <div className="layout-main-left-tasks">
                                            <TaskOnBoard/>
                                        </div>
                                        <div className="layout-main-left-tasks">
                                            <TaskOnBoard/>
                                        </div>
                                    </div>
                                    <div className="layout-main-left-tasks-display">
                                        <div className="layout-main-left-tasks">
                                            <TaskOnBoard/>
                                        </div>
                                        <div className="layout-main-left-tasks">
                                            <TaskOnBoard/>
                                        </div>
                                        <div className="layout-main-left-tasks">
                                            <TaskOnBoard/>
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
                                        <div className="members-list">
                                            <div className="members-name-and-logo">
                                                <div className="team-member">
                                                    <img 
                                                        style={{ borderRadius: "15px" }}
                                                        className="imagez" src={Initial} height={30} alt=""
                                                    />
                                                </div>
                                                <div className="team-name">
                                                    Alan Novianto
                                                </div>
                                            </div>
                                            <div className="members-name-and-logo">
                                                <div className="team-member">
                                                    <img 
                                                        style={{ borderRadius: "15px" }}
                                                        className="imagez" src={Initial} height={30} alt=""
                                                    />
                                                </div>
                                                <div className="team-name">
                                                    Alan Novianto
                                                </div>
                                            </div>
                                            <div className="members-name-and-logo">
                                                <div className="team-member">
                                                    <img 
                                                        style={{ borderRadius: "15px" }}
                                                        className="imagez" src={Initial} height={30} alt=""
                                                    />
                                                </div>
                                                <div className="team-name">
                                                    Alan Novianto
                                                </div>
                                            </div>
                                            <div className="members-name-and-logo">
                                                <div className="team-member">
                                                    <img 
                                                        style={{ borderRadius: "15px" }}
                                                        className="imagez" src={Initial} height={30} alt=""
                                                    />
                                                </div>
                                                <div className="team-name">
                                                    Alan Novianto
                                                </div>
                                            </div>
                                            <div className="members-name-and-logo">
                                                <div className="team-member">
                                                    <img 
                                                        style={{ borderRadius: "15px" }}
                                                        className="imagez" src={Initial} height={30} alt=""
                                                    />
                                                </div>
                                                <div className="team-name">
                                                    Alan Novianto
                                                </div>
                                            </div>
                                            <div className="members-name-and-logo">
                                                <div className="team-member">
                                                    <img 
                                                        style={{ borderRadius: "15px" }}
                                                        className="imagez" src={Initial} height={30} alt=""
                                                    />
                                                </div>
                                                <div className="team-name">
                                                    Alan Novianto
                                                </div>
                                            </div>
                                            <div className="spacer"/>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Layout>
            </Layout>
        </div>
        
        </WorkspaceContextProvider>
    );
}

export default Dashboard;