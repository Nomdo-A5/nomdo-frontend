import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState, useContext } from 'react';

import { Card, Row, Col, Input, Select, Form, DatePicker } from 'antd';
import { FileOutlined, CalendarOutlined, MailOutlined, UserOutlined, TeamOutlined, CopyOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import '../floatingTask/FloatingTask.css';
import { WorkspaceContext, WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { BASE_API_URL } from '../../constants/urls';
import axios from 'axios';
import { getToken } from '../../utils/authentication';

import newTaskImage from '../floatingTask/newTask.png'

const NewTaskForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const context = useContext(WorkspaceContext)
    const [boards, setBoards] = useState([])
    const [members, setMembers] = useState([])
    const token = getToken()

    const handleSelectedWorkspace = (value, event) => {
        console.log("value selected workspace " + value)
        getBoards(value)
        getMember(value)
    }

    const getBoards = async (workspace_id) => {

        console.log("workspace id on getBoards " + workspace_id)
        const response = await axios.get(BASE_API_URL + 'boards', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': `${workspace_id}`
            }
        })
        console.log("ISI Response = " + response.data.boards)
        setBoards(response.data.boards)

    }

    const getMember = async (workspace_id) => {
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

    return (
        <Modal
            title="New Task"
            visible={visible}
            centered={true}
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
            onCancel={onCancel}
            style={{ textAlign: "center" }}
            okText="Add"
            width={340}>

            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"

            >
                <div>
                    <Row>
                        <Form.Item
                            name="workspace_id"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select workspace!',
                                },
                            ]}
                        >
                            <div className="workspace-name-and-logo">
                                <div className="workspace-logo">
                                    <MailOutlined />
                                </div>
                                <div className="workspace-name-and-input">
                                    <div className="workspace-name">
                                         Workspace Name
                                    </div>
                                </div>
                            </div>
                            <Select
                                style={{ marginLeft: "30px", width: 240 }}
                                placeholder="Select your workspace"
                                onSelect={(value, event) => handleSelectedWorkspace(value, event)}>
                                {context.workspace.map(w =>
                                    (<Option value={w.id}>{w.workspace_name}</Option>)
                                )}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="board_id"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select board!',
                                },
                            ]}
                        >
                            <div className="workspace-name-and-logo">
                                <div className="workspace-logo">
                                    <MailOutlined />
                                </div>
                                <div className="workspace-name-and-input">
                                    <div className="workspace-name">
                                        Board Name
                                    </div>
                                </div>
                            </div>
                            <Select
                                style={{ marginLeft: "30px", width: 240 }}
                                placeholder="Select your board">
                                {boards.map((board) => (
                                    <Option value={board.id}>{board.board_name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="task_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the new task name!',
                                },
                            ]}
                        >
                            <div className="workspace-name-and-logo">
                                <div className="workspace-logo">
                                    <MailOutlined />
                                </div>
                                <div className="workspace-name-and-input">
                                    <div className="workspace-name">
                                        Task Name
                                    </div>
                                    <div className="form-input-task-name">
                                        <Input placeholder="Add Task Name" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                    </div>
                                </div>
                            </div>
                        </Form.Item>
                        <Form.Item
                            name="task_description"
                            className="new-task-form_last-form-item"
                        >
                            <div className="workspace-name-and-logo">
                                <div className="workspace-logo">
                                    <FileOutlined />
                                </div>
                                <div className="workspace-name-and-input">
                                    <div className="workspace-name">
                                        Task Description
                                    </div>
                                    <div className="form-input-task-name">
                                        <Input.TextArea placeholder="Add Description" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                    </div>
                                </div>
                            </div>

                        </Form.Item>
                        <Form.Item
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the date!'
                                },
                            ]}
                        >
                            <div className="workspace-name-and-logo">
                                <div className="workspace-logo">
                                    <CalendarOutlined />
                                </div>
                                <div className="workspace-name-and-input">
                                    <div className="workspace-name">
                                        Date
                                    </div>
                                </div>
                            </div>
                            <DatePicker style={{ marginLeft:"30px", width: "240px", borderRadius: "10px 10px 10px 10px" }} />

                        </Form.Item>
                        <Form.Item
                            name="member_id"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please select assigned member!',
                                },
                            ]}

                        >
                            <div className="workspace-name-and-logo">
                                <div className="workspace-logo">
                                    <TeamOutlined />
                                </div>
                                <div className="workspace-name-and-input">
                                    <div className="workspace-name">
                                        Assigned Member
                                    </div>
                                </div>
                            </div>
                            <Select
                                style={{ marginLeft: "30px", width: 240 }}
                                placeholder="Select Members">
                                {members.map((member) => (
                                    <Option value={member.id}>{member.name}</Option>
                                ))}

                            </Select>

                        </Form.Item>
                    </Row>
                </div>
            </Form>

        </Modal>
    )
}
export const FloatingTask = () => {

    const [visible, setVisible] = useState(false);
    const token = getToken()

    const onCreate = async (values) => {
        const dateInput = new Date(values.date);
        const date = (dateInput.getYear() + 1900) + "-" + dateInput.getMonth() + "-" + dateInput.getDate()

        const response = await axios.post(BASE_API_URL + 'task', {
            workspace_id: values.workspace_id,
            board_id: values.board_id,
            task_name: values.task_name,
            task_description: values.task_description,
            due_date: date
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
        console.log(response)
        setVisible(false);
    };

    return (
        <div>
            <NewTaskForm
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
                <img src={newTaskImage} width={200} alt="" />
            </div>
        </div>
    );
}