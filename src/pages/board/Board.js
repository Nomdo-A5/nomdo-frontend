import React, { useEffect, useState, useContext } from 'react'
import { Card, Row, Col, Button, Input, Layout, Space } from 'antd';
import './Board.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Nav from "../../components/Nav";
import { MailOutlined } from '@ant-design/icons'
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import ProgressBar from '../../components/progressBar/ProgressBar';
import Boards from '../../components/boardOnBoard/BoardOnBoard';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import axios from 'axios';
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { BrowserRouter as Router, useLocation , useHistory, Link } from "react-router-dom";

function refreshPage() {
    window.location.reload(true);
}

const Board = () => {

    const { Sider } = Layout;
    const token = getToken();
    const [boards, setBoards] = useState([]);
    const context = useContext(WorkspaceContext)
    const { state } = useLocation()
    const history = useHistory();

    const GetBoard = async () => {
        const workspace_id = state.workspace
        const response = await axios.get(BASE_API_URL + 'boards', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': `${workspace_id}`
            }
        })
        console.log(response.data)
        setBoards(response.data.boards)
    }

    useEffect(() => {
        GetBoard()
    }, [])

    return (
        <Router>
            <WorkspaceContextProvider>
            <Nav />
            <div>
                <Layout >
                    <Sider>
                        <Sidebar>
                            <div className="floating-button-component">
                                <FloatingButton />
                            </div>
                        </Sidebar>
                    </Sider>
                    <Layout style={{ backgroundColor: "white" }}>
                        <div className="floating-button-component">
                            <FloatingButton />
                        </div>

                        <div className="main-layout">
                            <div className="layout-title">
                                Nama Workspace
                            </div>
                            <div className="boards-component-view">
                                <div className="logo-title-progress">
                                    <div className="board-title-and-logo">
                                        <div className="board-logo">
                                            <MailOutlined />
                                        </div>
                                        <div className="boards-title">
                                            <Link to="/BoardExtended" onClick={() => history.push("/BoardExtended")} >
                                                Divisi Acara
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="progress-bar-component">
                                        <ProgressBar />
                                    </div>
                                </div>
                                <div className="line-of-boards">
                                    <div className="line-of-boards-item">
                                        <Boards />
                                    </div>
                                    <div className="line-of-boards-item">
                                        <Boards />
                                    </div>
                                    <div className="line-of-boards-item">
                                        <Boards />
                                    </div>
                                    <div className="line-of-boards-item">
                                        <Boards />
                                    </div>
                                </div>
                                <div className="see-all">
                                    <Link to="/BoardExtended" onClick={() => history.push("/BoardExtended")} >
                                        See all
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="main-layout">
                            <div className="boards-component-view">
                                <div className="logo-title-progress">
                                    <div className="board-title-and-logo">
                                        <div className="board-logo">
                                            <MailOutlined />
                                        </div>
                                        <div className="boards-title">
                                            Divisi Acara
                                        </div>
                                    </div>
                                    <div className="progress-bar-component">
                                        <ProgressBar />
                                    </div>
                                </div>
                                <div className="line-of-boards">
                                    <div className="line-of-boards-item">
                                        <Boards />
                                    </div>
                                    <div className="line-of-boards-item">
                                        <Boards />
                                    </div>
                                    <div className="line-of-boards-item">
                                        <Boards />
                                    </div>
                                    <div className="line-of-boards-item">
                                        <Boards />
                                    </div>
                                </div>
                                <div className="see-all">
                                    <Link to="/BoardExtended" onClick={() => history.push("/BoardExtended")} >
                                        See all
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </Layout>
                </Layout>
            </div>

        </WorkspaceContextProvider>
        </Router>
        
    );
}

export default Board;