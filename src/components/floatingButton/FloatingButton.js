import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState } from 'react';

import "./FloatingButton.css";

import { FloatingBoard } from "../floatingBoard/FloatingBoard";
import { FloatingWorkspace } from "../floatingWorkspace/FloatingWorkspace";
import { FloatingMoneyReport } from "../floatingMoneyReport/FloatingMoneyReport";
import { FloatingTask } from "../floatingTask/FloatingTask";
import { JoinWorkspace } from "../joinWorkspace/JoinWorkspace";
import { ClickedTask } from "../clickedTask/ClickedTask";

export const FloatingButton = () => {

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
        <div>
            <Tooltip title="">
                <Button onClick={showModal} shape="circle" icon={<PlusOutlined style={{ color: "#FFFFFF" }} />} size="large" style={{ background: '#4ABDAC' }} />
            </Tooltip>
            <Modal title="Menu" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className="floating-form">
                    <div className="floating-form-box"><FloatingBoard /></div>
                    <div className="floating-form-box"><FloatingWorkspace /></div>
                    <div className="floating-form-box"><FloatingTask /></div>
                    <div className="floating-form-box"><JoinWorkspace /></div>
                    
                </div>
            </Modal>
        </div>
    )
}
