import React, { useEffect, useState } from 'react'
import { Layout, Table, Tag, Space } from 'antd';
import './Report.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Nav from "../../components/Nav";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';

import '../../components/taskOnBoard/TaskOnBoard.css';
import { Tablereport } from "../../components/tablereport/Tablereport";
import TaskOnBoard from '../../components/taskOnBoard/TaskOnBoard';
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import { getToken } from '../../utils/authentication';
import { useLocation } from 'react-router';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';

import Income from "../../components/reportIncome/ReportIncome";
import Outcome from "../../components/reportOutcome/ReportOutcome";
import Overview from "../../components/reportOverview/ReportOverview";

function refreshPage() {
    window.location.reload(true);
}
const Report = () => {

    const { Sider } = Layout
    const token = getToken()
    const [reports, setReports] = useState([]);
    const { state } = useLocation()


    const GetReport = async () => {
        const workspace_id = state.workspace
        const response = await axios.get(BASE_API_URL + 'report', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': `${workspace_id}`
            }
        })
        console.log(response.data)
        setReports(response.data.balance)
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
            dataIndex: 'balance_date',
            key: 'date',
            render: text => <a>{text}</a>,
            width: '10%',
        },
        {
            title: 'Nominal',
            dataIndex: 'nominal',
            key: 'nominal',
            width: '10%',
        },
        {
            title: 'Type',
            dataIndex: 'balance_type',
            key: 'type',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Status',
            dataIndex: 'balance_status',
            key: 'status',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Proof',
            dataIndex: 'Transaction_proof',
            key: 'Transaction_proof',
            width: '8%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        GetReport()
    }, [])
    return (
        <WorkspaceContextProvider>
            <Nav />
            <div className="spacer"/>
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
                                <Income />
                            </div>
                            <div className="report-images-component">
                                <Outcome />
                            </div>
                            <div className="report-images-component">
                                <Overview />
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