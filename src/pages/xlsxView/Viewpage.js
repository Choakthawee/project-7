import { useEffect, useState } from "react";
import { RiErrorWarningFill, RiErrorWarningLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export default function Viewxlsx() {
  const file = useLocation().state.file;
  console.log(file);
  const [excelData, setExcelData] = useState([]);
  const navigate = useNavigate();
  const Readfile = () => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setExcelData(data);
    };
  };
  useEffect(() => {
    if (file) {
      Readfile();
    }
  }, [file]);
  const handleGoBack = () => {
    navigate(-1); // ใช้ navigate(-1) เพื่อย้อนกลับไปยังหน้าก่อนหน้า
  };
  const col = useLocation().state.col;
  const check = useLocation().state.check;
  const startindex = useLocation().state.start;
  return (
    <div className=" background21 flex w-full flex-col p-10 gap-2">
      <div className=" flex justify-end">
        <button className=" bg-orange-500 rounded-lg  p-3 md:w-1/6 " onClick={handleGoBack}>ย้อนกลับ</button>
      </div>
      <h1 className="text-2xl p-2  rounded-lg hover:underline shadow-xl ">View File {file.name}</h1>
      <p>*ต้องมี columns ชื่อ {col.map((v, i) => (<span key={i}><a className=" font-semibold text-red-700 underline">{v}</a> {i !== col.length - 1 && ", "}</span>))}</p>
      <table>
        <thead>
          <tr className=" ">
            {excelData[0] && excelData[0].map((columnName, columnIndex) => {
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
                }else{
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
          {excelData.slice(startindex).map((row, rowIndex) => (
            <tr key={rowIndex}  className={`${rowIndex%2==0?"bg-orange-100":" bg-orange-200"} hover:bg-white`}>
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
