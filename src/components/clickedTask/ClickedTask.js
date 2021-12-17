import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState } from 'react';

import { Card, Row, Col, Input } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined, CopyOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople, BsClock } from 'react-icons/bs';
import { RiMickeyLine } from 'react-icons/ri';

import '../clickedTask/ClickedTask.css';

export const ClickedTask = () => {
    
    const [isModalVisible, setIsModalVisible] = useState(false);

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
        <>
          <Button type="link" onClick={showModal} style={{ fontStyle: "italic", color: "#4ABDAC"}}>
            See
          </Button>
          <Modal title="" visible={isModalVisible} 
            onOk={handleOk} onCancel={handleCancel}
            style={{ textAlign: "center" }}
            okText="Save" width={520}>
            
            <div>
                <Row>
                    <div>
                        <div className="task-name-top">
                                Task Name
                        </div>
                        <div className="clock-and-input">
                            <div className="clock-logo">
                                <BsClock/>
                            </div>
                            <div className="due-date-and-input">
                                <div className="due-date">
                                    Due 24, Aug 2021
                                </div>
                                <div className="due-date">
                                    Members
                                </div>
                                <div className="description-name">
                                    Description
                                </div>
                                <div className="due-date">
                                    <RiMickeyLine/> Rahmafatin
                                </div>
                                <div className="input-area">
                                    <div className="form-input-join-name">
                                        <Input.TextArea style={{ borderRadius: "10px 10px 10px 10px" }} placeholder="Add a Description" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            </div>
          </Modal>
        </>
      );
    }