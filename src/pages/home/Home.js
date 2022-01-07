import React, { useContext, useState, useEffect } from 'react'
import { Card, Row, Col, Button, Input, Layout, Avatar, Modal, AutoComplete } from 'antd';
import './Home.css';
import Sidebar from '../../components/sidebar/Sidebar';
import NavbarMain from "../../components/NavbarMain";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { BrowserRouter as Router, Route, Link, useHistory, useParams } from "react-router-dom";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { FloatingButtonHome } from "../../components/floatingButtonHome/FloatingButtonHome";
import { FiEdit } from 'react-icons/fi';
import TaskDone from './TaskDone.svg'
import TaskUndone from './TaskUndone.svg'
import { BiNotepad, BiUserCircle, BiTask } from 'react-icons/bi';
import ReactPlayer from "react-player";
import Greenscreen from './Greenscreen.svg'

import TaskOnDashboard from '../../components/taskOnDashboard/TaskOnDashboard';
import IncomingTask from '../../components/incomingTask/IncomingTask';
import Income from "../../components/reportIncome/ReportIncome";
import { BsArrowRight } from 'react-icons/bs';
import DashboardIllust from './dash-image.svg'
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import { UserContext } from '../../context/UserContext';

import { BoardContext } from "../../context/BoardContext";
import { BalanceContext } from "../../context/BalanceContext";

function refreshPage() {
    window.location.reload(true);
}

