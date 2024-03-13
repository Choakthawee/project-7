import axios from "axios";
import { useEffect, useState } from "react"
import { apiurl } from "../../../config";
import Swal from "sweetalert2";

export default function AllowlinkBox() {
    const [selected, setSelected] = useState();
    const [data, setData] = useState([]);
    const [reload, setReload] = useState();
    const [data2, setData2] = useState([]);
    const [Errormsg, setErrormsg] = useState();
    useEffect(() => {
        const getapi = async () => {
            try {
                const dataresponse = await axios.get(apiurl + "/api/setting/role");
                const data = dataresponse.data;
                setData(data);
                console.log(data);
            } catch (err) {
                console.log(err);
                setErrormsg(err.response.data.msg);
            }
        }
        getapi();
    }, [reload])
    useEffect(() => {
        const getapi = async () => {
            try {
                const dataresponse = await axios.get(apiurl + "/api/setting/allowlinkhasrole/" + selected);
                const data = dataresponse.data;
                setData2(data);
            } catch (err) {
                setErrormsg(err.response.data.msg);
            }
        }
        getapi();
    }, [reload, selected])
    const checkboxpostapi = async (do1, role, id) => {
        try {
            const dataresponse = await axios.post(apiurl + "/api/setting/allowlinkhasroleset/", { do1: do1, role_id: role, id: id });
            const data = dataresponse.data;
            Swal.fire({ "icon": "success", text: data.msg })
            setReload(!reload)
        } catch (err) {
            Swal.fire({ "icon": "error", text: err.response.data.msg })
        }
    }
    const radiopostapi = async (role, id) => {
        try {
            const dataresponse = await axios.post(apiurl + "/api/setting/allowlinkmainset/", { role_id: role, id: id });
            const data = dataresponse.data;
            Swal.fire({ "icon": "success", text: data.msg })
            setReload(!reload)
        } catch (err) {
            Swal.fire({ "icon": "error", text: err.response.data.msg })
        }
    }
    return (
        <button className=" flex">
            <div className={`transition-all ${selected ? "w-1/2" : "w-full"}`}>
                <table className={`border-separate`}>
                    <thead className="column-color1 text-white ">
                        <tr>
                            <th className="p-2 w-1/12">url</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((v, i) => (
                            <tr key={i} className={`${selected === v.id ? " bg-orange-700 text-white odd:bg-orange-700" : "odd:bg-slate-100"} hover:bg-slate-400 `} onClick={() => { setSelected(v.id) }}>
                                <td className="p-2">
                                    {v.name}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <div className={`transition-all ${selected ? "w-1/2" : " hidden "}`}>
                <table className={`border-separate w-full`}>
                    <thead className="column-color1 text-white ">
                        <tr>
                            <th className="p-2 ">url</th>
                            <th className="">เข้าถึงได้</th>
                            <th className="">main</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data2.map((v, i) => (
                            <tr key={i} className={`${selected === v.linkpath ? " bg-orange-700 text-white odd:bg-orange-700" : "odd:bg-slate-100"} hover:bg-slate-400 `}>
                                <td className="p-2">
                                    {v.linkpath}
                                </td>
                                <td>
                                    <input type="checkbox" id={"sel-link-check" + v.id} checked={v.allowlink_id !== null} onChange={(e) => { checkboxpostapi(e.target.checked, selected, v.id) }} />
                                    <label htmlFor={"sel-link-check" + v.id} >อนุญาติ</label>
                                </td>
                                <td>
                                    <input type="radio" id={"main-link-check" + v.id} checked={v.main !== null} name="main-link-check" onChange={(e) => { radiopostapi(selected, v.id) }}></input>
                                    <label htmlFor={"main-link-check" + v.id}>
                                        เลือก
                                    </label>

                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </button>
    )
}