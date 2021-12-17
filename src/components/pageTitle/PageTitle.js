import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Empty, Space, Checkbox, Layout, Modal, Row, Input } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { BrowserRouter as Router, Route, Link, useHistory, useParams } from "react-router-dom";
import './PageTitle.css';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import { ClickedTask } from "../clickedTask/ClickedTask";

const PageTitle = () => {

    const { Sider } = Layout;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const context = useContext(WorkspaceContext)
    const { workspace_id } = useParams()
    const [overview, setOverview] = useState([])
    const token = getToken()
    const { activeWorkspace, GetWorkspaceById } = useContext(WorkspaceContext)
    const [taskOverview, setTaskOverview] = useState([])
    const [members, setMembers] = useState([])

    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const GetOverview = async () => {
        const response = await axios.get(BASE_API_URL + 'report/overview', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': `${workspace_id}`
            }
        })
        console.log(response)
        setOverview(response.data)
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const GetTaskOverview = async () => {
        const response = await axios.get(BASE_API_URL + 'workspace/task-information', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': `${workspace_id}`
            }
        })
        console.log(response)
        setTaskOverview(response.data)
    }

    const GetMember = async () => {
        const response = await axios.get(BASE_API_URL + 'workspace/member', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': `${workspace_id}`
            }
        })
        console.log(response)
        setMembers(response.data.member)
    }
    useEffect(() => {
        GetOverview()
        GetWorkspaceById(workspace_id)
        GetTaskOverview()
        GetMember()
    }, [])
    return (
        <div className="layout-title-dashboard">
            <div className="workspace-title-dashboard-1">
                <div className="workspace-title-dashboard-1-1">
                    {activeWorkspace.workspace_name}
                </div>
                <div className="workspace-title-dashboard-1-2">
                    <Button
                        type="link" 
                        onClick={showModal} 
                        style={{ 
                            color: "#4ABDAC",
                            marginTop: "auto",
                            marginBottom: "auto"
                        }}
                    >
                        <FiEdit
                        style={{fontSize: "16px"}}/>
                    </Button>
                </div>
                <Modal title="" visible={isModalVisible} 
                    onOk={handleOk} onCancel={handleCancel}
                    style={{ textAlign: "center" }}
                    okText="Save" width={330}>
                    
                    <div>
                        <Row>
                            <div>
                                <div className="workspace-name-top">
                                    {activeWorkspace.workspace_name}
                                </div>
                                <div className="workspace-and-description">
                                    <div className="title-and-description">
                                        <div className="workspace-page-title">
                                            Workspace Title
                                        </div>
                                        <div className="input-area-title">
                                            <div className="form-input-workspace-title">
                                                <Input.TextArea style={{ borderRadius: "10px 10px 10px 10px" }} placeholder={activeWorkspace.workspace_name} />
                                            </div>
                                        </div>
                                        <div className="workspace-description">
                                            Description
                                        </div>
                                        <div className="input-area-description">
                                            <div className="form-input-workspace-description">
                                                <Input.TextArea style={{ borderRadius: "10px 10px 10px 10px" }} placeholder={activeWorkspace.workspace_description} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default PageTitle;