// @ts-nocheck

import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {ChatBox} from "./components/ChatBox.tsx";
import {IoMdArrowRoundBack} from "react-icons/io";
import {Button, Empty} from "antd";
import {setTitle} from "../../utils/tool.ts";
import api from "../../request";

const ChatPage = () => {
    setTitle('chat');
    const {id} = useParams();
    const [data, setData] = useState([]);
    const [isAgent, setIsAgent] = useState(true);
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const handleChangeMode = () => {
        setIsAgent(prev => !prev);
    }

    const getData = () => {
        api.get(`/data/${id}`).then(res => {
            setData(res.data.data);
        }).catch(res => {
            const medical_data = JSON.parse(localStorage.getItem("medical_data") || "{}");
            if (!medical_data?.hasOwnProperty(id)) {
                setData([]);
                return
            }
            setData(medical_data[id]);
        })
    }


    useEffect(() => {
        if (!id) {
            navigate("/404");
            return
        }

        getData();

    }, [id]);


    useEffect(() => {
        if (containerRef.current) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }
    }, [data]);

    return (
        <>
            <header
                className="!bg-white z-[2] shadow-xm border-b border-slate-200 p-4 sticky flex items-center justify-between top-0">
                <div className="flex items-center gap-2">
                    <Button type='link' className="!text-[#394e6a] hover:scale-[1.1] !text-[20px]"
                            onClick={() => navigate('/')}>
                        <IoMdArrowRoundBack/>
                    </Button>
                </div>
                <span className="text-[#394e6a] text-[12px]">问诊号：{id}</span>
                <Button type={"primary"} onClick={handleChangeMode}
                        className="">模型：{isAgent ? "Agent" : "Doctor"}</Button>
            </header>
            <div className="p-5">
                <div ref={containerRef} className="overflow-auto ">
                    {
                        data?.length ? data.map((item, i) => {
                            return (
                                <div key={i}>
                                    <ChatBox isAi={false} isAgent={isAgent} agent_message={item.agent_message}
                                             user_message={item.user_message} doctor_message={item.doctor_message}/>
                                    <ChatBox isAi={true} isAgent={isAgent} agent_message={item.agent_message}
                                             user_message={item.user_message} doctor_message={item.doctor_message}/>
                                </div>
                            )
                        }) : <Empty/>
                    }
                </div>
            </div>
        </>
    )
}

export default ChatPage;