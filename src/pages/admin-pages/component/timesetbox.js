import axios from "axios"
import { useEffect, useState } from "react"
import { apiurl, headers, headersforngrok } from "../../../config";
import Swal from "sweetalert2";

export default function Timesetbox() {
    const [data, setData] = useState("06:00:00");
    useEffect(() => {
        const getapi = async () => {
            try {
                const dataresponse = await axios.get(apiurl + "/api/setting/timeauto",headersforngrok);
                const data = dataresponse.data;
                setData(data.Timer);
            } catch (errror) {
                console.log(errror);
            }
        }
        getapi();
    }, [setData])
    const handleOnChange = async (e) => {
        setData(e.target.value);
    }
    const updateInsert =async () =>{
        try {
            
            const dataresponse = await axios.post(apiurl + "/api/setting/timeautoChange",{timer:data,headers});
            const data1 = dataresponse.data;
            Swal.fire({
                icon:"success",
                text:data1.msg
            })
        }catch  (error){
            Swal.fire({
                icon:"error",
                text:error.response.data.msg
            })
        }
    }
    return (
        <div className="flex gap-2 items-center flex-col lg:flex-row">
            <input className=" p-3 rounded-lg w-full lg:w-fit shadow-2xl" value={data} type="time" onChange={handleOnChange} />
            <button className=" p-2 bg-green-600 rounded-lg w-full lg:w-32 hover:bg-green-500 active:bg-green-700" onClick={()=>{updateInsert()}}>บันทึก</button>
        </div> 
    )
}