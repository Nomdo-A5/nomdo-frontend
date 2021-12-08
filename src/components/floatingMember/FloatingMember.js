import React, {useContext} from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState } from 'react';
import Pic from './Picture.svg'

import "./FloatingMember.css";

import { FloatingWorkspace } from "../floatingWorkspace/FloatingWorkspace";
import { WorkspaceContext } from '../../context/WorkspaceContext';

export const FloatingMember = () => {

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
                <Button variant="success" onClick={showModal} size="large" type="link" style={{ fontSize: "small"}}>
                    View Details
                </Button>
            </Tooltip>
            <Modal centered width={300} title="" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
            footer={[
                
            ]}>
                <div className="floating-member-form">
                    <div className="floating-member-form-box">
                        <img 
                            style={{ borderRadius: "15px" }}
                            className="imagez" src={Pic} width={150} alt=""
                        />
                    </div>
                    <div className="floating-member-form-name">
                        Alan Novianto
                    </div>
                    <div className="floating-member-form-email">
                        alannovianto@gmail.com
                    </div>
                </div>
            </Modal>
        </div>
        
    )
}
