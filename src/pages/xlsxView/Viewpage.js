import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
export default function Viewxlsx() {
  const { file } = useParams();
  console.log(file);
  const Readfile = () => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(excelData);
    };
  };

  useEffect(() => {
    Readfile();
  }, []);
  return <div></div>;
}
