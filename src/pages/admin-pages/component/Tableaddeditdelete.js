import axios from "axios";
import { useEffect, useState } from "react";
import { apiurl } from "../../../config";
import openInputAlert from "./SwalInputeditname";
import Swal from "sweetalert2";
import insertBox from "./insertDB";

export default function Tableaddeditdelete({ geturl, table, foredeleteurl, title, inserturl = '/api/setting/insert', remainder = "", renameurl = "/api/setting/rename",
    deleteurl = '/api/setting/deleteall'
}) {
    const [data, setData] = useState([{}]);
    const [Errormsg, setErrormsg] = useState();
    const deleteMode = async (id) => {
        const email = await localStorage.getItem("email");
        try {
            const dataResponse = await axios.delete(apiurl + deleteurl + "?id=" + id + "&table=" + table+"&email="+email)
            const data = dataResponse.data;
            Swal.fire({ icon: "success", text: data.msg, showCloseButton: true, confirmButtonText: "ตกลง", preConfirm: () => {  setReload(!reload); } })
        } catch (error) {
            if (error.response.data.msgerror) {
                if (foredeleteurl) {
                    Swal.fire({
                        icon: "warning",
                        text: error.response.data.msgerror,
                        confirmButtonText: error.response.data.msgerrorsubmit,
                        showCancelButton: true,
                        preConfirm: async () => {
                            try {
                                const dataResponse = await axios.delete(apiurl + foredeleteurl + "/" + id+"/"+email)
                                const data = dataResponse.data;
                                Swal.fire({ icon: "success", text: data.msg, showCloseButton: true, confirmButtonText: "ตกลง", preConfirm: () => {  setReload(!reload); } })
                            } catch (error) {
                                if (error.response.data.msgerror) {

                                    Swal.fire({
                                        icon: "error",
                                        text: error.response.data.msgerror
                                    })
                                } else {
                                    Swal.fire({
                                        icon: "error",
                                        text: error.response.data.msgerrorDB
                                    })
                                }
                                setReload(!reload);

                            }
                        }
                    })
                } else {
                    Swal.fire({
                        icon: "warning",
                        text: error.response.data.msgerror,
                        confirmButtonText: error.response.data.msgerrorsubmit,
                    })
                }

            } else {
                Swal.fire({
                    icon: "error",
                    text: error.response.data.msgerrorDB
                })
            }


        }

    }
    const [reload, setReload] = useState(false)
    useEffect(() => {
        const getapi = async () => {
            try {
                const dataresponse = await axios.get(apiurl + geturl);
                const data = dataresponse.data;
                setData(data);
            } catch (err) {
                console.log(err);
                setErrormsg(err.response.data.msg);
            }
        }
        getapi();
    }, [reload])
    return (
        <div className=" flex gap-2 flex-col p-2">
            {Errormsg ? Errormsg :
                <div className="flex gap-2 flex-col">
                    <p className=" text-red-600 font-semibold">{remainder}</p>
                    <div className=" overflow-x-auto shadow-2xl">
                        <table className="border-separate w-full">
                            <thead className="column-color1 text-white ">
                                <tr>
                                    <th className="p-2 w-1/12">id</th>
                                    <th className="p-2 w-8/12">ชื่อ{title}</th>
                                    <th className="p-2 w-2/12">เปลี่ยนชื่อ</th>
                                    <th className="p-2 w-1/12">ลบ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((v, i) => (
                                    <tr key={i} className=" bg-slate-100 hover:bg-slate-200">
                                        <td className=" text-center p-2 ">{v.id}</td>
                                        <td className=" text-center p-2 ">{v.name}</td>
                                        <td className=" text-center p-2 hover:bg-slate-400 cursor-pointer " onClick={() => openInputAlert("แก้ชื่อ" + title, "กรอกชื่อใหม่ที่จะแก้ไข", v.name, v.id, table, renameurl,setReload)}>เปลี่ยนชื่อ</td>
                                        <td className=" text-center p-2  hover:bg-slate-400 cursor-pointer" onClick={() => {
                                            Swal.fire({
                                                icon: "info",
                                                text: "ยืนยันที่จะลบ",
                                                confirmButtonText: "แน่ใจ",
                                                showCancelButton: true,
                                                preConfirm: () => {
                                                    deleteMode(v.id)
                                                }
                                            })

                                        }}>ลบ</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {Errormsg}
                    </div>
                    <div> <button className="p-2 text-white rounded-lg min-w-36 w-full lg:w-fit bg-midgreen" onClick={() => insertBox(title, table, inserturl,setReload)}>เพิ่ม</button></div>
                </div>
            }

        </div>
    );
}