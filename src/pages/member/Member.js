import React, {useContext} from 'react'
import { Card, Row, Col, Button, Input, Layout } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import './Member.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Nav from "../../components/Nav";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import MemberCard from "../../components/memberCard/MemberCard";

import { FloatingButton } from "../../components/floatingButton/FloatingButton";

import '../../components/taskOnBoard/TaskOnBoard.css';
import TaskOnBoard from '../../components/taskOnBoard/TaskOnBoard';
import Income from "../../components/reportIncome/ReportIncome";
import { BsArrowRight } from 'react-icons/bs';

function refreshPage() {
    window.location.reload(true);
  }

const Member = () =>{

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
                <Layout className="main-layout" style={{ backgroundColor: "white" }}>
                    <div className="spacer"/>
                    <div className="floating-button-component">
                        <FloatingButton />
                    </div>
                    <div className="layout-title-member">
                        Workspace Name
                    </div>
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