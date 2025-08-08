//@ts-nocheck
import {RiDeleteBin2Line} from "react-icons/ri";
import {FaPlus} from "react-icons/fa";
import * as XLSX from "xlsx";
import {useRef, useState} from "react";
import {ImportModal} from "./ImportModal.tsx";
import {ClearModal} from "./ClearModal.tsx";
import api from "../request";
import {getApi} from "../utils/tool.ts";

export const Header = ({getData}) => {
    const [openImport, setOpenImport] = useState(false);
    const [openClear, setOpenClear] = useState(false);
    const [loading, setLoading] = useState(false);
    const modalRef = useRef();

    const handleClear = (password: string) => {
        setLoading(true);
        api.delete("/delete-data", {
            data: {
                password
            }
        }).then(res => {
            localStorage.removeItem("medical_data");
            getData();
            setOpenClear(false);
            modalRef.current?.handleClose();
            getApi().success(res.data.message);
        }).catch(res => {
            getApi().error(res.response.data.error);
        }).finally(() => {
            setLoading(false);
        });

    }

    const handleFile = (file: File) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            if (!(reader.result instanceof ArrayBuffer)) return;
            const data = new Uint8Array(reader.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const sheetName = workbook.SheetNames[0];
            const workSheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(workSheet);
            // 分组对象
            //@ts-expect-error
            const group = Object.groupBy(jsonData, ({session_order_id}: {
                session_order_id: string
            }) => session_order_id);
            // 获取旧数据
            const medical_data = JSON.parse(localStorage.getItem("medical_data") || "{}");
            // 遍历将新数据添加，将相同数据替换
            for (const [id, newGroup] of Object.entries(group)) {
                medical_data[id] = newGroup;
            }
            // 设置新数据
            localStorage.setItem("medical_data", JSON.stringify(group));
            // 本地使用缓存
            getData(true);
        }
        reader.readAsArrayBuffer(file);
        setOpenImport(false);
    }


    return (
        <header className=' border-b border-slate-200 mb-7'>
            <div className="container text-[#282c37] font-[700] flex px-4 items-center justify-between m-auto py-4 ">
                <h1>预问诊智能体</h1>
                <div className="flex items-center gap-2">
                    <button onClick={() => setOpenClear(true)}
                            className="text-[20px] hover:text-white hover:bg-rose-500 text-rose-500 p-2 rounded-full">
                        <RiDeleteBin2Line/>
                    </button>
                    <button onClick={() => setOpenImport(true)}
                            className=" text-[20px] hover:text-white hover:bg-indigo-500 rounded-full p-2 text-indigo-500">
                        <FaPlus/>
                    </button>
                </div>
            </div>
            <ImportModal onOk={handleFile} open={openImport} onClose={() => setOpenImport(false)}/>
            <ClearModal loading={loading} ref={modalRef} open={openClear} onOk={handleClear}
                        onClose={() => setOpenClear(false)}/>
        </header>
    )
}