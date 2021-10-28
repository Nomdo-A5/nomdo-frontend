import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState } from 'react';

import { Card, Row, Col, Input } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import '../floatingBoard/FloatingBoard.css';

export const FloatingBoard = () => {
    
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
            Modal Board
          </Button>
          <Modal title="New Board" visible={isModalVisible} 
            onOk={handleOk} onCancel={handleCancel}
            style={{ textAlign: "center" }}
            okText="Add" width={340}>
            
            <div>
                <Row>
                    <div className="board-name-and-logo">
                        <div className="board-logo">
                            <MailOutlined/>
                        </div>
                        <div className="board-name-and-input">
                            <div className="board-name">
                                Board Name
                            </div>
                            <div className="form-input-board-name">
                                <Input placeholder="Board Name"  style={{ borderRadius:"10px 10px 10px 10px"}}/>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row wrap={false}>                    
                    <Col flex="none">
                        <div className="task-and-logo">
                            <div className="task-logo">
                                <BsListTask/>
                            </div>
                            <div className="task-text">
                                Add Task
                            </div>
                            <div className="add-logo">
                                <GrAddCircle/>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row wrap={false}>                    
                    <Col flex="none">
                        <div className="member-and-logo">
                            <div className="member-logo">
                                <BsPeople/>
                            </div>
                            <div className="member-text">
                                Add Member
                            </div>
                            <div className="add-logo">
                                <GrAddCircle/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
          </Modal>
        </>
      );
    }