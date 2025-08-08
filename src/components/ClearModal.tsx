import {Form, Input, Modal} from "antd";
import type {ModalRefType} from "./ImportModal.tsx";
import {useImperativeHandle, useState} from "react";
import type {RefObject} from "react";

interface ClearModalProps {
    open: boolean;
    onClose: () => void;
    onOk: (password: string) => void;
    loading: boolean;
    ref: RefObject<ModalRefType | null>;
    title?: string;
}

export const ClearModal = (props: ClearModalProps) => {
    const {open, onClose, onOk, loading, ref, ...res} = props;
    const [password, setPassword] = useState('');

    //@ts-ignore
    useImperativeHandle(ref, () => {
        return {
            handleClose: () => {
                setPassword('');
            }
        }
    })

    return (
        <>
            <Modal open={open} centered onCancel={onClose} okText="确认" cancelText="取消" okButtonProps={{
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