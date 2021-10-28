import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState } from 'react';

import { Card, Row, Col, Input } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import '../floatingWorkspace/FloatingWorkspace.css';

export const FloatingWorkspace = () => {
    
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
            Modal Workspace
          </Button>
          <Modal title="New Workspace" visible={isModalVisible} 
            okText="Add" onOk={handleOk} onCancel={handleCancel}
            style={{ textAlign: "center" }} width={340}>
            
            <div>
                <Row>
                    <div className="workspace-name-and-logo">
                        <div className="workspace-logo">
                            <MailOutlined/>
                        </div>
                        <div className="workspace-name-and-input">
                            <div className="workspace-name">
                                Workspace Name
                            </div>
                            <div className="form-input-workspace-name">
                                <Input placeholder="Workspace Name"  style={{ borderRadius:"10px 10px 10px 10px"}}/>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="balance-name-and-logo">
                        <div className="balance-name-and-input">
                            <div className="balance-name">
                                Available Balance
                            </div>
                            <div className="form-input-balance-name">
                                <Input placeholder="Available Balance" style={{ borderRadius:"10px 10px 10px 10px"}}/>
                            </div>
                        </div>
                    </div>
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