import { Settings } from "lucide-react";
import { FaBars, FaUser, FaClock, FaInfo, FaBook, FaChalkboard, FaList, FaUnlockAlt, FaUsers, FaClipboard, } from "react-icons/fa";
import MySelect from "./myselect";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiurl } from "../../../config";
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
    }, [])
    return (
        <div className=" overflow-x-auto shadow-2xl">
            <table className="border-separate w-full">
                <thead className="column-color1 text-white ">
                    <tr>
                        <th className="p-2 w-3/12">url</th>
                        <th className="p-2 w-3/12">name</th>
                        <th className="p-2 w-6/12">icon</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 && data.filter(v =>v.icon !== null).map((v, i) => (
                        v.icon !== undefined && (
                            <tr key={i}>
                                <td>
                                    {v.linkpath}
                                </td>
                                <td>
                                    {v.pathname}
                                </td>
                                <td>
                                    <MySelect data={listicon} value={parseInt(v.icon)} onChange={(v) => {
                                        // ทำสิ่งที่ต้องการเมื่อมีการเปลี่ยนแปลงค่า
                                    }} />
                                </td>
                            </tr>
                        )

                    ))}

                </tbody>
            </table>
        </div>
    )
}