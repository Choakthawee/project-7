import { useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Viewxlsx() {
  const filename = localStorage.getItem("Viewxlsx-data-filename");
  const [excelData,setExcalData] = useState(localStorage.getItem("Viewxlsx-data")?JSON.parse(localStorage.getItem("Viewxlsx-data")):[]);
  const navigate = useNavigate();
  const config = localStorage.getItem("Viewxlsx-data-config")?JSON.parse(localStorage.getItem("Viewxlsx-data-config")):{};
  const col = config?.col;
  const check = config?.check;
  const startindex = config?.start;
  const url = config?.link;
  const getback = () => {
    navigate(url)
  }
  console.log(url);

  if (!excelData) {
    return (
      <div className=" absolute background21 flex w-full flex-col p-10 gap-2 min-h-screen">
        <div className=" flex justify-end">
          {/* <button onClick={getback}
            className=" bg-orange-500 rounded-lg  p-3 md:w-1/6 ">ย้อนกลับ</button> */}
        </div>
        <div className=" underline text-2xl text-center text-red-600 font-bold" >
          ไม่พบไฟล์ให้ทำแสดง
        </div>
      </div>
    )
  }
  return (
    <div className=" absolute background21 flex w-full flex-col p-10 gap-2 min-h-screen">
      <div className=" flex justify-end">
        {/* <button onClick={getback}
          className=" bg-orange-500 rounded-lg  p-3 md:w-1/6 ">ย้อนกลับ</button> */}
      </div>
      <h1 className="text-2xl p-2  rounded-lg hover:underline shadow-xl ">View File {filename}</h1>
      <p>*ต้องมี columns ชื่อ {col?.map((v, i) => (<span key={i}><a href="#" className=" font-semibold text-red-700 underline">{v}</a> {i !== col?.length - 1 && ", "}</span>))}</p>
      <table>
        <thead>
          <tr className=" ">
            {excelData && excelData[0]?.map((columnName, columnIndex) => {
              if (!col?.includes(columnName) && check) {
                return (
                  <th className={" bg-red-700 border flex items-center gap-2 border-black p-3 hover:shadow-xl shadow-orange-400 hover:bg-slate-50"} key={columnName}>
                    <RiErrorWarningFill size={"40"}></RiErrorWarningFill> {columnName} (Error column ไม่ได้)
                  </th>
                );
              } else {
                if (check) {
                  return (
                    <th className={(columnIndex % 2 === 0 ? "bg-orange-300" : "bg-fuchsia-200") + " border border-black p-3 hover:shadow-xl shadow-orange-400 hover:bg-slate-50"} key={columnName}>
                      {columnName}
                    </th>
                  );
                } else {
                  return (
                    <td className={(columnIndex % 2 === 0 ? "bg-orange-300" : "bg-fuchsia-200") + " border border-black p-3 hover:shadow-xl shadow-orange-400 hover:bg-slate-50"} key={columnName}>
                      {col[columnIndex]}
                    </td>
                  );
                }
              }
            })}
          </tr>
        </thead>
        <tbody>
          {excelData?.slice(startindex)?.map((row, rowIndex) => (
            <tr key={rowIndex} className={` odd:bg-orange-100 even:bg-orange-200 hover:bg-white`}>
              {row.map((cell, cellIndex) => (
                <td className={" border p-2 border-red-400 "} key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
