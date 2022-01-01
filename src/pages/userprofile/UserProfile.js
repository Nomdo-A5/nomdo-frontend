import React, { useContext, useState, useEffect } from 'react';
import { BASE_API_URL } from '../../constants/urls';
import NavbarMain from "../../components/NavbarMain";
import Sidebar from '../../components/sidebar/Sidebar';
import axios from "axios";
import { getToken } from '../../utils/authentication';
import { Layout, Input, Button, Row, Col, Form } from "antd";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import "./UserProfile.css";
import ProfilePic from './profile.svg'
import ProfileBackground from './ProfilePana.svg'

import { AiFillSetting } from 'react-icons/ai';
import { BsPersonFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import { UserContext } from '../../context/UserContext';

const UserProfile = () => {
    const history = useHistory();

    const { Header, Content, Sider } = Layout;
    const [task, setTask] = useState([]);
    const [workspace, setWorkspace] = useState([]);
    const {user} = useContext(UserContext)
    const { activeWorkspace, GetWorkspaceById } = useContext(WorkspaceContext)

    const onFinish = (values) => {
        //ini untuk code ganti profile tapi dari BE belum ada
    }
    return (

        <WorkspaceContextProvider>
        <Layout >
            <Row style={{ height: "8vh", backgroundColor: "#DDFBEB" }} />
            <Row style={{ height: "84vh" }}>
                <Col
                    span={20}
                    push={4}
                >
                    <div className="layout-container" style={{ height: "84vh" }}>
                        <div className="layout-top" style={{ height: "12vh" }}>
                            <div className="edit-profile" style={{ height: "9vh" }}>
                                Edit Profile
                            </div>
                            <div className="setting-routes">
                                <Link to="/userprofile" onClick={() => history.push("/userprofile")}  className="profile-link">
                                    <div className="setting-routes-profile">
                                        <div className="setting-routes-profile-icon">
                                            <BsPersonFill />
                                        </div>
                                        <div className="setting-routes-profile-text">
                                            Profile
                                        </div>
                                    </div>
                                </Link>
                                <Link to="/usersetting" onClick={() => history.push("/usersetting")}  className="setting-link">
                                    <div className="setting-routes-setting">
                                        <div className="setting-routes-setting-icon">
                                            <AiFillSetting />
                                        </div>
                                        <div className="setting-routes-setting-text">
                                            Setting
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="layout-bottom" style={{ height: "72vh" }}>
                            <Row>
                                <Col
                                    span={12}
                                    style={{ height: "72vh" }}
                                >
                                    <div className="contact-title">
                                        Contact
                                    </div>
                                    <Form
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="name"
                                            initialValue={user.name}

                                        >
                                            <div className="user-name-profile">
                                                Name
                                            </div>
                                            <div className="input-area-name">
                                                <div className="form-input-profile-name">
                                                    <Input placeholder={user.name} style={{ borderRadius: "10px 10px 10px 10px" }} />
                                                </div>
                                            </div>
                                        </Form.Item>
                                        <Form.Item
                                            name="email"
                                            initialValue={user.email}
                                        >
                                            <div className="user-email-profile">
                                                Email
                                            </div>
                                            <div className="input-area-email">
                                                <div className="form-input-profile-email">
                                                    <Input placeholder={user.email} style={{ borderRadius: "10px 10px 10px 10px" }} />
                                                </div>
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <div className="task-button-profile">
                                                <div className="task-button-save">
                                                    <Button
                                                        type="success"
                                                        htmlType="submit"
                                                        style={{ background: "#4ABDAC", borderColor: "#4ABDAC", width: "150px", borderRadius: "10px 10px 10px 10px", textDecoration: "none", color: "#F7F7F7" }}
                                                    >
                                                        Save Changes
                                                    </Button>
                                                </div>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col
                                    span={12}
                                    style={{ height: "72vh" }}
                                >
                                    <img
                                        style={{ borderRadius: "15px" }}
                                        className="images-profile-background" src={ProfileBackground} alt=""
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col
                    span={4}
                    pull={20}
                    style={{ backgroundColor: "#DDFBEB" }}
                >
                    <img
                        style={{ borderRadius: "15px" }}
                        className="imagez" src={ProfilePic} height={150} alt=""
                    />
                </Col>
            </Row>
        </Layout>
        </WorkspaceContextProvider>
    )
}

export default UserProfile;