import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Empty, Space, Checkbox, Layout, Modal, Row, Input, Form } from 'antd';
import { ClockCircleOutlined, MailOutlined, FileOutlined } from '@ant-design/icons'
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { BrowserRouter as Router, Route, Link, useHistory, useParams } from "react-router-dom";
import './EditBoardModal.css';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import { ClickedTask } from "../clickedTask/ClickedTask";

const EditBoardModal = ({ visible, editedBoard, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            width={340}
            style={{ textAlign: "center" }}
            visible={visible}
            title="Edit Board"
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
                    name="board_name"
                    rules={[
                        {
                            required: false,
                            message: 'Please input the new workspace name!',
                        },
                    ]}
                    initialValue={editedBoard.board_name}
                >
                    <div className="workspace-name-and-logo">
                        <div className="workspace-logo">
                            <MailOutlined />
                        </div>
                        <div className="workspace-name-and-input">
                            <div className="workspace-name">
                                Board Name
                            </div>
                            <div className="form-input-workspace-name">
                                <Input placeholder={editedBoard.board_name} style={{ borderRadius: "10px 10px 10px 10px" }} />
                            </div>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item
                    name="description"
                    initialValue={editedBoard.board_description}
                    className="collection-create-form_last-form-item" >
                    <div className="workspace-name-and-logo">
                        <div className="workspace-logo">
                            <FileOutlined />
                        </div>
                        <div className="workspace-name-and-input">
                            <div className="workspace-name">
                                Description
                            </div>
                            <div className="form-input-workspace-name">
                                <Input.TextArea style={{ borderRadius: "10px 10px 10px 10px" }} placeholder={editedBoard.board_description} />
                            </div>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};
const PageTitle = (props) => {

    const { Sider } = Layout;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const context = useContext(WorkspaceContext)
    const { workspace_id } = useParams()
    const [overview, setOverview] = useState([])
    const token = getToken()
    const { activeWorkspace, GetWorkspaceById } = useContext(WorkspaceContext)
    const [taskOverview, setTaskOverview] = useState([])
    const [members, setMembers] = useState([])
    const [form] = Form.useForm()
    
    
    const handleOk = async (values) => {
        const response = await axios.patch(BASE_API_URL + 'boards', {
            id:props.editedBoard.id,
            board_name: values.board_name,
            board_description: values.description
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
        console.log(values)
        // console.log(response)
        setIsModalVisible(false);

    };
    const showModal = () => {
        setIsModalVisible(true);
    };    
    useEffect(() => {
        GetWorkspaceById(workspace_id)
    }, [])
    return (
        <div className="layout-title-dashboard">
            <div className="workspace-title-dashboard-1">
                <div className="workspace-title-dashboard-1-1">
                    {activeWorkspace.workspace_name}
                </div>
                <div className="workspace-title-dashboard-1-2">
                    <Button
                        type="text"
                        onClick={showModal}
                        style={{
                            backgroundColor: "none",
                            color: "black"
                        }}
                    >
                        Edit Board
                    </Button>
                </div>
                <EditBoardModal
                    visible={isModalVisible}
                    editedBoard={props.editedBoard}
                    onCreate={handleOk}
                    onCancel={() => { setIsModalVisible(false) }}
                />

            </div>
        </div >
    );
}

export default PageTitle;