import {setMessageApi, setTitle} from "../utils/tool.ts"
import {SearchOrImport} from "../components/SearchOrImport.tsx";
import {Header} from "../components/Header.tsx";
import { MedicalList} from "../components/MedicalList.tsx";
import type {Data} from "../components/MedicalList.tsx"
import {useEffect, useState} from "react";
import {message} from "antd";
import api from "../request";


function App() {
    setTitle("home");
    const [data, setData] = useState<Data[]>([]);
    const [filterData, setFilterData] = useState<Data[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    setMessageApi(messageApi);

    const getData = (useCache = false) => {
        if (useCache) {
            const medical_data = JSON.parse(localStorage.getItem("medical_data") || "{}");
            //@ts-ignore
            setData(Object.entries(medical_data) || []);
            return;
        }
        api.get('/data').then((res) => {
            setData(Object.entries(res.data.data) || []);
        }).catch(() => {
            const medical_data = JSON.parse(localStorage.getItem("medical_data") || "{}");
            //@ts-ignore
            setData(Object.entries(medical_data) || []);

        });

    }
    const handleSearch = (number?: string) => {
        if (number)
            setFilterData(data.filter(([id]:Data) => id.includes(number)));
        else setFilterData(data);
    }

    const handleDelete = (id: string) => {
        const medical_data = JSON.parse(localStorage.getItem("medical_data") || "{}");
        delete medical_data[id];
        localStorage.setItem('medical_data', JSON.stringify(medical_data));
        getData();
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [data]);

    return (
        <>
            {contextHolder}
            <Header getData={getData}/>
            <SearchOrImport onSearch={handleSearch}/>
            <MedicalList data={filterData} onDelete={handleDelete}/>
        </>
    )
}

export default App
