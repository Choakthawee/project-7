//ลงทะเบียนรายวิชา (อาจารย์)
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { RiEdit2Fill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import "./reg-set.css";
import axios from "axios";
import { apiurl } from "../../config";
import { LockIcon } from "lucide-react";
import SearchingBar from "../component/searchBar";

const RegCourse = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();

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
        } else if (userRole === "3") {
          navigate("/imcourse");
        }
      }
    });
  };
  const [subjects, setSubjects] = useState([]);
  const [noneSubject, setNoneSubject] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPage = 10;
  const totalPages = subjects.results ? Math.ceil(subjects.results.length / subjectsPage) : 1;
  const startIndex = (currentPage - 1) * subjectsPage;
  const endIndex = startIndex + subjectsPage;
  const [subject_category, setSubject_category] = useState([])
  useEffect(() => {
    async function getSubject() {
      try {
        const responseData = await axios.get(apiurl + "/api/teacher/subjects")
        const data = responseData.data;
        setSubjects(data);
      } catch (err) {
        setNoneSubject(err.response.data);
      }
    }
    getSubject();
  }, [])
  const currentsubjects = subjects.msg
    ? []
    : subjects.results ? subjects.results.slice(startIndex, endIndex) : [];
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const handleSwab = (v) => {
    navigate("/regcourse_edit/" + v.id);
  };
  const [yearopen,setYearsopen] = useState([])
  useEffect(() => {
    async function getYears() {
      try {
        const dataresponse = await axios.get(apiurl + "/api/years")
        const data = dataresponse.data;
        setYearsopen(data.data)
      } catch (error) {
        console.log(error);
      }
      
    } 
    getYears()
  }, [])
  const [searchInput, setSearchInput] = useState('');
  if (userRole !== "1") {
    showAlert();
    return null;
  }
 
  return (
    <div className="flex flex-auto h-full min-h-screen  background21  w-full">
      <div className="flex flex-col p-2 md:p-10 gap-5 w-full">
        <h1 className="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow">
          ลงทะเบียนรายวิชา
        </h1>
        <div className="flex gap-2">
          <div className="flex font-family text-xl font-medium items-center gap-2">
            <p className="flex font-family text-xl font-medium ptext-shadow">
              ภาคเรียน <span style={{ color: "red" }}>*</span>
            </p>
            <div style={{ position: "relative" }}>
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 120, height: 40 }}
                defaultValue={""}
              // value={statusSem}
              // onChange={handleSemStatusChange}
              >
                <option value="" disabled hidden>
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
          </div>
          <div className="flex font-family text-xl font-medium items-center gap-2">
            <p className="flex font-family text-xl font-medium ptext-shadow">
              ปีการศึกษา <span style={{ color: "red" }}>*</span>
            </p>
            <div style={{ position: "relative" }}>
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 120, height: 40 }}
                defaultValue={""}
              // value={statusYear}
              // onChange={handleYearStatusChange}
              >
                <option value="" disabled hidden>
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
        <div className="flex gap-2 flex-col md:flex-row">
          <SearchingBar searchInput={searchInput} setSearchInput={setSearchInput} url="/api/Searchsubjectopen/"></SearchingBar>
          <div className="flex font-family font-medium flex-col gap-2">
            <div>
              <p className="text-sm font-medium ">หลักสูตร</p>
            </div>
            <div style={{ position: "relative" }}>
              <select
                className="block appearance-none w-full  md:w-36 md:h-10 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"

                // value={statusSyl}
                defaultValue={""}
              // onChange={handleSylStatusChange}
              >
                <option value="" disabled hidden>
                  ---
                </option>
                {yearopen.map((v, i) => (
                  <option value={v.years}>{v.years}</option>
                ))}
                
               
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
          <div className="flex font-family font-medium flex-col">
            <div>
              <p className="text-sm font-medium mb-2">หมวดวิชา</p>
            </div>
            <div style={{ position: "relative" }}>
              <select
                className="block appearance-none w-full  md:w-36 md:h-10 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"

                defaultValue={""}

              // value={statusCat}
              // onChange={handleCatStatusChange}
              >
                <option value="" disabled hidden>
                  ---
                </option>
                <option>แกน</option>
                <option>บังคับ</option>
                <option>เลือก</option>
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
          <div className="font-family flex  items-end ">
            <button
              type="button"
              className="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              style={{
                backgroundColor: "#134e4a",
                width: 110,
                height: 35,
              }} >
              <p className="text-lg mr-2">ค้นหา</p>
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: "18px" }} />
            </button>
          </div>
        </div>
        {noneSubject.msgerrortime ?
          <div className=" text-2xl text-red-700 text-center underline">{noneSubject.msgerrortime}</div> :
          <div className="flex flex-col gap-2">
            <h1 className=" h1text-shadow text-xl">{subjects.msgtime && `*${subjects.msgtime}`}</h1>
            <div className="flex flex-1 bg-slate-200 rounded-lg overflow-x-auto shadow-xl">
              <table className="h-full w-full">
                <thead>
                  <tr className="column-color1 text-white">
                    <th className="py-2 font-light text-xl">#</th>
                    <th className="py-2 font-light text-xl">รหัสวิชา</th>
                    <th className="py-2 font-light text-xl">ชื่อวิชา</th>
                    <th className="py-2 font-light text-xl">หลักสูตร</th>
                    <th className="py-2 font-light text-xl">หมวดวิชา</th>
                    <th className="py-2 font-light text-xl">ลงทะเบียน</th>
                  </tr>
                </thead>
                {currentsubjects.map((v, i) => (
                  <tbody key={startIndex + i}
                    className={
                      (startIndex + i) % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }
                  >
                    <tr>
                      <td className="py-2 font-light text-lg text-center">{i + 1}</td>
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
                      <td className="py-2 font-light text-lg text-center">
                        <button
                          className="text-green-950 py-1 px-2 rounded-md font-light"
                          onClick={() => {
                            subjects.msgtime ? Swal.fire({
                              icon: "warning", "text": subjects.msgtime, title: "ข้อผิดพลาด",
                              confirmButtonColor: "#3085d6",
                              confirmButtonText: "ตกลง",
                            }) : handleSwab(v)
                          }}
                        >
                          {subjects.msgtime ? <LockIcon></LockIcon> : <RiEdit2Fill size={20} />}
                        </button>
                      </td>
                    </tr>

                  </tbody>
                ))}
              </table>
            </div>
            <h1 className="text-center text-xl">{subjects.msg}{noneSubject.msgerror}</h1>
          </div>
        }
        <div className="flex h-full justify-center items-end">
          <div className="flex justify-center items-center gap-3">
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
        </div>
      </div>

    </div>
  );
};
export default RegCourse;
