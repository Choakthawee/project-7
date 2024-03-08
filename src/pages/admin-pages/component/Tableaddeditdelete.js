import axios from "axios";
import { useEffect, useState } from "react";
import { apiurl } from "../../../config";
import openInputAlert from "./SwalInputeditname";
import Swal from "sweetalert2";
import { SlReload } from "react-icons/sl";
import insertBox from "./insertDB";

export default function Tableaddeditdelete({ geturl, table, deleteurl, foredeleteurl,title,inserturl='/api/setting/insert', remainder = "", renameurl = "/api/setting/rename" 

}) {
    const [data, setData] = useState([{}]);
    const [Errormsg, setErrormsg] = useState("");
    const deleteMode = async (id) => {

        try {
            const dataResponse = await axios.delete(apiurl + deleteurl + "/" + id)
            const data = dataResponse.data;
            Swal.fire({ icon: "success", text: data.msg })
        } catch (error) {
            if (error.response.data.msgerror) {
                Swal.fire({
                    icon: "warning",
                    text: error.response.data.msgerror,
                    confirmButtonText: error.response.data.msgerrorsubmit,
                    showCancelButton: true,
                    preConfirm: async () => {
                        try {
                            const dataResponse = await axios.delete(apiurl + foredeleteurl + "/" + id)
                            const data = dataResponse.data;
                            Swal.fire({ icon: "success", text: data.msg })
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

                        }
                    }
                })
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
                setErrormsg(err);
            }
        }
        getapi();
    }, [reload])
    return (
        <div className=" flex gap-2 flex-col p-2">
            <p className=" text-red-600 font-semibold">{remainder}</p>
            <div className=" overflow-x-auto shadow-xl">
                <table className="border-separate w-full">
                    <thead className="column-color1 text-white ">
                        <tr>
                            <th className="p-2 w-1/12">id</th>
                            <th className="p-2 w-9/12">หมวด</th>
                            <th className="p-2 w-1/12">แก้ไข</th>
                            <th className="p-2 w-1/12">ลบ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((v, i) => (
                            <tr className=" bg-slate-100">
                                <td className=" text-center p-2 ">{v.id}</td>
                                <td className=" text-center p-2 ">{v.name}</td>
                                <td className=" text-center p-2 " onClick={() => openInputAlert("แก้ชื่อ"+title, "กรอกชื่อใหม่ที่จะแก้ไข", v.name, v.id, table, renameurl)}>แก้</td>
                                <td className=" text-center p-2 " onClick={() => {
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
            <div> <button className="p-2 text-white rounded-lg min-w-36 w-full lg:w-fit bg-midgreen" onClick={()=>insertBox(title,table,inserturl)}>เพิ่ม</button></div>
        </div>
    );
}