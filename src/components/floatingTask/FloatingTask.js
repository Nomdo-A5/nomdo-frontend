import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState, useContext } from 'react';

import { Card, Row, Col, Input, Select, Form, DatePicker } from 'antd';
import { FormOutlined, ClockCircleOutlined, MailOutlined, UserOutlined, CopyOutlined } from '@ant-design/icons'
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

    const handleSelectedWorkspace = (value, event) => {
        console.log("value selected workspace " + value)
        getBoards(value)
    }

    const getBoards = async (workspace_id) => {
        const token = getToken()
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
                        <div className="workspace-name-and-input">

                            <div className="input-area-drop-down">
                                <Form.Item
                                    name="workspace_id"
                                    label="Workspace name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select workspace!',
                                        },
                                    ]}

                                >
                                    <Select
                                        style={{ width: 270 }}
                                        placeholder="select your workspace"
                                        onSelect={(value, event) => handleSelectedWorkspace(value, event)}>
                                        {context.workspace.map(w =>
                                            (<Option value={w.id}>{w.workspace_name}</Option>)
                                        )}
                                    </Select>

                                </Form.Item>

                            </div>
                        </div>
                        <div className="board-name-and-input">

                            <div className="input-area-drop-down">
                                <Form.Item
                                    name="board_id"
                                    label="Board name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select board!',
                                        },
                                    ]}

                                >
                                    <Select
                                        style={{ width: 270 }}
                                        placeholder="select your board">
                                        {boards.map((board) => (
                                            <Option value={board.id}>{board.board_name}</Option>
                                        ))}

                                    </Select>

                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item
                            name="task_name"
                            label="Task name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the new task name!',
                                },
                            ]}
                        >
                            <div className="task-name-and-input">

                                <div className="input-area">
                                    <div className="form-input-task-name">
                                        <Input placeholder="Add Task Name" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                    </div>
                                </div>
                            </div>
                        </Form.Item>
                        <Form.Item
                            name="task_description"
                            label="Task desciption"
                            className="new-task-form_last-form-item"
                        >
                            <div className="description-name-and-input">
                                <div className="input-area">
                                    <div className="form-input-task-name">
                                        <Input.TextArea placeholder="Add Description" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                    </div>
                                </div>
                            </div>

                        </Form.Item>
                        <Form.Item
                            name="date"
                            label="Date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the date!',
                                },
                            ]}>
                            <div className="datepicker-task">
                                <DatePicker style={{ width: "270px", borderRadius: "10px 10px 10px 10px" }}/>
                            </div>
                        </Form.Item>
                    </Row>
                </div>
            </Form>

        </Modal>
    )
}
export const FloatingTask = () => {

    const [visible, setVisible] = useState(false);

    const onCreate = async (values) => {
        const token = getToken()
        const response = await axios.post(BASE_API_URL + 'task', {
            workspace_id: values.workspace_id,
            board_id: values.board_id,
            task_name: values.task_name,
            task_description: values.task_description
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
                <img src={newTaskImage} width={200} alt=""/>
            </div>
        </div>
    );
}