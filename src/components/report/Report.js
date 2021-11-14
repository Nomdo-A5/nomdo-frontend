import React from 'react'
import { Card, Row, Col, Button, Input, Layout, Space } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import './Board.css';
import Sidebar from '../sidebar/Sidebar';
import Nav from "../Nav";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';

import '../taskOnBoard/TaskOnBoard.css';
import TaskOnBoard from '../taskOnBoard/TaskOnBoard';

function refreshPage() {
    window.location.reload(true);
  }

const Board = () =>{

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
                    <div className="boards-lists">
                        <Space wrap style={{ width: "1100px", backgroundColor: "white" }}>
                            <TaskOnBoard />
                        </Space>
                    </div>
                </Layout>
            </Layout>
        </div>
        
        </WorkspaceContextProvider>
    );
}

export default Board;