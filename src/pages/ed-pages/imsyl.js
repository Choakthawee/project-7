import "./imsyl_set.css";
import { faArrowRight, faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { apiurl } from "../../config";
const ImportSyl = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();
  const selection_year = useRef(null);
  const [file, setFile] = useState(null);
  const [errors, setErr] = useState([]);
  const [warn, setWarn] = useState([]);
  const [progress, setProgress] = useState(0);
  const [files, setFileUnload] = useState([])
  const [errorFiles, setErrorFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getDownloadfile = async () => {
      try {
        const responseData = await axios.get(apiurl + "/api/education/downloadlist");
        const data = responseData.data;
        setFileUnload(data);
      } catch (error) {
        setErrorFiles(error.response.data.msgerror)
      }
    }
    getDownloadfile();
  }, [loading])
  const uploadFiles = async () => {

    if (selection_year.current.value === '---' || selection_year.current.value === null) {
      Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาด",
        text: "เลือกปีการศึกษาก่อนครับ",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ตกลง",
      })
    } else {
      const formData = new FormData();
      formData.append('file', file);  // ชื่อต้องตรงกับที่ระบุใน upload.single('file') // ตรงกับ req.body.name ใน Express
      formData.append('year', selection_year.current.value);
      try {
        const response = await axios.post('http://localhost:4133/api/education/Course/uploadfile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            setProgress(percent);
          }
        });
        if (response.data.warning.warnmsg !== null) {
          alert(response.data.msg);
          alert(response.data.warning.warnmsg)
          setWarn(response.data.warning.data);

        } else {
          alert(response.data.msg);
        }
        setLoading(!loading);

      } catch (error) {
        console.log(error)
        alert(error.response.data.msgerror);
        setErr(error.response.data.error)
        if (error.response.data.warning !== null) {
          alert(error.response.data.warning.warnmsg)
          setWarn(error.response.data.warning.data);
        }
        setLoading(!loading);
      }
    }
  }
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const showAlert = () => {
    Swal.fire({
      icon: "error",
      title: "ข้อผิดพลาด",
      text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
    }).then((result) => {
      if (result.isConfirmed) {
        if (userRole === "2") {
          navigate("/userinfo");
        } else if (userRole === "1") {
          navigate("/schedule");
        }
      }
    });
  };

  if (userRole !== "3") {
    showAlert();
    return null;
  }

  return (
    <div className="block min-h-screen background21 w-full overflow-y-auto">
      <div className=" flex h-full w-full p-10 flex-col gap-10">
        <p className="flex font-family font-bold text-4xl text-midgreen h1text-shadow">
          นำเข้าหลักสูตร
        </p>
        <div className="flex flex-row gap-3 items-center">
          <p className="textinsert font-bold ">หลักสูตร ปีการศึกษา</p>
          <div className="flex relative">
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              style={{ width: 90, height: 35 }}
              ref={selection_year}
            >
              <option value={null} disabled selected hidden>
                ---
              </option>

              {[...Array(10 + 1).keys()].map((index) => {
                const year = new Date().getFullYear() + 544 - index;
                return <option key={year}>{year}</option>;
              })}
              
            </select>
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              style={{
                position: "absolute",
                top:"50%",
                right: "12px",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div
            className=" flex items-center justify-center bg-gray-200 border-dashed border-gray-400 border-4 p-4 w-full md:w-1/2"
          >
            <FontAwesomeIcon
              icon={faFileImport}
            />
            <input type="file" onChange={handleFileChange} class="file:bg-transparent file:border-0 file:text-sm file:font-medium file:p-2 file:w-full file:outline-none file:cursor-pointer" />
          </div>

          <div className="flex flex-row gap-10 justify-center">
            <FontAwesomeIcon
              icon={faArrowRight}
            />
            {file ? file.name + "  <----- ทำ view file on web เลย" : ""}
          </div>

        </div>
        {progress !== 0 && <div className=" flex flex-row w-full items-center md:w-1/2">
          <span className=" absolute">{progress}%</span>
          <progress className="w-full" value={progress} max="100" />
        </div>}


        <div className="flex ">
          <button
            type="button"
            class="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
            style={{
              backgroundColor: "#134e4a",
              width: 77,
              height: 25,
            }}
          >
            <button className="text-mb" onClick={uploadFiles}>บันทึก</button>

          </button>

        </div>


        <div className="boxtable2 flex-col max-h-72">
          <div className="flex  bg-slate-200 rounded-lg overflow-x-auto shadow-xl overflow-y-auto ">
            <table className="w-full">
              <thead>
                <tr className="column-color1 text-white">
                  <th className="py-2 font-light text-l ">หลักสูตร</th>
                  <th className="py-2 font-light text-l">ไฟล์</th>
                </tr>
              </thead>
              {!errorFiles ? files.msg ?

                <tbody>
                  <td className="py-2 font-light text-base text-center">
                  </td>
                  <td className="py-2 font-light text-base text-center">
                    {files.msg}
                  </td>
                </tbody>
                : files.map((v, i) => (
                  <tbody>
                    <td className="p-3 font-light text-base text-center">
                      <a href={apiurl + v.link}>{v.years}</a>
                    </td>
                    <td className="py-2 font-light text-base text-center">
                      <a href={apiurl + v.link}>{v.filename}</a>
                    </td>
                  </tbody>
                ))
                : <tbody>
                  <td className="py-2 font-light text-base text-center">
                    {errorFiles}
                  </td>
                </tbody>
              }
            </table>
          </div>

          <p className="ml-5 text-sm mt-2">
            {" "}
            *คำแนะนำ : คลิกที่ไฟล์เพื่อดาวน์โหลด{" "}
            <FontAwesomeIcon icon={faFileImport} />
          </p>
        </div>
        <div className=" overflow-y-auto">
          {errors.length > 0 &&
            <div className="">
              <p>Error</p>
              <div className=" bg-red-600 p-3 rounded-lg ">
                {errors.map((v, i) => (
                  <div >{v.value.idsubject} {v.value.name} {v.errorMessage}</div>
                ))}
              </div>
            </div>
          }

          {warn.length > 0 &&
            <div className="">
              <p>Warning</p>
              <div className=" bg-yellow-400 p-3 rounded-lg ">
                {
                  warn.map((v, i) => (
                    <div>{`${v.Message}${v.value.name} ${v.value.years}`}</div>
                  ))
                }
              </div>
            </div>
          }

        </div>
      </div>

    </div>


  );
};
export default ImportSyl;
