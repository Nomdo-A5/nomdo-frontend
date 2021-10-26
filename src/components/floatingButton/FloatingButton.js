import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState } from 'react';

export const FloatingButton = () => {
    
    
    const initialState = {
        visible: false,
        disabled: true,
        bounds: { left: 0, top: 0, bottom: 0, right: 0 },
    };

    const [state, setState] = useState(initialState)
    const { bounds, disabled, visible } = state;

    const draggleRef = React.createRef();

    const showModal = () => {
        setState({
            visible: true,
        });
    };

    const handleOk = e => {
        console.log(e);
        setState({
            visible: false,
        });
    };

    const handleCancel = e => {
        console.log(e);
        setState({
            visible: false,
        });
    };

    const onStart = (event, uiData) => {
        const { clientWidth, clientHeight } = window?.document?.documentElement;
        const targetRect = draggleRef?.current?.getBoundingClientRect();
        setState({
            bounds: {
                left: -targetRect?.left + uiData?.x,
                right: clientWidth - (targetRect?.right - uiData?.x),
                top: -targetRect?.top + uiData?.y,
                bottom: clientHeight - (targetRect?.bottom - uiData?.y),
            },
        });
    };

   
    return (
        <div>
            <Tooltip title="new">
                <Button onClick={showModal}shape="circle" icon={<PlusOutlined style={{ color: "#FFFFFF" }} />} size="large" style={{ background: '#4ABDAC' }} />
            </Tooltip>
            <Modal
                title={
                    <div
                        style={{
                            width: '100%',
                            cursor: 'move',
                        }}
                        onMouseOver={() => {
                            if (disabled) {
                                setState({
                                    disabled: false,
                                });
                            }
                        }}
                        onMouseOut={() => {
                            setState({
                                disabled: true,
                            });
                        }}
                        onFocus={() => { }}
                        onBlur={() => { }}
                    >
                        Draggable Modal
                    </div>
                }
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                modalRender={modal => (
                    <Draggable
                        disabled={disabled}
                        bounds={bounds}
                        onStart={(event, uiData) => onStart(event, uiData)}
                    >
                        <div ref={draggleRef}>{modal}</div>
                    </Draggable>
                )}
            >
                <p>
                    Just don&apos;t learn physics at school and your life will be full of magic and
                    miracles.
                </p>
                <br />
                <p>Day before yesterday I saw a rabbit, and yesterday a deer, and today, you.</p>
            </Modal>
        </div>
    )
}
