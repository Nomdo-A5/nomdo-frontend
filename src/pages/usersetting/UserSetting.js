import React, { useState, useEffect } from 'react';
import { BASE_API_URL } from '../../constants/urls';
import Nav from "../../components/Nav";
import Sidebar from '../../components/sidebar/Sidebar';
import Task from '../../components/task/Task';
import TaskOnBoard from '../../components/taskOnBoard/TaskOnBoard';
import ProgressBar from '../../components/progressBar/ProgressBar';
import axios from "axios";
import { getToken } from '../../utils/authentication';

import { Layout, Space, Input, Button } from "antd";
import { CgProfile } from 'react-icons/cg';
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import Topbar_Profile from "../../components/Topbar_Profile";
import { BrowserRouter as Router, Route, Link, useHistory, Switch } from "react-router-dom";

import "./UserSetting.css";

import { Tablereport } from "../../components/tablereport/Tablereport";
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import { FloatingBoard } from "../../components/floatingBoard/FloatingBoard";
import { FloatingMoneyReport } from "../../components/floatingMoneyReport/FloatingMoneyReport";
import { JoinWorkspace } from "../../components/joinWorkspace/JoinWorkspace";
import { ClickedTask } from "../../components/clickedTask/ClickedTask";

const UserSetting = () => {
    const history = useHistory();

    const { Header, Content, Sider } = Layout;
    const [task, setTask] = useState([]);
    const [workspace, setWorkspace] = useState([]);
    const [user, setUser] = useState('')

    useEffect(() => {
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
        <WorkspaceContextProvider>
            <div>
                <Nav />
                <Layout>
                    <Sider>
                        <Sidebar />
                        <div className="floating-button-component">
                            <FloatingButton />
                        </div>
                    </Sider>
                    <Layout >
                        <div className="main-div-structure-profile">
                            <div className="profile-main">
                                <div className="profile-pic">
                                    <CgProfile />
                                </div>
                                <div className="profile-name-email">
                                    <div className="profile-name">
                                        {user.name}
                                    </div>
                                    <div className="profile-email">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                            <div className="workspace-boxes-profile">
                                <div className="workspace-boxes-user-profile">
                                    <Link to="/userprofile" onClick={() => history.push("/report")}>
                                        <h5>Profile</h5>
                                    </Link>
                                </div>
                                <div className="workspace-boxes-user-setting">
                                    <Link to="/usersetting" onClick={() => history.push("/report")}>
                                        <h5>Setting</h5>
                                    </Link>
                                </div>
                            </div>
                            <div className="blank-spot" />
                            <div className="setting-items">
                                <div className="about-user">
                                    Account Details
                                </div>
                                <div className="inner-items">
                                    <div className="username-user">
                                        Username
                                        <Input placeholder="Username" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                    </div>
                                    <div className="email-user">
                                        Email
                                        <Input placeholder="Email" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                    </div>
                                    <div className="biodata-user">
                                        Password
                                        <Input placeholder="Password" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                    </div>
                                    <div className="button-save">
                                        <Button type="success" style={{ background: "#C9EBE6", borderColor: "#657673", width: "350px" }}>Save</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Layout>
                </Layout>
            </div>
        </WorkspaceContextProvider>



    )
}

export default UserSetting;