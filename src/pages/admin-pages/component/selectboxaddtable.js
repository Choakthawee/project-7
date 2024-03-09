import axios from "axios";
import DeleteMode from "./deletemode";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { apiurl } from "../../../config";
import openInputAlert from "./SwalInputeditname";
import insertBox from "./insertDB";

export default function Selectboxtable({ geturl, table, title, renameurl, inserturl }) {
    const [data, setData] = useState([{}]);
    const [Errormsg, setErrormsg] = useState();
    const [reload, setReload] = useState(false)
    const [openinsert, setOpenInsert] = useState(false);
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
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col lg:flex-row w-full gap-2">
                        <div className={`overflow-x-auto flex h-fit shadow-xl transition-all duration-700 ${openinsert ? "w-full lg:w-1/2" : "w-full"}`}>
                            <table className="border-separate w-full">
                                <thead className="column-color1 text-white ">
                                    <tr>
                                        <th className="p-2 w-1/12">id</th>
                                        <th className="p-2 w-9/12">ชื่อ{title}</th>
                                        <th className="p-2 w-1/12">แก้ไข</th>
                                        <th className="p-2 w-1/12">ลบ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((v, i) => (
                                        <tr key={i} className=" bg-slate-100">
                                            <td className=" text-center p-2 ">{v.id}</td>
                                            <td className=" text-center p-2 ">{v.name}</td>
                                            <td className=" text-center p-2 " onClick={() => openInputAlert("แก้ชื่อ" + title, "กรอกชื่อใหม่ที่จะแก้ไข", v.name, v.id, table, renameurl)}>แก้</td>
                                            <td className=" text-center p-2 " onClick={() => {
                                                Swal.fire({
                                                    icon: "info",
                                                    text: "ยืนยันที่จะลบ",
                                                    confirmButtonText: "แน่ใจ",
                                                    showCancelButton: true,
                                                    preConfirm: () => {
                                                        DeleteMode(v.id)

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
                          
                            <div className={`flex transition-all shadow-2xl duration-700 ${openinsert ? "w-full flex opacity-100 lg:w-1/2" : "opacity-0 w-0"}`}>
                                <table className="border-separate w-full">
                                    <thead className=" bg-fuchsia-600 text-white ">
                                        <tr>
                                            
                                            <th className="p-2 w-9/12">เลือก{title} ที่จะเพิ่ม</th>
                                            <th className="p-2 w-1/12">เพิ่ม</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((v, i) => (
                                            <tr key={i} className=" bg-slate-100">
                                              
                                                <td className=" text-center p-2 ">{v.name}</td>
                                                <td className=" text-center p-2 " onClick={() => {
                                                    Swal.fire({
                                                        icon: "info",
                                                        text: "ยืนยันที่จะลบ",
                                                        confirmButtonText: "แน่ใจ",
                                                        showCancelButton: true,
                                                        preConfirm: () => {
                                                            DeleteMode(v.id)

                                                        }
                                                    })

                                                }}>เพิ่ม</td>
                                            </tr>
                                        ))}
                                          <tr className=" bg-slate-100">
                                              
                                              <td className=" text-center p-2 ">{"asdsad"}</td>
                                              <td className=" text-center p-2 " onClick={() => {
                                                  Swal.fire({
                                                      icon: "info",
                                                      text: "ยืนยันที่จะลบ",
                                                      confirmButtonText: "แน่ใจ",
                                                      showCancelButton: true,
                                                      preConfirm: () => {
                                                          DeleteMode("")

                                                      }
                                                  })

                                              }}>เพิ่ม</td>
                                          </tr>
                                    </tbody>
                                </table>
                                {Errormsg}
                            </div>
                        }
                    </div>
                    <div>
                        <button className="p-2 text-white rounded-lg min-w-36 w-full lg:w-fit bg-midgreen" onClick={() => { setOpenInsert(!openinsert) }}>{openinsert == true?"ปิด":"เพิ่ม"}</button>
                    </div>
                </div>
            }

        </div>
    )
}