import React, { useEffect, useState , useContext} from 'react'
import { Card, Empty, Space, Checkbox, Dropdown, Menu, Modal,Form,DatePicker, Select,Input, Button } from 'antd';
import { ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import './TaskOnBoard.css';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import { ClickedTask } from "../clickedTask/ClickedTask";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

// import EditTaskModals from '../editTaskModals/EditTaskModals';
// import EditTask from '../editTask/EditTask';


export default function TaskOnBoard(props) {

    const [tasks, setTasks] = useState([])
    const token = getToken()
    const [editedTask, setEditedTask] = useState([])
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const { confirm } = Modal
    const [location, setLocation] = useState("")

    const GetTask = async ($board_id) => {
        const response = await axios.get(BASE_API_URL + 'task', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'board_id': $board_id
            }
        })
        setTasks(response.data.task)
    }

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    function HeaderView() {
        setLocation((window.location.pathname).split("/")[(window.location.pathname).split("/").length - 1])
    }

    const EditTask = (props) => {
        const [isModalVisible, setIsModalVisible] = useState(false);
        const token = getToken()    
        const [date, setDate] = useState("")
    
        const handleOk = async (values) => {
    
            if (values.date === undefined) {
                setDate(props.editedTask.due_date)
            } else {
                const dateInput = new Date(values.date);
                setDate((dateInput.getYear() + 1900) + "-" + (dateInput.getMonth() + 1) + "-" + dateInput.getDate())
            }
            const response = await axios.patch(BASE_API_URL + 'task', {
                id:props.editedTask.id,
                task_name: values.task_name,
                task_description: values.task_description,
                due_date:date,
                is_done:props.editedTask.is_done
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
            console.log(response)
            setTasks(task => task.map(ts => {
                if (ts.id === props.editedTask.id) {
                    ts.task_name = values.task_name
                    ts.task_description = values.task_description
                    ts.is_done = props.editedTask.is_done
                    // modify terserah
                    return ts
                }
                else {
                    return ts
                }
            }))
            setIsModalVisible(false);
        };
    
    
        const showModal = () => {
            setIsModalVisible(true);
        };
    
        return (
            <div className="layout-title-dashboard">
                <div className="workspace-title-dashboard-1">
                    <div className="workspace-title-dashboard-1-2">
                        <Button
                            type="link"
                            onClick={showModal}
                            style={{
                                backgroundColor: "none",
                                color: "black",
                                marginTop: "auto",
                                marginBottom: "auto"
                            }}
                        >
                            Edit task
                        </Button>
                    </div>
                    <EditTaskForm
                        visible={isModalVisible}
                        task={props.editedTask}
                        onCreate={handleOk}
                        onCancel={() => { setIsModalVisible(false) }}
                    />
    
                </div>
            </div >
        );
    }
    
    const EditTaskForm = ({ visible, task, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        const { workspaceMembers } = useContext(WorkspaceContext)
        const { Option } = Select;
    
        return (
            <Modal
                width={340}
                style={{ textAFlign: "center" }}
                visible={visible}
                title="Edit Task"
                okText="Save Changes"
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
    
                >
                    <Form.Item
                        name="task_name"
                        label="Task name"
                        initialValue={task.task_name}
                        rules={[
                            {
                                required: true,
                                message: 'Please input the new task name!',
                            },
                        ]}
                    >
                        <div className="task-name-and-input">
    
                            <div className="input-area">
                                <div className="form-input-task-name">
                                    <Input placeholder={task.task_name} style={{ borderRadius: "10px 10px 10px 10px" }} />
                                </div>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="task_description"
                        label="Task Desciption"
                        initialValue={task.task_description}
                    >
                        <div className="description-name-and-input">
                            <div className="input-area">
                                <div className="form-input-task-name">
                                    <Input.TextArea placeholder={task.task_description} style={{ borderRadius: "10px 10px 10px 10px" }} />
                                </div>
                            </div>
                        </div>
    
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Date"
                    >
    
                        <DatePicker placeholder={task.due_date} style={{ width: "270px", borderRadius: "10px 10px 10px 10px" }} />
    
                    </Form.Item>
                    <Form.Item
                        name="member_id"
                        label="Assigned Member"
                        rules={[
                            {
                                required: false,
                                message: 'Please select assigned member!',
                            },
                        ]}
    
                    >
                        <Select
                            style={{ width: 280, paddingLeft: "10px" }}
                            placeholder="Select members">
                            {workspaceMembers.map((member) => (
                                <Option value={member.id}>{member.name}</Option>
                            ))}
    
                        </Select>
    
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    useEffect(() => {
        HeaderView()
        GetTask(props.board_id)
    }, [])

    const menuEdit = (task) => (
        <Menu>
            <Menu.Item key="edit" onClick={() => showEditForm(task.id)}>
                <div className='edit-board-at-board'>
                    <div className='edit-board-at-board-1'>
                        <AiOutlineEdit style={{ fontSize: "large", marginRight: "10px", margin: "auto" }} />
                    </div>
                    <div className='edit-board-at-board-1'>

                        <EditTask editedTask={task} />
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="delete" onClick={() => showDeleteConfirm(task.id)}>
                <div className='edit-board-at-board'>
                    <div className='edit-board-at-board-1'>
                        <AiOutlineDelete style={{ fontSize: "large", marginRight: "10px" }} />
                    </div>
                    <div className='edit-board-at-board-2'>
                        Delete Task
                    </div>
                </div>
            </Menu.Item>
        </Menu>
    );

    function showDeleteConfirm($id) {
        confirm({
            title: 'Are you sure want to delete this task?',
            icon: <ExclamationCircleOutlined />,

            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteTask($id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const deleteTask = async ($id) => {
        const response = await axios.delete(BASE_API_URL + 'task', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id: $id
            }
        });
        setTasks(prev => prev.filter(tsk => tsk.id !== $id))
    }

    function showEditForm(task) {
        setEditedTask(task)
        setIsEditModalVisible(true)
    }
    const GetTaskView = () => {
        return (
            <Space wrap style={{ paddingLeft: "30px", backgroundColor: "#FFFFFF" }}>
                {tasks.map((task) => (
                    <Card
                        style={{
                            width: "260px",
                            height: "auto",
                            borderRadius: "16px",
                            marginRight: "10px",
                            marginTop: "20px",
                            boxShadow: "5px 8px 5px rgba(208, 216, 243, 0.6)",
                            backgroundColor: "#F6F6F6"
                        }}
                        bodyStyle={{
                            padding: "10px"
                        }}

                    >
                        <div className="checkbox-name-title">
                            <div className="checkbox-and-name">
                                <div className="checkbox-logo">
                                    {location === "tasks" ?
                                        <Checkbox defaultChecked={task.is_done === 0 ? false : true} onChange={onChange} /> :
                                        <span></span>
                                    }
                                </div>
                                <div className="task-title">
                                    {task.task_name}
                                </div>
                                <div>
                                    {location === "tasks" ?
                                        <Dropdown overlay={menuEdit(task)} trigger={['click']}>
                                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                <BiDotsVerticalRounded style={{ color: "#969CA3", fontSize: "large" }} />
                                            </a>
                                        </Dropdown> :
                                        <span></span>
                                    }
                                </div>
                            </div>
                            <div className="on-where-information">
                                on {props.board_name}, {props.workspace_name}
                            </div>
                            <div className="task-date-and-clock">
                                <div className="clock-logo">
                                    <ClockCircleOutlined />
                                </div>
                                <div className="task-date">
                                    Due {task.due_date}
                                </div>
                            </div>
                            <div className="see-more-button">
                                <div className="see-more">
                                    <ClickedTask task={task} />
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </Space>
        )

    }

    const GetErrorView = () => {
        return (
            <Space wrap style={{ paddingLeft: "30px", backgroundColor: "#FFFFFF" }}>
                <Empty
                    description={
                        <span>
                            You don't have any Task
                        </span>
                    } />

            </Space>

        )
    }

    return (
        <div>
            {tasks.length == 0 ? GetErrorView() : GetTaskView()}
        </div>
    );
}
