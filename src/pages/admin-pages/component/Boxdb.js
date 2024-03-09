import { KeySquareIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
export default function BoxSetDB({keys, title, children }) {
    const [IsMin, setIsMin] = useState(keys?localStorage.getItem(keys)?localStorage.getItem(keys)==="true"?true:false:true:true);
    useEffect(()=>{
        localStorage.setItem(keys,IsMin)
    },[IsMin])
    return (
        <div className=" flex flex-col shadow-xl bg-white rounded-lg overflow-hidden box-border">
            <div className="flex justify-between items-center rounded-lg hover:bg-slate-200" onClick={() => {setIsMin(!IsMin)}}>
                <div className=" text-lg p-3">
                    {title}
                </div>
                <div className="flex justify-end p-4 rounded-lg cursor-pointer hover:bg-slate-300 active:bg-slate-400 " >
                    {IsMin === true ?  <SlArrowDown />:<SlArrowUp />}
                </div>
            </div>
            <div className={`pl-4 pr-4 pt-1 pb-4 flex flex-col gap-2 transition-all duration-300  ${IsMin === true ? " -translate-y-2 opacity-0 max-h-0" : "ease-out"}`}>
                {children}
            </div>

        </div>
    )
}