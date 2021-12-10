import React, { useEffect, useState } from 'react'
import { Layout, Table, Tag, Space, Modal } from 'antd';
import './Report.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Nav from "../../components/Nav";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';

import '../../components/taskOnBoard/TaskOnBoard.css';
import { Tablereport } from "../../components/tablereport/Tablereport";
import TaskOnBoard from '../../components/taskOnBoard/TaskOnBoard';
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import { getToken } from '../../utils/authentication';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';

import Income from "../../components/reportIncome/ReportIncome";
import Outcome from "../../components/reportOutcome/ReportOutcome";
import Overview from "../../components/reportOverview/ReportOverview";
import { EditOutlined, DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';

function refreshPage() {
    window.location.reload(true);
}
const Report = () => {
    const { confirm } = Modal;
    const { Sider } = Layout
    const token = getToken()
    const [reports, setReports] = useState([]);
    const { state } = useLocation()
    const { workspace_id } = useParams()
    const [overview, setOverview] = useState([]);


    const GetReport = async () => {
        const response = await axios.get(BASE_API_URL + 'report', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': `${workspace_id}`
            }
        })
        setReports(response.data.balance)
    }

    const GetReportOverview = async () => {
        const response = await axios.get(BASE_API_URL + 'report/overview', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': `${workspace_id}`
            }
        })
        console.log(response)
        setOverview(response.data)
    }

    const onDeleteBalance = (record) => {

        Modal.confirm({
            title: 'Are you sure,want to delete this balance',
            onOk: () => {
                deleteBalance(record.id)
            }
        })
    }

    const deleteBalance = async ($id) => {
        console.log("TOKENN " + token)
        const response = await axios.delete(BASE_API_URL + 'balance', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id: $id
            }
        });

        console.log(response)
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'balance_id',
            key: 'id',
            innerHeight: '10px',
            outerHeight: '10px',
            backgroundColor: 'red',
            render: text => <a>{text}</a>,
            width: '5%',
        },
        {
            title: 'Description',
            dataIndex: 'balance_description',
            key: 'description',
            render: text => <a>{text}</a>,
            width: '25%',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: text => <a>{text}</a>,
            width: '10%',
        },
        {
            title: 'Nominal',
            dataIndex: 'nominal',
            key: 'nominal',
            align: 'right',
            width: '10%',
            render: text => <a>{new Intl.NumberFormat('ID').format(text)}</a>
        },
        {
            title: 'Type',
            dataIndex: 'is_income',
            key: 'type',
            render: text => <a>{text === 0 ? 'outcome' : 'income'}</a>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Proof',
            dataIndex: 'Transaction_proof',
            key: 'Transaction_proof',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {
                return (
                    <>
                        <EditOutlined />
                        <DeleteOutlined onClick={() => {
                            showDeleteConfirm(record.id)
                        }} style={{ color: "red", marginLeft: 12 }} />
                    </>
                )
            }
        },
    ];

    function showDeleteConfirm($id) {
        confirm({
            title: 'Are you sure delete this balance?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteBalance($id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    useEffect(() => {
        GetReport()
        GetReportOverview()
    }, [])
    return (
        <WorkspaceContextProvider>
            <Nav />
            <div className="spacer" />
            <div>
                <Layout >
                    <Sider>
                        <Sidebar />
                        <div className="floating-button-component">
                            <FloatingButton />
                        </div>
                    </Sider>
                    <Layout style={{ backgroundColor: "white" }}>
                        <div className="report-title">
                            Workspace Name
                        </div>
                        <div className="report-images">
                            <div className="report-images-component">
                                <Income income={overview.income_balance} />
                            </div>
                            <div className="report-images-component">
                                <Outcome outcome={overview.outcome_balance} />
                            </div>
                            <div className="report-images-component">
                                <Overview total={overview.total_balance} />
                            </div>
                        </div>
                        <div className="report-table">

                            <Table
                                columns={columns}
                                dataSource={reports}
                                size="small"
                            />
                        </div>
                    </Layout>
                </Layout>
            </div>
        </WorkspaceContextProvider>
    );
}

export default Report;