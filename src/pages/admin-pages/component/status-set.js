import { useEffect, useState } from "react";
import { apiurl } from "../../../config";
import axios from "axios";
import openInputAlert from "./SwalInputeditname";

export default function Status_set(){
    const [data, setData] = useState([{}]);
    const [Errormsg, setErrormsg] = useState([{}]);
    useEffect(() => {
        const getapi = async () => {
            try {
                const dataresponse = await axios.get(apiurl + "/api/setting/status");
                const data = dataresponse.data;
                setData(data);
            } catch (err) {
                console.log(err);
                setErrormsg(err);
            }
        }
        getapi();
    }, [])
    return (
        <div className=" flex gap-2 flex-col p-2">
            <div className=" overflow-x-auto shadow-xl">
                <table className="border-separate w-full">
                    <thead className="column-color1 text-white ">
                        <tr>
                            <th className="p-2 w-1/12">id</th>
                            <th className="p-2 w-10/12">หมวด</th>
                            <th className="p-2 w-1/12">แก้ไข</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((v, i) => (
                            <tr className=" bg-slate-100">
                                <td className=" text-center p-2 ">{v.id}</td>
                                <td className=" text-center p-2 ">{v.name}</td>
                                <td className=" text-center p-2 " onClick={() => openInputAlert("แก้ชื่อหมวดวิชา", "กรอกชื่อใหม่ที่จะแก้ไข", v.name)}>แก้</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}