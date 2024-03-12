import axios from "axios";
import { useEffect, useState } from "react";
import { apiurl } from "../../../config";

export default function ViewTablelogbox({ table,geturl="/api/setting/tablesettingdb" }) {
    const [data, setData] = useState([]);
    const [dataError, setDataerror] = useState();
    const [click, setClick] = useState(false);
    const date = new Date().toLocaleString("en-en", { year: "numeric", "day": "2-digit", month: "2-digit" }).split("/")
    const [firstdate, setFirstdate] = useState(date[2] + "-" + date[0] + "-" + date[1])
    const [enddate, setEnddate] = useState(date[2] + "-" + date[0] + "-" + date[1])
    useEffect(() => {
        const getapi = async () => {
            try {
                const dataresponse = await axios.get(apiurl + geturl+"?sd="+firstdate+"&ed="+enddate+"&table="+table);
                const data = dataresponse.data;
                setData(data)
                setDataerror();
                console.log(data);
                setClick(false)
            } catch (error) {
                setData([])
                setDataerror(error.response.data.msg);
                setClick(false)
            }
        }
        getapi();
    }, [firstdate,enddate])
    const handleSort = () => {
        setData([...data].reverse());
      };
    return (
        <div className="flex flex-col">
            <div className="flex">
                <div className=" flex gap-3  bg-slate-200 p-2 rounded-lg">
                    <input type="date" value={firstdate} onChange={(e) => { setFirstdate(e.target.value) }}></input>
                    to
                    <input type="date" value={enddate} onChange={(e) => { setEnddate(e.target.value) }} />
                </div>


            </div>
            <div className="flex items-center w-full rounded-xl bg-gradient-to-r   from-emerald-300  to-emerald-900 ">
                <table className=" group/a w-full border-collapse">
                    <thead>
                        <tr className="p-2 text-center text-black">
                            <th className=" border rounded-[10px_0_0_0]  p-3">
                                <div className="">
                                    วันที่
                                    <div className=" flex h-10 items-center justify-center group/item ">
                                        <button onClick={() => {setClick(!click);handleSort()}} className={` ${click ? "opacity-0 scale-x-0  " : "opacity-100"} transition-all absolute ease-linear bg-gradient-to-tr  from-green-300 to-green-600 rounded-xl p-2 group-hover/item:ring-2 ring-zinc-950`}>
                                            มากไปน้อย
                                        </button>
                                        <button onClick={() => {setClick(!click);handleSort()}} className={` ${click === false ? "opacity-0 scale-x-0" : "opacity-100"} transition-all absolute ease-linear bg-gradient-to-tr  from-green-600 to-green-300 rounded-xl p-2 group-hover/item:ring-2 ring-zinc-950`}>
                                            น้อยไปมาก
                                        </button>
                                    </div>

                                </div>

                            </th>
                            <th className=" border rounded-[0_10px_0_0] p-3">
                                ข้อความ
                            </th>

                        </tr>

                    </thead>
                    <tbody className=" bg-gradient-to-tr from-emerald-100 to-emerald-400 border-[0]">
                        {data.length>0 && data.map((v, i) => (
                            <tr key={i} className="">
                                <td className=" text-center">
                                    { new Date(v.datetime).toLocaleString("th-th")}
                                </td>
                                <td className="">
                                    {v.msg}
                                </td>
                            </tr>
                        ))}

                       
                    </tbody>
                </table>
                
            </div>
            {dataError}
        </div>
    );
}