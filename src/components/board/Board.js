import React, { useEffect, useState, useContext } from 'react'
import { Card, Row, Col, Button, Input, Layout, Space } from 'antd';
import './Board.css';
import Sidebar from '../sidebar/Sidebar';
import Nav from "../Nav";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import ProgressBar from '../progressBar/ProgressBar';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import axios from 'axios';
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { BrowserRouter as Router, useLocation , useHistory} from "react-router-dom"
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
                        
                        <div className="layout-title">
                                    DIGANTI HEY
                                </div>
                        <div className="boards-lists">
                            <Space wrap style={{ width: "1100px", backgroundColor: "white" }}>
                                {boards.map((board) => (
                                    <ProgressBar board_name={board.board_name} />
                                ))}
                            </Space>
                        </div>
                    </Layout>
                </Layout>
            </div>

        </WorkspaceContextProvider>
        </Router>
        
    );
}

export default Board;