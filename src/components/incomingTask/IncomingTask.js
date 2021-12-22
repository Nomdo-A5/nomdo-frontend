import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Empty, Space, Checkbox, Layout, Modal, Row, Input, Form } from 'antd';
import { FileOutlined, UsergroupDeleteOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { BrowserRouter as Router, Route, Link, useHistory, useParams } from "react-router-dom";
import './IncomingTask.css';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import { ClickedTask } from "../clickedTask/ClickedTask";

const ShowTaskForm = ({ visible, workspace, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            width={340}
            style={{ textAlign: "center" }}
            visible={visible}
            title="Task Name"
            cancelText="Cancel"
            centered={true}
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"

            >
                <Form.Item
                    name="workspace_name"
                    rules={[
                        {
                            required: false,
                            message: 'Please input the new workspace name!',
                        },
                    ]}
                    initialValue={workspace.workspace_name}
                >
                    <div className="workspace-name-and-logo">
                        <div className="workspace-logo">
                            <FileOutlined />
                        </div>
                        <div className="workspace-name-and-input">
                            <div className="workspace-name">
                                Task
                            </div>
                            <div className="form-info-workspace-name">
                                Mengerjakan Layout
                            </div>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item
                    name="workspace_name"
                    rules={[
                        {
                            required: false,
                            message: 'Please input the new workspace name!',
                        },
                    ]}
                    initialValue={workspace.workspace_name}
                >
                    <div className="workspace-name-and-logo">
                        <div className="workspace-logo">
                            <UsergroupDeleteOutlined />
                        </div>
                        <div className="workspace-name-and-input">
                            <div className="workspace-name">
                                Boards
                            </div>
                            <div className="form-info-workspace-name">
                                Frontend
                            </div>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item
                    name="workspace_name"
                    rules={[
                        {
                            required: false,
                            message: 'Please input the new workspace name!',
                        },
                    ]}
                    initialValue={workspace.workspace_name}
                >
                    <div className="workspace-name-and-logo">
                        <div className="workspace-logo">
                            <ClockCircleOutlined />
                        </div>
                        <div className="workspace-name-and-input">
                            <div className="workspace-name">
                                Due Date
                            </div>
                            <div className="form-info-workspace-name">
                                21 December 2021
                            </div>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};
const IncomingTask = () => {

    const { Sider } = Layout;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const context = useContext(WorkspaceContext)
    const { workspace_id } = useParams()
    const [overview, setOverview] = useState([])
    const token = getToken()
    const { activeWorkspace,setActiveWorkspace, GetWorkspaceById } = useContext(WorkspaceContext)
    const [taskOverview, setTaskOverview] = useState([])
    const [members, setMembers] = useState([])
    const [form] = Form.useForm()


    const handleOk = async (values) => {
        const response = await axios.patch(BASE_API_URL + 'workspace', {
            id:activeWorkspace.id,
            workspace_name: values.workspace_name,
            workspace_description: values.description
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
        console.log(values)
        console.log(response)
        setActiveWorkspace(response.data.workspace)
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
        <div className="layout-title-dashboard" style={{ backgroundColor: "transparent"}}>
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
                    style={{ fontSize: "18px" }} />
            </Button>
            <ShowTaskForm
                visible={isModalVisible}
                workspace={activeWorkspace}
                onCreate={handleOk}
                onCancel={() => { setIsModalVisible(false) }}
            />
        </div >
    );
}

export default IncomingTask;