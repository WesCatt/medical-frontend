import {Modal, Form, Input} from "antd";
import {useImperativeHandle, useState} from "react";
import type {Ref} from "react";
import type {ModalRefType} from "./ImportModal.tsx";

interface ConfirmPasswordModalProps {
    onOk: (password: string) => void;
    onClose: () => void;
    open: boolean;
    loading: boolean;
    ref: Ref<ModalRefType | null>;
}

export const ConfirmPasswordModal = (props: ConfirmPasswordModalProps) => {
    const {onOk, onClose, open, loading, ref} = props;
    const [password, setPassword] = useState('');

    const handleClose = () => {
        setPassword('');
        onClose();
    }


    useImperativeHandle(ref, () => {
        return {
            handleClose
        }
    })

    return (
        <Modal cancelButtonProps={{
            loading,
        }} centered open={open} okButtonProps={{
            loading,
        }} onCancel={handleClose} cancelText={"取消"}
               okText={"确认"}
               onOk={() => onOk(password)}
               title={"验证步骤"}>
            <Form.Item label="密码" className='my-5' layout={"vertical"} required>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder=""/>
            </Form.Item>
        </Modal>
    )
}