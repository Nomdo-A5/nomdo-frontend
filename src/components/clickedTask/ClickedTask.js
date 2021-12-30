import React from 'react'
import { Button, Tooltip, Modal, Avatar, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState } from 'react';

import { Card, Row, Col, Input } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined, CopyOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople, BsClock } from 'react-icons/bs';
import { RiMickeyLine } from 'react-icons/ri';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';
import '../clickedTask/ClickedTask.css';
import { getToken } from '../../utils/authentication';

export const ClickedTask = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const token = getToken()
    const [members, setMembers] = useState([])
    const [color, setColor] = useState("")
    const showModal = () => {
        setIsModalVisible(true);
        getMember(props.task.id)
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getMember = async ($task_id) => {
        const response = await axios.get(BASE_API_URL + 'task/member', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'task_id': $task_id
            }
        })
        console.log(response)
        setMembers(response.data.member)
    }

    function generateColor() {
        return (Math.floor(Math.random() * 16777215).toString(16))
        //const color = Math.floor(Math.random() * 16777215).toString(16);
    }

    return (
        <>
            <Button type="link" onClick={showModal} style={{ fontStyle: "italic", color: "#4ABDAC" }}>
                See
            </Button>
            <Modal title=""
                visible={isModalVisible}
                onOk={handleOk} onCancel={handleCancel}
                style={{ textAlign: "center", fontWeigh: "Bold" }}
                okText="Save" width={520}>

                <div>
                    <Row>
                        <div className="task-name-top">
                            {props.task.task_name}
                        </div>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="description-name">
                                {props.task.task_description}
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="due-date-and-input">
                                <div className="due-date">
                                    Due {props.task.due_date}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="due-date">
                            Members
                        </div>
                    </Row>
                    <Row>
                        {members.map((member) => (
                            <div>
                                <Popover content={member.name} placement="bottom" >
                                    <Avatar style={{
                                        color: '#f56a00',
                                        backgroundColor: '#4abdac',
                                    }}>
                                        {member.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                </Popover>
                            </div>

                        ))}
                    </Row>
                </div>
            </Modal>
        </>
    );
}