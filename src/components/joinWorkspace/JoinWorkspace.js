import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState, useEffect, useContext } from 'react';

import { Card, Row, Col, Input, Form } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined, CopyOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import '../joinWorkspace/JoinWorkspace.css';

import newJoinImage from '../joinWorkspace/joinWorkspace.png'
import { getToken } from '../../utils/authentication';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';
import { WorkspaceContext } from '../../context/WorkspaceContext';

const JoinWorkspaceForm = ({ visible, onCreate, onCancel }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal
            width={340}
            style={{ textAlign: "center" }}
            centered={true}
            visible={visible}
            title="Join Workspace"
            okText="Join"
            cancelText="Cancel"
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
            }}>

            <div>
                <Row>
                    <Form
                        form={form}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{
                            modifier: 'public',
                        }}
                    >
                        <Form.Item
                            name="join_code"
                            className="join-workspace-form_last-form-item" >
                            <div className="join-name-and-logo">
                                <div className="workspace-logo">
                                    <MailOutlined />
                                </div>
                                <div className="join-name-and-input">
                                    <div className="workspace-name">
                                        Workspace code
                                    </div>
                                    <div className="input-area">
                                        <div className="form-input-join-name">
                                            <Input placeholder="Workspace Code" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Form.Item>

                    </Form>

                </Row>
            </div>
        </Modal>
    )

}
export const JoinWorkspace = () => {

    const [visible, setVisible] = useState(false);
    const token = getToken()
    const [user, setUser] = useState([])
    const {GetWorkspace} = useContext(WorkspaceContext)
    const getActiveUser = async () => {

        const response = await axios.get(BASE_API_URL + 'user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setUser(response.data.user)
    }
    const onCreate = async (values) => {
        const response = await axios.get(BASE_API_URL + 'join', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'url_join': values.join_code,
                'member_id': user.id
            }
        })
        GetWorkspace()
        console.log(response)
        setVisible(false);
    };

    useEffect(() => {
        getActiveUser()
    }, [])
    return (
        <div>
            <JoinWorkspaceForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
            <div
                className="btn w-100 h-100 d-flex justify-content-center align-items-center"

                onClick={() => {
                    setVisible(true);
                }}>
                <img src={newJoinImage} width={200} alt="" />
            </div>
        </div>
    );
}