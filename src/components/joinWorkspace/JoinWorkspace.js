import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState } from 'react';

import { Card, Row, Col, Input } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined, CopyOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import '../joinWorkspace/JoinWorkspace.css';

export const JoinWorkspace = () => {
    
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
            Modal Join Workspace
          </Button>
          <Modal title="Join Workspace" visible={isModalVisible} 
            onOk={handleOk} onCancel={handleCancel}
            style={{ textAlign: "center" }}
            okText="Add" width={340}>
            
            <div>
                <Row>
                    <div className="join-name-and-logo">
                        <div className="workspace-logo">
                            <MailOutlined/>
                        </div>
                        <div className="join-name-and-input">
                            <div className="workspace-name">
                                Get Link
                            </div>
                            <div className="input-area">
                                <div className="form-input-join-name">
                                    <Input placeholder="Workspace Link"  style={{ borderRadius:"10px 10px 10px 10px"}}/>
                                </div>
                                <div className="workspace-logo-copy">
                                    <CopyOutlined />
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