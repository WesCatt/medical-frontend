// @ts-nocheck

import {Empty} from "antd";
import {MedicalCard} from "./MedicalCard.tsx";
import {useRef, useState} from "react";
import {ClearModal} from "./ClearModal.tsx";
import api from "../request";
import {getApi} from "../utils/tool.ts";

export const MedicalList = ({data, onDelete}) => {
    const [openDelete, setOpenDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const modalRef = useRef();
    const handleDelete = (password: string) => {
        if (!openDelete) return;

        api.delete(`/delete-data/${openDelete}`, {
            data: {
                password,
            }
        }).then(res => {
            localStorage.removeItem("medical_data");
            modalRef.current?.handleClose();
            setOpenDelete(null);
            onDelete(openDelete);
            getApi().success(res.data.message);
        }).catch(res => {
            console.log(res);
            getApi().error(res.response.data.error);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <>
            {
                !data.length ?
                    <div className="w-full flex items-center justify-center my-10">
                        <Empty/>
                    </div> :
                    <div
                        className="container !my-5 py-5 px-2 gap-5 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {
                            data.map(([id]) => {
                                return <MedicalCard key={id} id={id} onDelete={() => setOpenDelete(id)}/>
                            })
                        }
                    </div>
            }
            <ClearModal loading={loading} ref={modalRef} title={"确定要删除当前问诊记录吗?"} open={openDelete}
                        onOk={handleDelete}
                        onClose={() => setOpenDelete(null)}/>
        </>
    )
}