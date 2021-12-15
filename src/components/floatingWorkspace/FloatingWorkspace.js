import React from 'react'
import { Button, Modal } from 'antd';
import { useState, useContext } from 'react';

import { Input, Form } from 'antd';
import { MailOutlined } from '@ant-design/icons'
import '../floatingWorkspace/FloatingWorkspace.css';
import { BASE_API_URL } from "../../constants/urls";
import axios from "axios";
import { getToken } from "../../utils/authentication";
import { WorkspaceContext } from '../../context/WorkspaceContext';

import newWorkspaceImage from '../floatingWorkspace/newWorkspace.png'
import "./FloatingWorkspace.css";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            width={340}
            style={{ textAlign: "center" }}
            visible={visible}
            title="Create a new workspace"
            okText="Create"
            cancelText="Cancel"
            centered={true}
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="workspace_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the new workspace name!',
                        },
                    ]}
                >
                    <div className="workspace-name-and-logo">
                        <div className="workspace-logo">
                            <MailOutlined />
                        </div>
                        <div className="workspace-name-and-input">
                            <div className="workspace-name">
                                Workspace Name
                            </div>
                            <div className="form-input-workspace-name">
                                <Input placeholder="Workspace Name" style={{ borderRadius: "10px 10px 10px 10px" }} />
                            </div>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item
                    name="description"
                    className="collection-create-form_last-form-item" >
                    <div className="balance-name-and-logo">
                        <div className="balance-name-and-input">
                            <div className="balance-name">
                                Description
                            </div>
                            <div className="form-input-balance-name">
                                <Input.TextArea style={{ borderRadius: "10px 10px 10px 10px" }} placeholder="Description" />
                            </div>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export const FloatingWorkspace = () => {
    const [visible, setVisible] = useState(false);
    const [workspace_name, setWorkspaceName] = useState([]);
    const [workspace_description, setWorkspaceDescription] = useState([]);

    const context = useContext(WorkspaceContext)
    
    const onCreate = async(values) => {        
        const token = getToken();
        const response = await axios.post(BASE_API_URL + 'workspace', {
            workspace_name: values.workspace_name,
            workspace_description: values.workspace_description
        },
        {            
            headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        context.setWorkspace((previous) => {
            return [...previous, response.data.workspace]
        })
        console.log(response);

        setVisible(false);
    };

    return (
        <div>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
            <div 
                className="btn w-100 h-100 d-flex justify-content-center align-items-center"
                
                onClick={() => {
                    setVisible(true);
            }}>
                <img src={newWorkspaceImage} width={200} alt=""/>
            </div>
        </div>
    );
};