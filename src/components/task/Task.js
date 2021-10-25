import React from 'react'
import { Card, Row, Col } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'

export default function Task(props) {

    return (
        <div>
            <Card
                style={{
                    width: "360px",
                    height: "192px",
                    borderRadius: "16px",
                    marginRight: "24px",
                    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"
                }}
                title="ini title"
            >
                <Row>
                    <Col>
                        ini description
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                </Row>
                <Row wrap={false}>                    
                    <Col flex="none">
                        <div style={{ padding: '0' }}>
                            <ClockCircleOutlined/>    ini due date
                        </div>
                        
                    </Col>
                </Row>
            </Card>
        </div>
    );
}
