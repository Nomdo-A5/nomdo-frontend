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
                okText="OK" width={400}
                footer={[]}
                >

                <div>
                    <Row style={{ display:"flex", justifyContent: "center", marginBottom: "20px"}}>
                        <div className="task-name-top">
                            {props.task.task_name}
                        </div>
                    </Row>
                    <Row style={{ marginBottom: "20px"}}>
                        <Col span={24}>
                            <Row style={{ display: "flex", justifyContent: "center", fontStyle: "italic", color: "#8F959D"}}>
                                <div className="description-title">
                                    Task Description
                                </div>
                            </Row>
                            <Row style={{ display: "flex", justifyContent: "center", fontSize: "large"}}>
                                <div className="description-text">
                                    {props.task.task_description}
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "20px"}}>
                        <Col span={24}>
                            <Row style={{ display: "flex", justifyContent: "center", fontStyle: "italic", color: "#8F959D"}}>
                                <div className="due-date-and-input">
                                    <div className="due-date">
                                        Due Date
                                    </div>
                                </div>
                            </Row>
                            <Row style={{ display: "flex", justifyContent: "center", fontSize: "large"}}>
                                <div className="due-date-and-input">
                                    <div className="due-date">
                                        {props.task.due_date}
                                    </div>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "center", fontStyle: "italic", color: "#8F959D"}}>
                        <div className="due-date">
                            Members
                        </div>
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "center"}}>
                        {members.map((member) => (
                            <div style={{ display: "flex", flexDirection: "row"}}>
                                <Popover content={member.name} placement="bottom" >
                                    <Avatar style={{
                                        color: '#F9F9F9',
                                        backgroundColor: '#4ABDAC',
                                    }}>
                                        {member.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                </Popover>
                                {/*<div style={{margin: "auto", marginLeft: "10px", fontSize: "large"}}>
                                    {member.name}
                                </div>*/}
                            </div>

                        ))}
                    </Row>
                </div>
            </Modal>
        </>
    );
}