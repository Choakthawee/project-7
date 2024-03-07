import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
export default function BoxSetDB({ title, children }) {
    const [IsMin, setIsMin] = useState(false);
    return (
        <div className=" flex flex-col bg-white rounded-lg">
            <div className="flex justify-between items-center rounded-lg hover:bg-slate-100" onClick={() => (setIsMin(!IsMin))}>
                <div className="p-3">
                    {title}
                </div>
                <div className="flex justify-end p-4 rounded-lg cursor-pointer hover:bg-slate-200 active:bg-slate-300 " >
                    {IsMin === true ?  <SlArrowDown />:<SlArrowUp />}
                </div>
            </div>
            <div className={`pl-4 pr-4 pt-1 pb-4 flex flex-col transition-all duration-300  ${IsMin === true ? " -translate-y-2  opacity-0 max-h-0" : "ease-out"}`}>
                {children}
            </div>

        </div>
    )
}