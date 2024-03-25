import { useEffect, useState } from "react";
import { apiurl, headersforngrok } from "../../../config";
import axios from "axios";
import openInputAlert from "./SwalInputeditname";

export default function Onlyrename({ geturl, table, title, renameurl = "/api/setting/rename" }) {
    const [data, setData] = useState([{}]);
    const [reload, setReload] = useState(false);
    const [Errormsg, setErrormsg] = useState();
    useEffect(() => {
        const getapi = async () => {
            try {
                const dataresponse = await axios.get(apiurl + geturl,headersforngrok);
                const data = dataresponse.data;
                setData(data);
            } catch (err) {
                console.log(err);
                setErrormsg(err.response.data.msg);
            }
        }
        getapi();
    }, [geturl,reload])
    return (
        <div className=" flex gap-2 flex-col p-2">
            {Errormsg ? Errormsg :
                <div className=" overflow-x-auto shadow-xl">
                    <table className="border-separate w-full">
                        <thead className="column-color1 text-white ">
                            <tr>
                                <th className="p-2 w-1/12">id</th>
                                <th className="p-2 w-10/12">ชื่อ{title}</th>
                                <th className="p-2 w-1/12">แก้ไข</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((v, i) => (
                                <tr  key={i} className=" hover:bg-slate-200 bg-slate-100">
                                    <td className=" text-center p-2 ">{v.id}</td>
                                    <td className=" text-center p-2 ">{v.name}</td>
                                    <td className=" text-center p-2 " onClick={() => openInputAlert("แก้ชื่อ"+title, "กรอกชื่อใหม่ที่จะแก้ไข", v.name, v.id, table, renameurl,setReload)}>เปลี่ยนชื่อ</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }


        </div>
    );
}