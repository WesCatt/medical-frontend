import {useEffect, useMemo, useState} from "react";
import {RxAvatar} from "react-icons/rx";
import {FaUserDoctor} from "react-icons/fa6";
import {MdSupportAgent} from "react-icons/md";
import {Button} from "antd";
import {BsFillCaretRightFill} from "react-icons/bs";

interface ChatBoxProps {
    // 用于区分用户
    isAi: boolean;
    // 用于切换新旧版本的ai
    isAgent: boolean;
    // 消息
    user_message?: string;
    doctor_message?: string;
    agent_message?: string;
}

export const ChatBox = (props: ChatBoxProps) => {
    const {isAi, isAgent, user_message, agent_message, doctor_message} = props;
    const [showAgent, setShowAgent] = useState(isAgent);

    useEffect(() => {
        // 如果点击了统一切换，那么同步
        setShowAgent(isAgent);
    }, [isAgent]);


    const Box = useMemo(() => {
        if (isAi) {
            if (showAgent) {
                return <AgentBox onChange={() => {
                    setShowAgent(false)
                }} message={agent_message||""}/>
            }

            return <DoctorBox message={doctor_message||""} onChange={() => setShowAgent(true)}/>
        }


        return <UserBox message={user_message||""}/>
    }, [isAi, showAgent]);


    return (
        Box
    )
}


const AgentBox = ({message, onChange}:{message:string,onChange:()=>void}) => {
    return (
        <div className="flex  gap-2  justify-start w-full my-5">
            <MdSupportAgent className="text-[30px] text-teal-500"/>
            <div className='flex flex-col gap-1'>
                <span className="text-zinc-500 text-[12px]">Agent</span>
                <div className="agent-message message-container ">
                    {
                        message
                    }
                    <BsFillCaretRightFill
                        className="absolute drop-shadow-[4px_0__3px_#e4eaf4]  left-[-9px] rotate-[180deg] top-[0]  text-white"/>
                </div>
                <div className="">
                    <Button type={"text"} className="!text-zinc-400" onClick={onChange}>查看Doctor的回复</Button>
                </div>
            </div>
        </div>
    )
}

const UserBox = ({message}:{message:string}) => {


    return (
        <div className="flex gap-2  justify-end w-full my-5">
            <div className="flex flex-col gap-1">
                <div className="user-message message-container">
                    {message}
                    <BsFillCaretRightFill
                        className="absolute right-[-9px] top-[20px] translate-y-[-50%] text-indigo-500"/>
                </div>
            </div>
            <RxAvatar className="text-[30px] text-indigo-600"/>
        </div>
    )
}

const DoctorBox = ({message, onChange}:{message:string,onChange:()=>void}) => {
    return (
        <div className="flex gap-2  justify-start w-full my-5">
            <FaUserDoctor className="text-[30px] text-indigo-400"/>
            <div className="flex flex-col gap-1">
                <span className="text-zinc-500 text-[12px]">Doctor</span>
                <div className="doctor-message message-container ">
                    {message}
                    <BsFillCaretRightFill
                        className="absolute drop-shadow-[4px_0__3px_#e4eaf4] left-[-9px] rotate-[180deg] top-[0]  text-white"/>

                </div>
                <div className="">
                    <Button type={"text"} className="!text-zinc-400" onClick={onChange}>查看Agent的回复</Button>
                </div>
            </div>
        </div>
    )
}

