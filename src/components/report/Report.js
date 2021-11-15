import React from 'react'
import { Card, Row, Col, Button, Input, Layout, Space } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import './Report.css';
import Sidebar from '../sidebar/Sidebar';
import Nav from "../Nav";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';

import '../taskOnBoard/TaskOnBoard.css';
import { Tablereport } from "../../components/tablereport/Tablereport";
import TaskOnBoard from '../taskOnBoard/TaskOnBoard';
import { FloatingButton } from "../../components/floatingButton/FloatingButton";

function refreshPage() {
    window.location.reload(true);
  }

const Report = () =>{

    const { Sider } = Layout;
    return (
        <WorkspaceContextProvider>
        <Nav />
        <div>
            <Layout >
                <Sider>
                    <Sidebar />
                    <div className="floating-button-component">
                        <FloatingButton />
                    </div>
                </Sider>
                <Layout style={{backgroundColor: "white"}}>
                    <div className="report-title">
                        Workspace Name
                    </div>
                    <div className="report-table">
                        <Tablereport />
                    </div>
                </Layout>
            </Layout>
        </div>
        
        </WorkspaceContextProvider>
    );
}

export default Report;