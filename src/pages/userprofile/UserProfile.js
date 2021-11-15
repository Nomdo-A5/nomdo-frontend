import React , { useState, useEffect }from 'react';
import { BASE_API_URL } from '../../constants/urls';
import Nav from "../../components/Nav";
import Sidebar from '../../components/sidebar/Sidebar';
import axios from "axios";
import { getToken } from '../../utils/authentication';

import { Layout, Input, Button } from "antd";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";

import "./UserProfile.css";

import { CgProfile } from 'react-icons/cg';
import { FloatingButton } from "../../components/floatingButton/FloatingButton";

const UserProfile = () =>{
    const history = useHistory();
    
    const { Header, Content, Sider } = Layout;
    const [task, setTask] = useState([]);
    const [workspace, setWorkspace] = useState([]);  

    useEffect(() => {
        //GetWorkspace()
        GetTask()
      }, [])    

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
                                    Nama User
                                </div>
                                <div className="profile-email">
                                    user@gmail.com
                                </div>
                            </div>
                        </div>
                        <div className="workspace-boxes-profile">
                            <div className="workspace-boxes-user-profile">
                                <Link to="/userprofile" onClick={() => history.push("/userprofile")}>
                                    <h5>Profile</h5>
                                </Link>
                            </div>
                            <div className="workspace-boxes-user-setting">
                                <Link to="/usersetting" onClick={() => history.push("/usersetting")}>
                                    <h5>Setting</h5>
                                </Link>
                            </div>
                        </div>
                        <div className="blank-spot" />
                        <div className="setting-items">
                            <div className="about-user">
                                About
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
                                    Bio
                                    <Input placeholder="Biodata" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                </div>
                                <div className="button-save">
                                    <Button type="success" style={{ background: "#C9EBE6", borderColor: "#657673", width: "350px" }}>Save</Button>
                                </div>
                                <div className="signout-user">
                                    Signout
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

export default UserProfile;