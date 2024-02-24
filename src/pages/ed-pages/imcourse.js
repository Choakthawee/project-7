import { Link, useNavigate } from "react-router-dom";
import "./course-set.css";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { AwardIcon } from "lucide-react";
import axios from "axios";
import { apiurl } from "../../config";
const ImportCourse = () => {
  const [isSemOpen, setIsSemOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const toggleSemDropdown = () => {
    setIsSemOpen(!isSemOpen);
  };

  const toggleYearDropdown = () => {
    setIsYearOpen(!isYearOpen);
  };

  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [noneSubject, setNoneSubject] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPage = 30;
  const totalPages = Math.ceil(subjects.length / subjectsPage);
  const startIndex = (currentPage - 1) * subjectsPage;
  const endIndex = startIndex + subjectsPage;
  const currentsubjects = subjects.msg ? [] : subjects.slice(startIndex, endIndex);
  useEffect(() => {
    const getdataSubject = async () => {
      try {
        const responsedata = await axios.get(apiurl + "/api/education/getallsubjects");
        const data = responsedata.data;
        setSubjects(data);

      } catch (err) {
        setNoneSubject(err.response.data.msgerror);
      }
    }
    getdataSubject();
  }, [])
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const [sendApi,setSendApi] = useState([]) 
  const InlineCheckbox = ({ id, isOpen }) => {
    const firststate = isOpen;
    const [checkbox1, setCheck] = useState(isOpen);
    useEffect(() => {
      if (checkbox1 != isOpen) {
        setSendApi(...sendApi, { id: id, IsOpen: checkbox1 })
        console.log(sendApi)
      } else {
        
      }
    },[checkbox1])
    return (
      <div className="flex items-center me-4 justify-center">
        <input
          id="inline-checkbox"
          type="checkbox"
          
          checked={isOpen}
          value=""
          onChange={(e)=>{setCheck(e.target.checked)}}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-3"
        />
      </div>
    );
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
    <div className="background21 block min-h-screen w-full p-10">
      <div className="flex flex-col gap-3">
        <div className="flex gap-5 flex-col">
          <h1 className="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow ">
          เลือกรายวิชาที่เปิดสอน
        </h1>
        <div className="flex flex-1 relative">
          <div className="flex flex-1 flex-row items-center gap-5">
            <p className="textinsert font-bold">ภาคเรียน</p>
            <div className="flex relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 150 }}
              >
                <option value="" disabled selected hidden>
                  ---
                </option>
                <option>ต้น</option>
                <option>ปลาย</option>
              </select>
              <FontAwesomeIcon
                icon={faArrowAltCircleDown}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "12px",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />
            </div>
            <p className="textinsert font-bold ">ปีการศึกษา</p>
            <div className="flex relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 150 }}
              >
                <option value="" disabled selected hidden>
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
                  top: "50%",
                  right: "12px",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 gap-3">
          <div
            style={{
              flex: 3,
            }}
          >
          <div className="flex gap-2 flex-col">
                <label for="first_name" class="block text-sm font-medium text-gray-900 dark:text-black">
                  วิชา/รหัสวิชา
                </label>
                <input
                  type="text" id="course_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="โปรดระบุวิชาหรือรหัสวิชา" required
                />
          </div>
          </div>
          <div className="flex-1 flex font-family font-medium flex-col gap-2">
            <div>
              <p className="text-sm font-medium ">หมวดวิชา</p>
            </div>
            <div className="flex items-center box-border min-w-40">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{height: 40 }}
              // value={statusCat}
              // onChange={handleCatStatusChange}
              >
                <option value="" disabled selected hidden>
                  ---
                </option>
                <option>แกน</option>
                <option>บังคับ</option>
                <option>เลือก</option>
              </select>
              <FontAwesomeIcon
                icon={faArrowAltCircleDown}
                  className="static -ml-7"
                  
              />
            </div>
          </div>
          <div
            style={{
              flex: 5,
            }}
            className="font-family  items-end flex"
          >
            <button
              type="button"
              class="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              style={{
                backgroundColor: "#134e4a",
                width: 110,
                height: 35,
              }}
            >
              <p className="text-lg mr-2">ค้นหา</p>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="mr-2"
                style={{ fontSize: "18px" }}
              />
            </button>
          </div>
        </div>
        </div>
        
        <div className="flex flex-7 flex-col gap-3">
          <div className="flex flex-4">
            <div className="flex flex-1 bg-slate-200 rounded-lg overflow-x-auto shadow-xl h-full overflow-y-auto">
              <table className=" w-full">
                <thead>
                  <tr className="column-color1 text-white">
                    <th className="py-2 font-light text-xl">#</th>
                    <th className="py-2 font-light text-xl">รหัสวิชา</th>
                    <th className="py-2 font-light text-xl">ชื่อวิชา</th>
                    <th className="py-2 font-light text-xl">หลักสูตร</th>
                    <th className="py-2 font-light text-xl">หมวดวิชา</th>
                    <th className="py-2 font-light text-xl">หน่วยกิต</th>
                  </tr>
                </thead>
                {currentsubjects.map((v, i) => (
                  <tbody>
                    <td className="py-2 font-light text-lg text-center">
                      <InlineCheckbox id={v.id} isOpen={v.IsOpen}/>
                    </td>
                    <td className="py-2 font-light text-lg text-center">
                      {v.idsubject}
                    </td>
                    <td className="py-2 font-light text-lg text-center">
                      {v.name}
                    </td>
                    <td className="py-2 font-light text-lg text-center">
                      {v.years}
                    </td>
                    <td className="py-2 font-light text-lg text-center">
                      {v.subject_category}
                    </td>
                    <td className="py-2 font-light text-lg text-center">{v.credit}</td>
                  </tbody>

                ))}

              </table>
            </div>
          </div>
          {subjects.msg && <div className=" p-5 text-center w-full text-2xl text-red-500 underline">{subjects.msg}</div>}
          <div className="flex flex-1 justify-center items-center gap-3">
            <button onClick={handlePrevPage}>
              <FaCircleLeft size={21} color="#0a6765" className="" />
            </button>
            <p className="text-lg font-semibold text-midgreen">
              หน้า {currentPage} จาก {totalPages}
            </p>
            <button onClick={handleNextPage}> 
              <FaCircleRight size={21} color="#0a6765" className="" />
            </button>
          </div>

          <div className="flex flex-1 justify-end">
            <div className="flex relative ml-5 mt-5 mr-10">
              <button
                type="button"
                class="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                style={{
                  backgroundColor: "#134e4a",
                  width: 110,
                  height: 45,
                }}
              >
                <p className="text-lg mr-2">ยืนยัน</p>
                <FontAwesomeIcon
                  icon={faFileDownload}
                  className=" ml-2"
                  style={{ fontSize: "20px" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportCourse;
