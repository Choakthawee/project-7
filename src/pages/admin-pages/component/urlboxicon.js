import { Settings } from "lucide-react";
import { FaBars, FaUser, FaClock, FaInfo, FaBook, FaChalkboard, FaList, FaUnlockAlt, FaUsers, FaClipboard, } from "react-icons/fa";
import MySelect from "./myselect";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiurl } from "../../../config";
import Swal from "sweetalert2";
import openInputAlert from "./SwalInputeditname";
export default function UrlboxIcon() {
    const [data, setData] = useState([])
    const listicon = [
        { icon: <FaInfo size={20} /> },
        { icon: <FaClock size={20} /> },
        { icon: <Settings size={20} /> },
        { icon: <FaChalkboard size={20} /> },
        { icon: <FaBook size={20} /> },
        { icon: <FaUnlockAlt size={20} /> },
        { icon: <FaUsers size={20} /> },
        { icon: <FaClipboard size={20} /> },
        { icon: <FaList size={20} /> }
    ]
    const [reload, setReload] = useState(false)
    const [Errormsg, setErrormsg] = useState();
    const savechange = async(id,v)=>{
        const email = localStorage.getItem("email");
        try {
            const dataresponse = await axios.post(apiurl + "/api/setting/iconchange",{email:email,id:id,value:v});
            const data = dataresponse.data;
            Swal.fire({
                icon:"success",
                text:data.msg
            })
            setReload(!reload)
        } catch (err) {
            Swal.fire({
                icon:"success",
                text:err.response.data.msg
            })
         
        }
    }
    useEffect(() => {
        const getapi = async () => {
            try {
                const dataresponse = await axios.get(apiurl + "/api/setting/allowlink");
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
        <div className=" overflow-x-auto shadow-2xl">
            <table className="border-separate w-full">
                <thead className="column-color1 text-white ">
                    <tr>
                        <th className="p-2 w-3/12">url</th>
                        <th className="p-2 w-3/12">name</th>
                        <th className="p-2 w-1/12">เปลี่ยนชื่อ</th>
                        <th className="p-2 w-5/12">icon</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 && data.filter(v =>v.icon !== null).map((v, i) => (
                        
                            <tr key={i}>
                                <td>
                                    {v.linkpath}
                                </td>
                                <td>
                                    {v.pathname}
                                </td>
                                <td className=" hover:bg-slate-400 p-1 cursor-pointer" onClick={()=>{
                                    openInputAlert("เปลี่ยนชื่อ","กรอกชื่อใหม่ที่จะแก้ไข",v.pathname,v.id,"","/api/setting/allowlinkrename",setReload)
                                }}>
                                
                                        เปลี่ยนชื่อ
                                   
                                </td>
                                <td>
                                    <MySelect data={listicon} value={parseInt(v.icon)} onChange={(val) => {
                                        savechange(v.id,val);
                                    }} />
                                </td>
                            </tr>
                        

                    ))}

                </tbody>
            </table>
        </div>
    )
}