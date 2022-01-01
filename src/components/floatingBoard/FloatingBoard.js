import React, { useContext, useState } from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';

import { Select, Input, Form } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import '../floatingBoard/FloatingBoard.css';
import { WorkspaceContext, WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { getToken } from '../../utils/authentication';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';

import newBoardImage from '../floatingBoard/newBoard.png'
import { BoardContext } from '../../context/BoardContext';

const NewBoardForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const context = useContext(WorkspaceContext)


    return (
        <Modal
            title="New Board"
            visible={visible}
            centered={true}
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
            onCancel={onCancel}
            style={{ textAlign: "center" }}
            okText="Add"
            width={340}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"

            >
                <Form.Item
                    name="board_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the new board name!',
                        },
                    ]}
                >
                    <div className="board-component">
                        <div className="board-name-and-logo">
                            <div className="board-logo">
                                <MailOutlined />
                            </div>
                            <div className="board-name-and-input">
                                <div className="board-name">
                                    Board Name
                                </div>
                                <div className="form-input-board-name">
                                    <Input placeholder="Board Name" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Form.Item>

                <div className="balance-name-and-logo">
                    <div className="balance-name-and-input">
                        <div className="balance-name">

                        </div>
                        <div className="dropdown-items">
                            <Form.Item
                                name="workspace_id"
                                label="Workspace Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select workspace!',
                                    },
                                ]}
                                className="new-board-form_last-form-item"
                                style={{
                                    width: "240px"
                                }}
                            >
                                <Select placeholder="Select Workspace">
                                    {context.workspace.map(w =>
                                        (<Option value={w.id}>{w.workspace_name}</Option>)
                                    )}
                                </Select>
                            </Form.Item>

                        </div>

                    </div>
                </div>



            </Form>
        </Modal>

    );

}
export const FloatingBoard = () => {

    const [visible, setVisible] = useState(false);
    const { setBoards } = useContext(BoardContext)

    const onCreate = async (values) => {
        const token = getToken()
        const response = await axios.post(BASE_API_URL + 'boards', {
            workspace_id: values.workspace_id,
            board_name: values.board_name
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
        
        console.log(response)
        setBoards((previous) => {
            return [...previous, response.data.board]
        })
        setVisible(false);
    };
    return (
        <div>
            <NewBoardForm
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
                <img src={newBoardImage} width={200} alt="" />
            </div>
        </div>
    );
}