const Home = () => {

    const { Sider } = Layout;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const context = useContext(WorkspaceContext)
    const { workspace_id } = useParams()
    const [overview, setOverview] = useState([]);
    const { user } = useContext(UserContext)
    const token = getToken()
    const { activeWorkspace, GetWorkspaceById, workspace } = useContext(WorkspaceContext)
    const [taskOverview, setTaskOverview] = useState([])
    const [members, setMembers] = useState([])

    const history = useHistory();
    const { confirm } = Modal;
    const {setWorkspace, setActiveWorkspace, GetMember, GetTaskOverview} = useContext(WorkspaceContext)
    const {GetBoards} = useContext(BoardContext)
    const {GetBalanceOverview, GetReportBalance} = useContext(BalanceContext)

    function handleBoard(workspace){
        setActiveWorkspace(workspace)
        GetBoards(workspace.id)
        GetMember(workspace.id)
        history.push(`/workspace/${workspace.id}/boards`)
      }
    
      function handleDashboard(workspace){
        setActiveWorkspace(workspace)
        GetMember(workspace.id)
        GetTaskOverview(workspace.id)
        GetBalanceOverview(workspace.id)
        history.push(`/workspace/${workspace.id}/dashboards`)
      }
    
      function handleReport(workspace){
        setActiveWorkspace(workspace)
        GetBalanceOverview(workspace.id)
        GetReportBalance(workspace.id)
        history.push(`/report/${workspace.id}`)
      }

    // const GetOverview = async () => {
    //     const response = await axios.get(BASE_API_URL + 'report/overview', {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         },
    //         params: {
    //             'workspace_id': `${workspace_id}`
    //         }
    //     })
    //     console.log(response)
    //     setOverview(response.data)
    // }

    // const showModal = () => {
    //     setIsModalVisible(true);
    // };

    // const GetTaskOverview = async () => {
    //     const response = await axios.get(BASE_API_URL + 'workspace/task-information', {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         },
    //         params: {
    //             'workspace_id': `${workspace_id}`
    //         }
    //     })
    //     console.log(response)
    //     setTaskOverview(response.data)
    // }

    // const GetMember = async () => {
    //     const response = await axios.get(BASE_API_URL + 'workspace/member', {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         },
    //         params: {
    //             'workspace_id': `${workspace_id}`
    //         }
    //     })
    //     console.log(response)
    //     setMembers(response.data.member)
    // }
    // useEffect(() => {
    //     GetOverview()
    //     GetTaskOverview()
    //     GetMember()
    // }, [])

    return (
        <div className="main-container">
            <Layout style={{ backgroundColor: "#FFFFFF"}}>
            <Row
                style={{
                    borderRadius: "10px 10px 10px 10px"
                }}
            >
                <Col span={9} push={15}
                    style={{
                        backgroundColor: "#4ABDAC",
                        borderRadius: "0px 30px 30px 0px",
                        marginTop: "4%"
                    }}
                >
                    <div className="row-1-left-col">
                        <img
                            style={{ borderRadius: "15px" }}
                            className="dash-illus" src={DashboardIllust} alt=""
                        />
                    </div>
                </Col>
                <Col span={15} pull={9} className='left-col-jumbotron'
                    style={{
                        borderRadius: "30px 0px 0px 30px",
                        marginTop: "4%",
                        backgroundImage: `url(${Greenscreen})`
                        //backgroundImage: `url("https://images.unsplash.com/photo-1539721972319-f0e80a00d424?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ymx1ZSUyMHNwYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80")`
                    }}
                >
                    <Row
                        style={{
                            borderRadius: "30px 0px 0px 30px",
                            height: "40%",
                            marginTop: "4%",
                            fontWeight: "bold"
                        }}
                    >
                        <div className="row-1-right-col">
                            <div className="row-1-right-col-cont-1">
                                <div className="row-1-right-col-comp-1">
                                    Hello, {user.name} !
                                </div>
                                <div className="row-1-right-col-comp-2">
                                    Have a very nice day!
                                </div>
                            </div>
                        </div>
                    </Row>
                    <Row
                        style={{
                            borderRadius: "30px 0px 0px 30px",
                            height: "40%",
                            marginTop: "4%",
                            fontWeight: "bold"
                        }}
                    >
                        <div className="row-1-right-col">
                            <div className="row-1-right-col-cont-1">
                                <div className="floating-button-home-component">
                                    <FloatingButtonHome />
                                </div>
                            </div>
                        </div>
                    </Row>
                </Col>
            </Row>
            <Row
                style={{
                    marginTop: "4%"
                }}
            >
                <Col span={9}
                    style={{
                        backgroundColor: "#EBF6F1",//EBF6F1
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "20px 20px 20px 20px",
                        marginBottom: "4%"
                    }}
                >
                        <div className="overview-card-outer-workspace-left">
                            <div className="overview-title">
                                Your Workspaces
                            </div>
                            <div className="workspace-container-at-dashboard">
                                {context.workspace.slice(0,5).map(w=> (
                                    <Row 
                                        style={{ width: "95%", height: "100%", display: "flex", margin: "auto", backgroundColor: "#FFFFFF", marginBottom: "10px", borderRadius: "10px 10px 10px 10px" }}
                                        key={"dahboard " + w.id} onClick={() => handleDashboard(w)}
                                    >
                                        <Col span={5} className="photo-container" style={{ margin: "auto" }}>
                                            <Avatar>{w.workspace_name.charAt(0).toUpperCase()}</Avatar>
                                        </Col>
                                        <Col span={12} style={{ margin: "auto" }}>
                                            <Row>
                                                <div className="name-container-dashboard"
                                                    style={{
                                                        marginTop: "10px"
                                                    }}
                                                >
                                                    <span>{w.workspace_name}</span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="member-container-dashboard"
                                                    style={{
                                                        marginBottom: "10px",
                                                        textAlign: "left"
                                                    }}
                                                >
                                                    {w.workspace_description}
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col span={7} style={{ margin: "auto" }}>
                                            <Button style={{ backgroundColor: "#4ABDAC", color: "#FFFFFF", borderRadius: "10px 10px 10px 10px"}}>
                                                Details
                                            </Button>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                        </div>
                </Col>
                <Col span={1} style={{ marginBottom: "4%" }}/>
                <Col span={14}
                    style={{
                        backgroundColor: "#EBF6F1",
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "20px 20px 20px 20px",
                        marginBottom: "4%"
                    }}
                >
                    {/*<Card
                        style={{
                            width: "95%",
                            borderRadius: "18px",
                            display: "flex",
                            justifyContent: "left",
                            marginRight: "1em",
                            margin: "auto",
                            backgroundColor: "#EBF6F1",
                            display: "flex",
                            justifyContent: "center"
                        }}
                        bodyStyle={{
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingBottom: "10px",
                            paddingTop: "5px"
                        }}
                    >*/}
                        <div className="overview-card-outer-workspace-right">
                            <div className="overview-title">
                                About Us
                            </div>
                            <div className="workspace-container-at-dashboard">
                                <ReactPlayer
                                    width={AutoComplete}
                                    url="https://youtu.be/CVdQs_Br0vw"
                                    //borderRadius="10px 10px 10px 10px"
                                />
                            </div>
                        </div>
                    {/*</Card>*/}
                    </Col>
                {/*<Col span={12}>
                    <Card
                        style={{
                            width: "95%",
                            borderRadius: "18px",
                            display: "flex",
                            justifyContent: "left",
                            marginRight: "1em",
                            margin: "auto",
                            backgroundColor: "#EBF6F1",
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
                        <div className="overview-card-outer-workspace">
                            <div className="overview-title">
                                Your Incoming Tasks
                            </div>
                            <div className="workspace-container-at-dashboard">
                                <Row style={{ width: "100%", height: "60px", display: "flex", margin: "auto", backgroundColor: "#DBF0EA", marginBottom: "10px", borderRadius: "10px 10px 10px 10px" }}>
                                    <Col span={5} className="photo-container" style={{ margin: "auto" }}>
                                        <div className="date-main-container-dashboard">
                                            <div className="date-text-dashboard">
                                                21
                                            </div>
                                            <div className="month-text-dashboard">
                                                Dec
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={16} style={{ margin: "auto" }}>
                                        <Row>
                                            <div className="name-container-dashboard">
                                                Mengerjakan Layout
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="member-container-dashboard">
                                                Boards
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col span={3} style={{ margin: "auto" }}>
                                        <IncomingTask />
                                    </Col>
                                </Row>
                                <Row style={{ width: "100%", height: "60px", display: "flex", margin: "auto", backgroundColor: "#DBF0EA", marginBottom: "10px", borderRadius: "10px 10px 10px 10px" }}>
                                    <Col span={5} className="photo-container" style={{ margin: "auto" }}>
                                        <div className="date-main-container-dashboard">
                                            <div className="date-text-dashboard">
                                                21
                                            </div>
                                            <div className="month-text-dashboard">
                                                Dec
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={16} style={{ margin: "auto" }}>
                                        <Row>
                                            <div className="name-container-dashboard">
                                                Mengerjakan Layout
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="member-container-dashboard">
                                                Boards
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col span={3} style={{ margin: "auto" }}>
                                        <IncomingTask />
                                    </Col>
                                </Row>
                                <Row style={{ width: "100%", height: "60px", display: "flex", margin: "auto", backgroundColor: "#DBF0EA", marginBottom: "10px", borderRadius: "10px 10px 10px 10px" }}>
                                    <Col span={5} className="photo-container" style={{ margin: "auto" }}>
                                        <div className="date-main-container-dashboard">
                                            <div className="date-text-dashboard">
                                                21
                                            </div>
                                            <div className="month-text-dashboard">
                                                Dec
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={16} style={{ margin: "auto" }}>
                                        <Row>
                                            <div className="name-container-dashboard">
                                                Mengerjakan Layout
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="member-container-dashboard">
                                                Boards
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col span={3} style={{ margin: "auto" }}>
                                        <IncomingTask />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Card>
                    </Col>*/}
            </Row>
            </Layout>
        </div>
        //
    );
}

export default Home;