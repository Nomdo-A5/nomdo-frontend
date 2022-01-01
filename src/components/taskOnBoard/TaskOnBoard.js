import React, { useEffect, useState } from 'react'
import { Card, Empty, Space, Checkbox,  Dropdown, Menu, Modal } from 'antd';
import { ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import './TaskOnBoard.css';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import { ClickedTask } from "../clickedTask/ClickedTask";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

export default function TaskOnBoard(props) {

    const [tasks, setTasks] = useState([])
    const token = getToken()
    const [editedTask, setEditedTask] = useState([])
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const { confirm } = Modal
    const GetTask = async ($board_id) => {
        const response = await axios.get(BASE_API_URL + 'task', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'board_id': $board_id
            }
        })
        setTasks(response.data.task)
    }

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    useEffect(() => {
        GetTask(props.board_id)
    }, [])
    
    const menuEdit = (task) => (
      
        <Menu>
            <Menu.Item key="edit" onClick={() => showEditForm(task.id)}>
                <div className='edit-board-at-board'>
                    <div className='edit-board-at-board-1'>
                        <AiOutlineEdit style={{ fontSize: "large", marginRight: "10px", margin: "auto" }} />
                    </div>
                    <div className='edit-board-at-board-1'>
                        Edit Board
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="delete" onClick={() => showDeleteConfirm(task.id)}>
                <div className='edit-board-at-board'>
                    <div className='edit-board-at-board-1'>
                        <AiOutlineDelete style={{ fontSize: "large", marginRight: "10px" }} />
                    </div>
                    <div className='edit-board-at-board-2'>
                        Delete Task
                    </div>
                </div>
            </Menu.Item>
        </Menu>
    );

    function showDeleteConfirm($id) {
        confirm({
            title: 'Are you sure want to delete this task?',
            icon: <ExclamationCircleOutlined />,

            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteTask($id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const deleteTask = async ($id) => {
        const response = await axios.delete(BASE_API_URL + 'task', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id: $id
            }
        });

        console.log(response)
    }

    function showEditForm(task){
        setEditedTask(task)
        setIsEditModalVisible(true)
    }
    const GetTaskView = () => {
        return (
            <Space wrap style={{ paddingLeft: "30px", backgroundColor: "#FFFFFF" }}>
                {tasks.map((task) => (
                    <Card
                        style={{
                            width: "260px",
                            height: "auto",
                            borderRadius: "16px",
                            marginRight: "10px",
                            marginTop: "20px",
                            boxShadow: "5px 8px 5px rgba(208, 216, 243, 0.6)",
                            backgroundColor: "#F6F6F6"
                        }}
                        bodyStyle={{
                            padding: "10px"
                        }}

                    >
                        <div className="checkbox-name-title">
                            <div className="checkbox-and-name">
                                <div className="checkbox-logo">
                                    <Checkbox defaultChecked={task.is_done === 0 ? false : true} onChange={onChange} />

                                </div>
                                <div className="task-title">
                                    {task.task_name}
                                </div>
                                <div>
                                    <Dropdown overlay={menuEdit(task)} trigger={['click']}>
                                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                            <BiDotsVerticalRounded style={{ color: "#969CA3", fontSize: "large" }} />
                                        </a>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="on-where-information">
                                on {props.board_name}, {props.workspace_name}
                            </div>
                            <div className="task-date-and-clock">
                                <div className="clock-logo">
                                    <ClockCircleOutlined />
                                </div>
                                <div className="task-date">
                                    Due {task.due_date}
                                </div>
                            </div>
                            <div className="see-more-button">
                                <div className="see-more">
                                    <ClickedTask task={task} />
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </Space>
        )

    }

    const GetErrorView = () => {
        return (
            <Space wrap style={{ paddingLeft: "30px", backgroundColor: "#FFFFFF" }}>
                <Empty
                    description={
                        <span>
                            You don't have any Task
                        </span>
                    } />

            </Space>

        )
    }

    return (
        <div>
            {tasks.length == 0 ? GetErrorView() : GetTaskView()}
        </div>
    );
}
