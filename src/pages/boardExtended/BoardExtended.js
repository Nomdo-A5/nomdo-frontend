import React, { useEffect, useState, useContext } from 'react'
import { Card, Row, Col, Button, Input, Layout, Space } from 'antd';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import './BoardExtended.css';
import Sidebar from '../../components/sidebar/Sidebar';
import NavbarMain from "../../components/NavbarMain";
import { MailOutlined } from '@ant-design/icons'
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import ProgressBar from '../../components/progressBar/ProgressBar';
import TaskOnBoard from '../../components/taskOnBoard/TaskOnBoard';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import axios from 'axios';
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { BrowserRouter as Router, useLocation, useHistory, Link, useParams } from "react-router-dom";
import { BoardContext } from '../../context/BoardContext';

function refreshPage() {
    window.location.reload(true);
}

const BoardExtended = () => {

    const { Sider } = Layout;
    const token = getToken();
    const [boards, setBoards] = useState([]);
    const { activeWorkspace, GetWorkspaceById } = useContext(WorkspaceContext)
    const { state } = useLocation()
    const { workspace_id, board_id } = useParams()
    const history = useHistory();
    const { activeBoard, GetBoardById } = useContext(BoardContext)

    useEffect(() => {
        GetBoardById(workspace_id, board_id)
        GetWorkspaceById(workspace_id)
    }, [])

    const handleBack = () => {

    }
    return (

        <Layout style={{ backgroundColor: "white" }}>
            <div className="main-layout" style={{ backgroundColor: "white" }}>
                <div className="layout-title">
                    {activeWorkspace.workspace_name}
                </div>
                <div className="boards-component-view">
                    <div className="logo-title-progress">
                        <div className="board-title-and-logo">
                            <div className="board-logo">
                                <Link to={{ pathname: `/workspace/${workspace_id}/boards`, state: { workspace: workspace_id } }} >
                                    <AiOutlineArrowLeft />
                                </Link>

                            </div>
                            <div className="boards-title">
                                {activeBoard.board_name}
                            </div>
                        </div>
                    </div>
                    <div className="line-of-boards">
                        <div className="line-of-boards-item">
                            <TaskOnBoard board_id={board_id} board_name={activeBoard.board_name} workspace_name={activeWorkspace.workspace_name} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    );
}

export default BoardExtended;