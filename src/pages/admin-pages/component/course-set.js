import axios from "axios";
import { useEffect, useState } from "react";
import { apiurl } from "../../../config";
import openInputAlert from "./SwalInputeditname";

export default function Course_set() {
    const [data, setData] = useState([{}]);
    const [Errormsg, setErrormsg] = useState([{}]);
    useEffect(() => {
        const getapi = async () => {
            try {
                const dataresponse = await axios.get(apiurl + "/api/setting/subject_category");
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
            <p className=" text-red-600 font-semibold">*คำเตือนอัปโหลดไฟล์หลักสูตรจะเกี่ยวข้องตรงนี้ด้วย</p>
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
                                <td className=" text-center p-2 " onClick={() => openInputAlert("แก้ชื่อหมวดวิชา", "กรอกชื่อใหม่ที่จะแก้ไข", v.name)}>แก้</td>
                                <td className=" text-center p-2 ">ลบ</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <div> <button className="p-2 text-white rounded-lg min-w-36 w-full lg:w-fit bg-midgreen">เพิ่ม</button></div>
        </div>
    );
}