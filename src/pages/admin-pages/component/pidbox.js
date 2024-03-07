import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
export default function Pidbox({ title, children }) {
    const [IsMin, setIsMin] = useState(false);
    return (
        <div className=" flex flex-col bg-white rounded-lg">
            <div className="flex justify-between items-center">
                <div className="p-2">
                    {title}
                </div>
                <div className="flex justify-end p-4 rounded-lg cursor-pointer hover:bg-slate-400 active:bg-orange-200 " onClick={()=>(setIsMin(!IsMin))}>
                    <SlArrowDown />
                </div>
            </div>
            <div className={`pl-3 pr-3 pt-1 pb-3 flex flex-col transition-all duration-300  ${IsMin===true?" -translate-y-2 max-h-0 opacity-0 ":"ease-out"}`}>
                {children}
            </div>

        </div>
    )
}