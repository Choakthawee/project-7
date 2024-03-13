import { useRef, useState } from "react";
import { SlArrowDown } from "react-icons/sl";

export default function MySelect({ data, value, onChange }) {
    const [value1, setValue] = useState(value)
    return (
        <button  className=" bg-slate-100 flex flex-col  w-full group/a hover:bg-slate-200">
            <div className=" flex justify-between w-full p-2 px-4">
                <div>
                    {value1 > -1 ? data[value1].icon : ""}
                </div>
                <div>
                    <SlArrowDown />
                </div>
            </div>
            <div className={`group-focus/a:flex group-focus/a:flex-col peer hidden absolute min-w-40 mt-8 bg-white shadow-[5px_10px_25px_-10px]`}>
                {data.map((v, i) => (
                    <label key={i} className=" flex gap-2 hover:bg-slate-100 p-3 " onClick={() => {setValue(i);onChange(i)}}>
                        <input className="w-0" name="myselect" id="myselect"></input>
                        <div className="w-full">
                            {v.icon}
                        </div>
                    </label>

                ))}
            </div>

        </button>
    );
}