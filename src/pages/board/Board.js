import React, { useEffect, useState, useContext } from 'react'
import { Card, Row, Col, Button, Input, Layout, Space, Empty, Progress , Modal} from 'antd';
import './Board.css';
import Sidebar from '../../components/sidebar/Sidebar';
import NavbarMain from "../../components/NavbarMain";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import ProgressBar from '../../components/progressBar/ProgressBar';
import TaskOnBoard from '../../components/taskOnBoard/TaskOnBoard';
import TaskOnDashoard from '../../components/taskOnDashboard/TaskOnDashboard';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import axios from 'axios';
import { WorkspaceContext } from "../../context/WorkspaceContext";
import PageTitle from '../../components/pageTitle/PageTitle';
import { BrowserRouter as Router, useLocation, useHistory, Link, useParams } from "react-router-dom";

import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Menu, Dropdown } from 'antd';
import { BoardContext } from '../../context/BoardContext';
import EditBoardModal from '../../components/editBoardModal/EditBoardModal';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

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
    const { confirm } = Modal

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

    const deleteBoard = async ($id) => {
        const response = await axios.delete(BASE_API_URL + 'boards', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id: $id
            }
        });

        console.log(response)
    }
    function showDeleteConfirm($id) {
        confirm({
            title: 'Are you sure want to delete this board?',
            icon: <ExclamationCircleOutlined />,
           
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteBoard($id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const menuEdit = (id) => (
        <Menu>
            <Menu.Item key="edit">
            <div className='edit-board-at-board'>
                <div className='edit-board-at-board-1'>
                    <AiOutlineEdit style={{fontSize:"large", marginRight:"10px", margin: "auto"}}/>
                </div>
                <div className='edit-board-at-board-2'>
                    <EditBoardModal/>
                </div>
            </div>
            </Menu.Item>
            <Menu.Item key="delete" onClick={() => showDeleteConfirm(id)}>
            <div className='edit-board-at-board'>
                <div className='edit-board-at-board-1'>
                    <AiOutlineDelete style={{fontSize:"large", marginRight:"10px"}}/>
                </div>
                <div className='edit-board-at-board-2'>
                    Delete Board
                </div>
            </div>
            </Menu.Item>
        </Menu>
    );

    const GetBoardView = () => {
        console.log("RENDER GET BOARD VIEW")
        return (
            <div>
                <div className="main-layout">
                    <div className="layout-title">
                    
                    </div>
                    {boards.map(board => (
                        <div className="boards-component-view">
                            <div className="logo-title-progress">
                                <div className="board-title-and-logo">
                                    <div className="boards-title">
                                        <div className="boards-title-text">
                                            {board.board_name}
                                        </div>
                                        <div className="boards-title-edit">
                                            <Dropdown overlay={menuEdit(board.id)} trigger={['click']}>
                                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                    <BiDotsVerticalRounded style={{color:"#969CA3", fontSize:"large"}}/>
                                                </a>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                <div className="progress-bar-component">                                    
                                    <ProgressBar key={board.id} board_id={board.id}/>                                 
                                </div>
                            </div>
                            <div className="line-of-boards">
                                <div className="line-of-boards-item">
                                    <TaskOnBoard board_id={board.id} board_name={board.board_name} workspace_name={activeWorkspace.workspace_name}/>
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
                <NavbarMain />
                <div className="spacer"/>
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