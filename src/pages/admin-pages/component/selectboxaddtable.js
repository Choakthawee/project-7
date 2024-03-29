import axios from "axios";
import DeleteMode2 from "./deletemode2";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { apiurl } from "../../../config";

export default function Selectboxtable({ geturl, table,remainder, title, col, geturlInsert, inserturl = "/api/setting/insertid" }) {
    const [data, setData] = useState([{}]);
    const [Errormsg, setErrormsg] = useState();
    const [data2, setData2] = useState([]);
    const [Errormsg2, setErrormsg2] = useState();
    const [reload, setReload] = useState(false)
    const [reload2, setReload2] = useState(false)
    const [openinsert, setOpenInsert] = useState(false);
    useEffect(() => {
        const getapi = async () => {
            try {
                const dataresponse = await axios.get(apiurl + geturl);
                const data = dataresponse.data;
                setData(data);
            } catch (err) {
                console.log(err);
                setErrormsg(err.response.data?.msg);
            }
        }
        getapi();
        const getapi2 = async () => {
            try {
                const dataresponse = await axios.get(apiurl + geturlInsert);
                const data = dataresponse.data;
                setData2(data);
                setErrormsg2(undefined)
            } catch (err) {
                console.log(err);
                setErrormsg2(err.response.data.msg);
            }
        }
        getapi2();
    }, [reload, reload2,geturl,geturlInsert])
    const insertapi = async (id) => {
        try {
            const dataresponse = await axios.post(apiurl + inserturl, { col: col, table: table, id: id })
            const data = dataresponse.data;
            Swal.fire({ icon: "success", text: data.msg, preConfirm: () => { setReload(!reload) } })
        } catch (err) {
            Swal.fire({ icon: "error", text: err.response.data.msg, preConfirm: () => { setReload(!reload); setReload2(!reload2) } })
        }
    }
    const Tabinsert1 = () => {
        return (
            <div className={`flex h-fit transition-all shadow-2xl duration-1000 ease-in-out ${openinsert ? "w-full flex-col opacity-100 lg:w-1/2" : "opacity-0  translate-x-5"}`}>
                <table className="border-separate w-full">
                    <thead className=" bg-amber-700 text-white ">
                        <tr className="">

                            <th className="p-2 w-9/12 text-nowrap">เลือก{title}ที่จะเพิ่ม</th>
                            <th className="p-2 w-1/12">เพิ่ม</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Errormsg2?"":data2.map((v, i) => (
                            <tr key={i} className=" bg-slate-100 hover:bg-orange-200 cursor-pointer" onClick={() => {
                                Swal.fire({
                                    icon: "info",
                                    text: "ยืนยันที่เพิ่ม",
                                    confirmButtonText: "แน่ใจ",
                                    showCancelButton: true,
                                    preConfirm: () => {
                                        insertapi(v.id)
                                    }
                                })
                            }}>
                                <td className=" text-center p-2 ">{v.name}</td>
                                <td className=" text-center p-2 ">เพิ่ม</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {Errormsg2}
            </div>
        )
    }
    const freload = async()=>{
        await setReload(!reload);
        await setReload2(!reload2);
    }
    return (
        <div className=" flex gap-2 flex-col p-2">
            <p className=" text-red-600 font-bold"> {remainder}</p>
            {Errormsg ? Errormsg :
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col lg:flex-row w-full gap-2">
                        <div className={`overflow-x-auto flex h-fit shadow-xl transition-all duration-700 ${openinsert ? "w-full lg:w-1/2" : "w-full"}`}>
                            <table className=" border-separate w-full">
                                <thead className="column-color1 text-white ">
                                    <tr>
                                        <th className="p-2 w-1/12">index</th>
                                        <th className="p-2 w-9/12">ชื่อ{title}</th>
                                        <th className="p-2 w-1/12">ลบ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((v, i) => (
                                        <tr key={i} className=" hover:bg-slate-200 bg-slate-100">
                                            <td className=" text-center p-2 ">{i + 1}</td>
                                            <td className=" text-center p-2 ">{v.name}</td>
                                            <td className=" hover:bg-slate-400 cursor-pointer text-center p-2 " onClick={() => {
                                                Swal.fire({
                                                    icon: "info",
                                                    text: "ยืนยันที่จะลบ",
                                                    confirmButtonText: "แน่ใจ",
                                                    showCancelButton: true,
                                                    preConfirm: () => {
                                                        DeleteMode2(v.id, table,freload);

                                                    }
                                                })

                                            }}>ลบ</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {Errormsg}
                        </div>

                        {openinsert === true && <div className=" bg-slate-900 w-1 rounded-xl "></div>}


                        {openinsert === true &&

                            Tabinsert1()
                        }
                    </div>
                    <div>
                        <button className="p-2 text-white rounded-lg min-w-36 w-full lg:w-fit bg-midgreen" onClick={() => { setOpenInsert(!openinsert) }}>{openinsert === true ? "ปิด" : "เพิ่ม"}</button>
                    </div>
                </div>
            }

        </div>
    )
}