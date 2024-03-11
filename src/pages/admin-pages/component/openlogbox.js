import { useEffect, useState } from "react";
import CheckboxTailwind from "./checkboxtailwind";
import axios from "axios";
import { apiurl } from "../../../config";
import Swal from "sweetalert2";

export default function Openlogbox() {
    const[data1,setData1] = useState(false);
    useEffect(()=>{
        const getapi=async(setdata,url)=>{
            try{
                const dataresponse = await axios.get(apiurl+url);
                const data = dataresponse.data;
                console.log(data);
                setdata(data.statuslog);
            }catch (err){
                console.log(err);
            }
        }
        getapi(setData1,"/api/setting/logopen/1")
    },[setData1])

    const onChangehandle=async(id,value,url="/api/setting/setlogopen")=>{
        setData1(value);
        try{
            const dataresponse = await axios.post(apiurl+url,{id:id,value:value});
            const data = dataresponse.data;
            Swal.fire({
                icon:"success",
                text:data.msg
            })
        }catch (err){
            Swal.fire({
                icon:"error",
                text:err.response.data.msg
            })
        }
    }
    return (
        <div className="flex flex-col">
            <div className="flex items-center">
               <CheckboxTailwind checked={data1} onChange={(e)=>{onChangehandle(1,!data1)}}>
                เปิดบันทึกระบบlogตรวจสอบออโต้
               </CheckboxTailwind>
            </div>

        </div>
    );
}