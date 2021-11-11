import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState } from 'react';

import { Card, Row, Col, Input } from 'antd';
import { FormOutlined, ClockCircleOutlined, MailOutlined, UserOutlined, CopyOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import '../floatingTask/FloatingTask.css';

export const FloatingTask = () => {
    
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
          <Button type="primary" onClick={showModal}>
            New Task
          </Button>
          <Modal title="New Task" visible={isModalVisible} 
            onOk={handleOk} onCancel={handleCancel}
            style={{ textAlign: "center" }}
            okText="Add" width={340}>
            
            <div>
                <Row>
                    <div className="task-name-and-logo">
                        <div className="workspace-logo">
                            <FormOutlined />
                        </div>
                        <div className="task-name-and-input">
                            <div className="workspace-name">
                                Task Name
                            </div>
                            <div className="input-area">
                                <div className="form-input-task-name">
                                    <Input placeholder="Add Task Name"  style={{ borderRadius:"10px 10px 10px 10px"}}/>
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