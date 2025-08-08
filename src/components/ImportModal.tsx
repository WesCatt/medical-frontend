import {Modal} from "antd";
import type {ReactNode} from "react";
import {FiUpload} from "react-icons/fi";
import {useRef, useState} from "react";

import {FaCircleCheck} from "react-icons/fa6";
import {getApi} from "../utils/tool.ts";
import {ConfirmPasswordModal} from "./ConfirmPasswordModal.tsx";
import api from "../request";

export interface ModalRefType {
    handleClose: () => void
}

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
    onOk: (file: File) => void;
    loading?: boolean;
    ref?: ModalRefType
}

export const ImportModal = (props: ModalProps) => {
    const {open, onClose, onOk} = props;
    const [file, setFile] = useState(null);
    const [drag, setDrag] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<ModalRefType>(null);

    const handleChangeFile = (e: any) => {
        const newFile = e.target.files[0];

        setFile(null);
        if (!newFile) {
            return;
        }
        const isExcel =
            newFile.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
            newFile.type === "application/vnd.ms-excel" || // .xls
            newFile.name.endsWith(".xlsx") || // 防止某些浏览器不识别 MIME
            newFile.name.endsWith(".xls");
        if (!isExcel) {
            getApi().error("请上传.xlsx或xls格式的excel文件");
            return;
        }
        setFile(newFile);
    }

    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(false);
        const newFile = e.dataTransfer.files?.[0];
        setFile(null);
        if (!newFile) {
            return;
        }
        const isExcel =
            newFile.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
            newFile.type === "application/vnd.ms-excel" || // .xls
            newFile.name.endsWith(".xlsx") || // 防止某些浏览器不识别 MIME
            newFile.name.endsWith(".xls");
        if (!isExcel) {
            getApi().error("请上传.xlsx或xls格式的excel文件");
            return;
        }
        setFile(newFile);
    }

    //确认密码，密码正确上传文件，否则报错
    const handleOk = (password: string) => {
        if (!file) return;
        const formData = new FormData();
        setLoading(true);
        formData.append('file', file);
        formData.append('password', password);
        api.post('/data', formData).then(res => {
            getApi().success(res.data.message);
            modalRef.current?.handleClose?.();
            onOk(file);
            setFile(null);
            if (fileRef.current) {
                fileRef.current.value = '';
            }
        }).catch(res => {
            console.log(res);
            getApi().error(res.response.data.error);
        }).finally(() => {
            setLoading(false);

        });
    }
    const handleCancel = () => {
        if (fileRef.current) {
            fileRef.current.value = '';
        }
        setFile(null);
        onClose();
    }


    return (
        <>
            <Modal open={open} okButtonProps={{
                disabled: !file,
            }} onCancel={handleCancel} cancelText={"取消导入"} okText={"确认"} onOk={() => setOpenConfirm(true)}
                   title={"导入问诊记录"}>
                <div className="flex items-center justify-center">
                    <label onDragOver={(e) => {
                        e.preventDefault();
                        setDrag(true);
                    }} onDragLeave={() => setDrag(false)} onDrop={handleDrop}
                           className="my-2 relative cursor-pointer gap-2 flex-col  flex items-center justify-center border !w-[300px] rounded !h-[300px] border-indigo-500/20"
                           htmlFor="file">
                        <input ref={fileRef} id="file" onChange={handleChangeFile} className="hidden" type="file"/>
                        {
                            file ? <>
                                <div className="flex flex-col text-[25px] items-center justify-center gap-2">
                                    <span>上传成功</span>
                                    <FaCircleCheck className=" text-green-500"/>
                                </div>
                            </> : (
                                <>
                                    <span>点击选择excel文件</span>
                                    <FiUpload className="text-[30px]"/>
                                    <span>拖动文件至此区域</span>
                                </>
                            )
                        }
                        {
                            drag && (<div
                                className="w-full flex items-center justify-center pointer-events-none h-full absolute top-0 left-0 bg-white/20 backdrop-blur-[10px]">
                                <span>松手上传</span>
                            </div>)
                        }
                    </label>
                </div>
            </Modal>
            <ConfirmPasswordModal ref={modalRef} loading={loading} open={openConfirm}
                                  onClose={() => setOpenConfirm(false)}
                                  onOk={handleOk}/>
        </>

    )
}