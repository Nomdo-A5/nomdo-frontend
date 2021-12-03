import React, { useEffect, useState, useContext } from 'react'
import { Card, Row, Col, Button, Input, Layout, Space, Empty, Progress } from 'antd';
import './Board.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Nav from "../../components/Nav";
import { MailOutlined } from '@ant-design/icons'
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import ProgressBar from '../../components/progressBar/ProgressBar';
import BoardOnBoard from '../../components/boardOnBoard/BoardOnBoard';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import axios from 'axios';
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { BrowserRouter as Router, useLocation, useHistory, Link, useParams } from "react-router-dom";

import { IoCloudOfflineOutline } from 'react-icons/io5';
import { BoardContext } from '../../context/BoardContext';
function refreshPage() {
    window.location.reload(true);
}

const Board = () => {

    const { Sider } = Layout;
    const token = getToken();
    const [error, setError] = useState(null)
    const [boardInfoError, setBoardInfoError] = useState(null)
    const { activeWorkspace, GetWorkspaceById } = useContext(WorkspaceContext)
    const { boards, setBoards,boardInfo, GetBoardInformation} = useContext(BoardContext)
    const { workspace_id } = useParams()
    const { state } = useLocation()
    const history = useHistory();
    const context = useContext(BoardContext)

    const GetBoard = async () => {
        console.log("INI FUNGSI GET BOARD")
        try {
            const response = await axios.get(BASE_API_URL + 'boards', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    'workspace_id': `${workspace_id}`
                }
            })
            setBoards(response.data.boards)
            setError(null)
        } catch (err) {
            console.log(err)
            setError(err)
        }
    }

    useEffect(() => {
        GetBoard()
        GetWorkspaceById(workspace_id)
    }, [])

    const GetErrorView = () => {
        return (
            <div className="main-div">
                <Empty
                    description={
                        <span>
                            You don't have any board
                        </span>
                    } />

            </div>
        )
    }

    const GetBoardView = () => {
        console.log("RENDER GET BOARD VIEW")
        return (
            <div>
                <div className="main-layout">
                    <div className="layout-title">
                        {activeWorkspace.workspace_name}
                    </div>
                    {boards.map(board => (
                        <div className="boards-component-view">
                            <div className="logo-title-progress">
                                <div className="board-title-and-logo">
                                    <div className="boards-title">
                                        <Link to="/BoardExtended" onClick={() => history.push("/BoardExtended")} >
                                            {board.board_name}
                                        </Link>
                                    </div>
                                </div>
                                <div className="progress-bar-component">                                    
                                    <ProgressBar key={board.id} board_id={board.id}/>                                 
                                </div>
                            </div>
                            <div className="line-of-boards">
                                <div className="line-of-boards-item">
                                    <BoardOnBoard board_id={board.id} board_name={board.board_name} workspace_name={activeWorkspace.workspace_name}/>
                                </div>                                
                            </div>
                            <div className="see-all">
                                <Link to={{ pathname: `/workspace/${workspace_id}/boards/${board.id}/tasks`, state: { board_id : board.id } }} onClick={() => history.push("/workspace/${workspace_id}/boards/${board.id}/tasks")} >
                                    See all
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <Router>
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
                        <Layout style={{ backgroundColor: "white" }}>
                            
                            {error ? <GetErrorView /> : <GetBoardView />
                            }
                        </Layout>
                    </Layout>
                </div>

            </WorkspaceContextProvider>
        </Router>

    );
}

export default Board;