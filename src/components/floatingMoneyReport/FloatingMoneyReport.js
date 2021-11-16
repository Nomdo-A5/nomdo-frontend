import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { BsWallet2 } from 'react-icons/bs';
import { useState, useContext } from 'react';

import { Card, Row, Col, Input, Select } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsPencilSquare } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import '../floatingMoneyReport/FloatingMoneyReport.css';
import { WorkspaceContext, WorkspaceContextProvider } from '../../context/WorkspaceContext';

export const FloatingMoneyReport = () => {
    
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
            New Balance
          </Button>
          <Modal title="New Balance" okText="Add"
            visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
            style={{ textAlign: "center" }} 
            width={340}>
            
            <div>
                <Row>
                    <div className="workspace-name-and-input">
                        <div className="workspace-name">
                            Workspace
                        </div>
                        <div className="input-area-drop-down">
                            <Select style={{ width: 270 }} placeholder="Select your workspace">
                            {context.workspace.map(w =>
                                    (<Option value={w.id}>{w.workspace_name}</Option>)
                            )}
                            </Select>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="nominal-name-and-input">
                        <div className="nominal-name">
                            Nominal
                        </div>
                        <div className="form-input-nominal-name">
                            <Input placeholder="Nominal"  style={{ borderRadius:"10px 10px 10px 10px"}}/>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="tipe-name-and-input">
                        <div className="tipe-name">
                            Tipe
                        </div>
                        <div className="input-area-drop-down">
                            <Select style={{ width: 270 }} placeholder="Select your workspace">
                            {context.workspace.map(w =>
                                    (<Option value={w.id}>{w.workspace_name}</Option>)
                            )}
                            </Select>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="description-name-and-input">
                        <div className="description-name">
                            Deskripsi
                        </div>
                        <div className="form-input-description-name">
                            <Input placeholder="Deskripsi"  style={{ borderRadius:"10px 10px 10px 10px"}}/>
                        </div>
                    </div>
                </Row>
            </div>
          </Modal>
        </>
      );
    }