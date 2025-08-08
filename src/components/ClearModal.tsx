// @ts-nocheck

import {Form, Input, Modal} from "antd";
import type {ModalProps} from "./ImportModal.tsx";
import {useImperativeHandle, useState} from "react";


export const ClearModal = (props: ModalProps) => {
    const {open, onClose, onOk, loading, ref, ...res} = props;
    const [password, setPassword] = useState('');

    useImperativeHandle(ref,()=>{
        return {
            handleClose:()=>{
                setPassword('');
            }
        }
    })

    return (
        <>
            <Modal ref={ref} open={open} centered onCancel={onClose} okText="确认" cancelText="取消" okButtonProps={{
                danger: true,
                loading,
            }} cancelButtonProps={{
                loading,
            }} onOk={() => onOk(password)} title='确认要清除这些记录吗？' {...res}>
                <Form.Item label="密码" className='my-5' layout={"vertical"} required>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                           placeholder=""/>
                </Form.Item>
            </Modal>
        </>
    )
}