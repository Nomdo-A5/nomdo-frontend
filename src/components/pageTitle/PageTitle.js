import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Empty, Space, Checkbox, Layout, Modal, Row, Input, Form } from 'antd';
import { ClockCircleOutlined, MailOutlined, QrcodeOutlined } from '@ant-design/icons'
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { BrowserRouter as Router, Route, Link, useHistory, useParams } from "react-router-dom";
import './PageTitle.css';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import { ClickedTask } from "../clickedTask/ClickedTask";

const EditWorkspaceForm = ({ visible, workspace, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            width={340}
            style={{ textAlign: "center" }}
            visible={visible}
            title="Edit Workspace"
            okText="Save Changes"
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
                            <QrcodeOutlined />
                        </div>
                        <div className="workspace-name-and-input">
                            <div className="workspace-name">
                                Workspace's Code
                            </div>
                            <div className="form-input-workspace-name">
                                Code's here
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
                            <MailOutlined />
                        </div>
                        <div className="workspace-name-and-input">
                            <div className="workspace-name">
                                Workspace Name
                            </div>
                            <div className="form-input-workspace-name">
                                <Input placeholder={workspace.workspace_name} style={{ borderRadius: "10px 10px 10px 10px" }} />
                            </div>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item
                    name="description"
                    initialValue={workspace.workspace_description}
                    className="collection-create-form_last-form-item" >
                    <div className="balance-name-and-logo">
                        <div className="balance-name-and-input">
                            <div className="balance-name">
                                Description
                            </div>
                            <div className="form-input-balance-name">
                                <Input.TextArea style={{ borderRadius: "10px 10px 10px 10px" }} placeholder={workspace.workspace_description} />
                            </div>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};
const PageTitle = () => {

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
        <div className="layout-title-dashboard" style={{ backgroundColor: "white"}}>
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
                            style={{ fontSize: "16px" }} />
                    </Button>
                </div>
                <EditWorkspaceForm
                    visible={isModalVisible}
                    workspace={activeWorkspace}
                    onCreate={handleOk}
                    onCancel={() => { setIsModalVisible(false) }}
                />

            </div>
        </div >
    );
}

export default PageTitle;