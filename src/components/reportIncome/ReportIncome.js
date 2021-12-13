import React from 'react'
import { Card, Row, Col, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import './ReportIncome.css';
import Income from './IncomeHalf.svg'
import { BsArrowRight } from 'react-icons/bs';

export default function ReportIncome (props) {

    return (
        <div>
            <Card
                style={{
                    width: "295px",
                    height: "100%",
                    borderRadius: "18px",
                    display: "flex",
                    justifyContent: "left"
                }}
                bodyStyle={{
                    padding: "0"
                }}
            >
                <div className="card-main-division">
                    <img 
                        style={{ borderRadius: "15px" }}
                        className="imagez" src={Income} height={150} alt=""
                    />
                    <div className="value-and-button">
                        <div className="income-value">
                            {new Intl.NumberFormat('ID').format(props.income)}
                        </div>
                        <div className="view-data-button">
                            <div className="view-data-text">
                                View Data
                            </div>
                            <div className="view-data-arrow">
                                <BsArrowRight/>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
