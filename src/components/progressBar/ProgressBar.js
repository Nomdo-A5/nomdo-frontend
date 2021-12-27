import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Progress } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import './ProgressBar.css';
import ProgressBarPercent from 'react-bootstrap/ProgressBar'
import { getToken } from '../../utils/authentication';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';


export default function ProgressBar(props) {

    const [info, setInfo] = useState([]);
    const token = getToken()

    const GetBoardInformation = async ($board_id) => {

        try {
            const response = await axios.get(BASE_API_URL + 'boards/task-information', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    'board_id': $board_id
                }
            })
            if (response.data.task_count === 0)
                setInfo(0)
            else
                setInfo(response.data.done_task / response.data.task_count * 100)
            
        } catch (err) {
            setInfo(0)
        }


    }

    useEffect(() => {
        GetBoardInformation(props.board_id)
    }, [])

    return (
        <div className="progress-bar-form">
            <div className="progress-bar-chart">
                <Progress percent={info} />
            </div>
        </div>
    );
}
