import React , { useContext, useState, useEffect }from 'react';
import { BASE_API_URL } from '../../constants/urls';
import NavbarMain from "../../components/NavbarMain";
import Sidebar from '../../components/sidebar/Sidebar';
import axios from "axios";
import { getToken } from '../../utils/authentication';
import { Layout, Input, Button, Row, Col } from "antd";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import "./UserSetting.css";
import ProfilePic from './profile.svg'
import ProfileBackground from './ProfilePana.svg'

import { AiFillSetting } from 'react-icons/ai';
import { BsPersonFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FloatingButton } from "../../components/floatingButton/FloatingButton";

const UserSetting = () =>{
    const history = useHistory();
    
    const { Header, Content, Sider } = Layout;
    const [task, setTask] = useState([]);
    const [workspace, setWorkspace] = useState([]);  
    const [user, setUser] = useState('')
    const { activeWorkspace, GetWorkspaceById } = useContext(WorkspaceContext)

    useEffect(() => {
        getActiveUser()
      }, [])    


    const getActiveUser = async () => {
        const token = getToken();
        const response = await axios.get(BASE_API_URL +'user', {
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
            <NavbarMain />
            <div className="spacer"/>
            <Layout>
                <Sider>
                    <Sidebar />
                    <div className="floating-button-component">
                        <FloatingButton />
                    </div>
                </Sider>
                <Layout >
                    <Row style={{height: "8vh", backgroundColor: "#DDFBEB" }}/>
                    <Row style={{height: "84vh"}}>
                        <Col 
                            span={20} 
                            push={4}
                        >
                            <div className="layout-container" style={{height: "84vh"}}>
                                <div className="layout-top" style={{height: "12vh"}}>
                                    <div className="edit-profile" style={{height: "9vh"}}>
                                        Edit Profile
                                    </div>
                                    <div className="setting-routes">
                                        <Link to="/userprofile" className="profile-link">
                                            <div className="setting-routes-profile">
                                                <div className="setting-routes-profile-icon">
                                                    <BsPersonFill/>
                                                </div>
                                                <div className="setting-routes-profile-text">
                                                    Profile
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="/usersetting" className="setting-link">
                                            <div className="setting-routes-setting">
                                                <div className="setting-routes-setting-icon">
                                                    <AiFillSetting/>
                                                </div>
                                                <div className="setting-routes-setting-text">
                                                    Setting
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="layout-bottom" style={{height: "72vh"}}>
                                    <Row>
                                        <Col 
                                            span={12} 
                                            style={{ height: "72vh"}}
                                        >
                                            <div className="contact-title">
                                                Contact
                                            </div>
                                            <div className="change-password">
                                                Change Password
                                            </div>
                                            <div className="password-div">
                                                Old Password
                                            </div>
                                            <div className="input-area-name">
                                                <div className="form-input-profile-name">
                                                    <Input placeholder={user.password} style={{ borderRadius: "10px 10px 10px 10px" }} />
                                                </div>
                                            </div>
                                            <div className="password-div">
                                                New Password
                                            </div>
                                            <div className="input-area-name">
                                                <div className="form-input-profile-name">
                                                    <Input placeholder={user.password} style={{ borderRadius: "10px 10px 10px 10px" }} />
                                                </div>
                                            </div>
                                            <div className="password-div">
                                                Confirm New Password
                                            </div>
                                            <div className="input-area-name">
                                                <div className="form-input-profile-name">
                                                    <Input placeholder={user.password} style={{ borderRadius: "10px 10px 10px 10px" }} />
                                                </div>
                                            </div>
                                            <div className="task-button-profile">
                                                <div className="task-button-save">
                                                    <Button 
                                                        type="success" 
                                                        style={{ background: "#4ABDAC", borderColor: "#4ABDAC", width: "150px", borderRadius: "10px 10px 10px 10px", textDecoration: "none", color: "#F7F7F7" }}
                                                    >
                                                        Save Changes
                                                    </Button>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col 
                                            span={12} 
                                            style={{height: "72vh"}}
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
            </Layout>
            </div>
        </WorkspaceContextProvider>
    )
}

export default UserSetting;