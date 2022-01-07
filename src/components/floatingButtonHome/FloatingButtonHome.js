import React, {useContext} from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState } from 'react';

import "./FloatingButtonHome.css";

import { FloatingBoard } from "../floatingBoard/FloatingBoard";
import { FloatingWorkspace } from "../floatingWorkspace/FloatingWorkspace";
import { FloatingMoneyReport } from "../floatingMoneyReport/FloatingMoneyReport";
import { FloatingTask } from "../floatingTask/FloatingTask";
import { JoinWorkspace } from "../joinWorkspace/JoinWorkspace";
import { ClickedTask } from "../clickedTask/ClickedTask";
import { WorkspaceContext } from '../../context/WorkspaceContext';

export const FloatingButtonHome = () => {

    const [isModalVisible, setIsModalVisible, setVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        context.workspace.map(w => 
                console.log(w.workspace_name)
            )
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const context = useContext(WorkspaceContext)

    return (
            <div>
            <Tooltip title="">
                <Button variant="primary" onClick={showModal} shape="box" size="large" style={{ backgroundColor: "#FFFFFF", width: "180px", borderRadius: "20px 20px 20px 20px" }}>
                    Create
                </Button>
            </Tooltip>
            <Modal 
                centered width={690} title="" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={[]}
            >
                <div className="floating-form-1">
                    <div className="floating-form-box"><FloatingWorkspace /></div>
                    <div className="floating-form-box"><FloatingBoard /></div>
                    <div className="floating-form-box"><FloatingTask /></div>
                </div>
                <div className="floating-form-2">
                    <div className="floating-form-box"><JoinWorkspace /></div>
                    <div className="floating-form-box"><FloatingMoneyReport /></div>
                </div>
            </Modal>
        </div>
        
    )
}
