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


function refreshPage() {
    window.location.reload(true);
}

const Home = () => {

    const { Sider } = Layout;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const context = useContext(WorkspaceContext)
    const { workspace_id } = useParams()
    const [overview, setOverview] = useState([]);
    const [user, setUser] = useState([]);
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
        getActiveUser()
    }, [])

    const getActiveUser = async () => {
        const token = getToken();
        const response = await axios.get(BASE_API_URL + 'user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response)
        setUser(response.data.user)
    }
    return (
        <div className="main-container">
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
                <Col span={15} pull={9}
                    style={{
                        backgroundColor: "#4ABDAC",
                        borderRadius: "30px 0px 0px 30px",
                        marginTop: "4%"
                    }}
                >
                    <Row
                        style={{
                            backgroundColor: "",
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
                    <Row>
                    </Row>
                </Col>
            </Row>
            <Row
                style={{
                    marginTop: "4%"
                }}
            >
                <Col span={8}>
                    <Card
                        style={{
                            width: "90%",
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
                                Your Workspaces
                            </div>
                            <div className="workspace-container-at-dashboard">
                                <Row style={{ width: "260px", height: "60px", display: "flex", margin: "auto", backgroundColor: "#FFFFFF", marginBottom: "10px", borderRadius: "10px 10px 10px 10px" }}>
                                    <Col span={5} className="photo-container" style={{ margin: "auto" }}>
                                        <BiUserCircle style={{ fontSize: "48px" }} />
                                    </Col>
                                    <Col span={12} style={{ margin: "auto" }}>
                                        <Row>
                                            <div className="name-container-dashboard">
                                                Nomdo
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="member-container-dashboard">
                                                6 members
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col span={7} style={{ margin: "auto" }}>
                                        <div className="details-button">
                                            Details
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ width: "260px", height: "60px", display: "flex", margin: "auto", backgroundColor: "#FFFFFF", marginBottom: "10px", borderRadius: "10px 10px 10px 10px" }}>
                                    <Col span={5} className="photo-container" style={{ margin: "auto" }}>
                                        <BiUserCircle style={{ fontSize: "48px" }} />
                                    </Col>
                                    <Col span={12} style={{ margin: "auto" }}>
                                        <Row>
                                            <div className="name-container-dashboard">
                                                Nomdo
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="member-container-dashboard">
                                                6 members
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col span={7} style={{ margin: "auto" }}>
                                        <div className="details-button">
                                            Details
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ width: "260px", height: "60px", display: "flex", margin: "auto", backgroundColor: "#FFFFFF", marginBottom: "10px", borderRadius: "10px 10px 10px 10px" }}>
                                    <Col span={5} className="photo-container" style={{ margin: "auto" }}>
                                        <BiUserCircle style={{ fontSize: "48px" }} />
                                    </Col>
                                    <Col span={12} style={{ margin: "auto" }}>
                                        <Row>
                                            <div className="name-container-dashboard">
                                                Nomdo
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="member-container-dashboard">
                                                6 members
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col span={7} style={{ margin: "auto" }}>
                                        <div className="details-button">
                                            Details
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col span={8}
                    style={{
                        backgroundColor: ""
                    }}
                >
                    <Card
                        style={{
                            width: "90%",
                            height: "100%",
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
                        <div className="overview-card-outer-left">
                            <div className="overview-title">
                                Overview
                            </div>
                            <div className="images-container-income-outcome">
                                <div className="total-task-1">
                                    <div className="total-task-logo">
                                        <BiNotepad className='binoted' style={{ fontSize: "18px" }} />
                                    </div>
                                    <div className="value-text-overview">
                                        Total Task
                                    </div>
                                    <div className="value-at-overview">
                                        {taskOverview.task_done}
                                    </div>
                                    <div className="see-more-details">
                                        See More
                                    </div>
                                </div>
                                <div className="done-task-1">
                                    <div className="done-task-logo">
                                        <BiTask className='binoted' style={{ fontSize: "18px" }} />
                                    </div>
                                    <div className="value-text-overview">
                                        Done Task
                                    </div>
                                    <div className="value-at-overview">
                                        {taskOverview.task_done}
                                    </div>
                                    <div className="see-more-details">
                                        See More
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        style={{
                            width: "90%",
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
                                <Row style={{ width: "280px", height: "60px", display: "flex", margin: "auto", backgroundColor: "#DBF0EA", marginBottom: "10px", borderRadius: "10px 10px 10px 10px" }}>
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
                                <Row style={{ width: "280px", height: "60px", display: "flex", margin: "auto", backgroundColor: "#DBF0EA", marginBottom: "10px", borderRadius: "10px 10px 10px 10px" }}>
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
                                <Row style={{ width: "280px", height: "60px", display: "flex", margin: "auto", backgroundColor: "#DBF0EA", marginBottom: "10px", borderRadius: "10px 10px 10px 10px" }}>
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
                </Col>
            </Row>
        </div>
    );
}

export default Home;