import {Button, Card} from "antd";
import {Link} from "react-router-dom";

interface CardProps {
    id: string | number,
    onDelete: () => void;
}

export const MedicalCard = (props: CardProps) => {
    const {id,onDelete} = props;

    return (
        <Card className=" !bg-white border !border-[#e3e9f4]" title={
            <div className="flex  text-[#394e6a]  text-[12px] items-center  justifty-between">
                <h1>问诊号：{id}</h1>
            </div>
        }>
            <div className="flex gap-5 items-center justify-end">
                <Button danger onClick={onDelete}>删除</Button>
                <Link to={`/chat/${id}`}>
                    <Button
                        className='!border-none !text-white !bg-indigo-500 text-white py-2 px-3 rounded'>查看问诊</Button>
                </Link>
            </div>
        </Card>
    )
}