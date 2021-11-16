import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState, useContext } from 'react';

import { Card, Row, Col, Input, Select } from 'antd';
import { FormOutlined, ClockCircleOutlined, MailOutlined, UserOutlined, CopyOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import '../floatingTask/FloatingTask.css';
import { WorkspaceContext, WorkspaceContextProvider } from '../../context/WorkspaceContext';

export const FloatingTask = () => {
    
    const { Option } = Select;
    const context = useContext(WorkspaceContext)
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
                    <div className="workspace-name-and-input">
                        <div className="workspace-name">
                            Workspace Name
                        </div>
                        <div className="input-area-drop-down">
                            <Select style={{ width: 270 }} placeholder="select your workspace">
                            {context.workspace.map(w =>
                                    (<Option value={w.id}>{w.workspace_name}</Option>)
                            )}
                            </Select>
                        </div>
                    </div>
                    <div className="board-name-and-input">
                        <div className="workspace-name">
                            Board Name
                        </div>
                        <div className="input-area-drop-down">
                            <Select style={{ width: 270 }} placeholder="select your workspace">
                            {context.workspace.map(w =>
                                    (<Option value={w.id}>{w.workspace_name}</Option>)
                            )}
                            </Select>
                        </div>
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
                    <div className="description-name-and-input">
                        <div className="workspace-name">
                            Description
                        </div>
                        <div className="input-area">
                            <div className="form-input-task-name">
                                <Input placeholder="Add Description"  style={{ borderRadius:"10px 10px 10px 10px"}}/>
                            </div>
                        </div>
                    </div>
                </Row>
            </div>
          </Modal>
        </>
      );
    }