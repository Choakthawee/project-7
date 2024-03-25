import { useEffect, useState } from "react";
import CheckboxTailwind from "./checkboxtailwind";
import axios from "axios";
import { apiurl, headers, headersforngrok } from "../../../config";
import Swal from "sweetalert2";

export default function Openlogbox() {
    const[data1,setData1] = useState(false);
    const[data2,setData2] = useState(false);
    useEffect(()=>{
        const getapi=async(setdata,url)=>{
            try{
                const dataresponse = await axios.get(apiurl+url,headersforngrok);
                const data = dataresponse.data;
                console.log(data);
                setdata(data.statuslog);
            }catch (err){
                console.log(err);
            }
        }
        const email = localStorage.getItem("email")
        getapi(setData1,"/api/setting/logopen/1")
        getapi(setData2,"/api/setting/logopen/2")
    },[setData1])

    const onChangehandle=async(id,value, setdata,url="/api/setting/setlogopen")=>{
        setdata(value);
        try{
            const email = await localStorage.getItem("email")
            
            const dataresponse = await axios.post(apiurl+url,{id:id,value:value,email:email,headers});
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
          
               <CheckboxTailwind checked={data1} ids={1} onChange={(e)=>{onChangehandle(1,!data1,setData1)}}>
                เปิดบันทึกระบบlogตรวจสอบออโต้ (id=1)
               </CheckboxTailwind>
               <CheckboxTailwind checked={data2} ids={2} onChange={(e)=>{onChangehandle(2,!data2,setData2)}}>
                เปิดบันทึกระบบlogตั้งค่า database (id=2)
               </CheckboxTailwind>
          

        </div>
    );
}