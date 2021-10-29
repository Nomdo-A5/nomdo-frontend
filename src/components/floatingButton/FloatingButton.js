import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState } from 'react';
import Task from '../../components/task/Task';
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
            <Tooltip title="new">
                <Button onClick={showModal} shape="circle" icon={<PlusOutlined style={{ color: "#FFFFFF" }} />} size="large" style={{ background: '#4ABDAC' }} />
            </Tooltip>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            </Modal>
        </div>
    )
}
