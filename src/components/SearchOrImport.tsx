import {FaSearch} from "react-icons/fa";
import {Button} from "antd";

interface SearchOrImportProps {
    onSearch: (v?: string) => void
}


export const SearchOrImport = ({onSearch}: SearchOrImportProps) => {
    const submit = (e: any) => {
        e.preventDefault();
        onSearch(e.target.number.value);
    }


    return (
        <div className="container flex items-center   gap-2  justify-between p-2 m-auto">
            <form action="" onSubmit={submit} className="flex items-center gap-2 w-full">
                <label htmlFor=""
                       className="focus-within:shadow-[0_0_4px_1px_#615FFF2D] duration-300 w-full flex gap-2 items-center border border-indigo-500/20 p-1 px-2  rounded">
                    <input type="text" placeholder="搜索问诊(问诊号)" name='number'/>
                    <Button htmlType='submit'
                            className="!bg-indigo-500   !text-white py-2 px-4 text-white rounded font-[600]">
                        <FaSearch/>
                    </Button>
                </label>
            </form>
        </div>
    )
}