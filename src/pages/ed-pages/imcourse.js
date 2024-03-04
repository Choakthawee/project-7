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
import { IoMdUndo } from "react-icons/io";
import axios from "axios";
import { apiurl } from "../../config";
import InlineCheckbox from "./imcoursetab";
import SearchingBar from "../component/searchBar";
import HeaderSort_pre from "../component/headSort_pre";
import Category_sub from "../component/category_sub";
import CourseYears from "../component/courseyear";
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
  const [noneSubject, setNoneSubject] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPage = 7;
  const totalPages = subjects.length > 0 ? Math.ceil(subjects.length / subjectsPage) : 1;
  const startIndex = (currentPage - 1) * subjectsPage;
  const endIndex = startIndex + subjectsPage;
  const [searchInput, setSearchInput] = useState('');
  const currentsubjects = subjects.msg
    ? []
    : subjects.slice(startIndex, endIndex);
  const [sendApi, setSendApi] = useState([]);
  useEffect(() => {
    const getdataSubject = async () => {
      try {
        const responsedata = await axios.get(
          apiurl + "/api/education/getallsubjects"
        );
        const data = responsedata.data;
        setSubjects(data);

      } catch (err) {
        setNoneSubject(err.response.data);
      }
    };
    getdataSubject();
  }, [setSendApi]);
  const clearLocalStorageByPrefix = (prefix) => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    });
  };
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
  useEffect(() => {
    console.log(sendApi)
  }, [sendApi]);
  useEffect(() => {
    if (subjects.length > 0) {
      subjects.forEach((v) => {
        const datalocal = localStorage.getItem("ch-" + v.id);
        if (datalocal !== null && !sendApi.some(item => item.id === v.id)) {
          setSendApi((prevSendApi) => [...prevSendApi, { id: v.id, IsOpen: datalocal }]);
        }
      });
    }

  }, [subjects]);
  const addSubjects = async (sendApi) => {
    try {
      const responseData = await axios.post(apiurl + "/api/education/subjectOpen", { subjects: sendApi });
      const data = responseData.data;
      sendApi.forEach((v) => {
        localStorage.removeItem("ch-" + v.id)
      });
      Swal.fire({ icon: "success", "title": data.msg }).then(() => window.location.reload())

    } catch (error) {

      Swal.fire({ icon: "error", titleText: error.response.data.msgerror })
    }

  }
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
    <div className="background21 block min-h-screen w-full p-3 md:p-10">
      <div className="flex flex-col gap-3 h-full">
        <div className="flex gap-5 flex-col">
          <div className="flex font-family text-wrap font-bold text-4xl size-30 text-midgreen h1text-shadow ">
            เลือกรายวิชาที่เปิดสอน
          </div>

          {/* <HeaderSort_pre/> */}


          <div className="flex flex-1 gap-3 flex-col lg:flex-row">
            <SearchingBar searchInput={searchInput} setSearchInput={setSearchInput}></SearchingBar>
            <div className="flex flex-col gap-3 w-full md:flex-row">
              <CourseYears />
              <Category_sub />
              <div className="font-family items-end flex">
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
        </div>
        <div className="flex flex-1">
          <div className="flex w-full bg-slate-200 rounded-lg overflow-x-auto shadow-xl h-full overflow-y-auto">
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
                <tbody key={startIndex + i} className={` ${i % 2 == 0 ? " bg-slate-100" : " bg-white"}`}>
                  <td className="py-2 font-light text-lg text-center">
                    <InlineCheckbox index={startIndex + i}
                      id={v.id}
                      isOpen={v.IsOpen}
                      setApi={setSendApi}
                      sendApi={sendApi}
                    />
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
                  <td className="py-2 font-light text-lg text-center">
                    {v.credit}
                  </td>
                </tbody>
              ))}
            </table>
          </div>

        </div>
        {(subjects.msg || noneSubject.msgerror) && <div className=" p-5 text-center w-full text-2xl text-red-500 underline">
          {subjects.msg}{noneSubject.msgerror}
        </div>}
        <div className="flex justify-end">
          <div className="flex relative gap-5">
            {sendApi.length > 0 &&
              <button class="flex justify-center items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                style={{
                  backgroundColor: "#134e4a",
                  width: 110,
                  height: 45,
                }} onClick={() => { clearLocalStorageByPrefix("ch-"); window.location.reload() }} >
                <IoMdUndo size={34} />
              </button>}

            <button

              type="submit"
              class="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              style={{
                backgroundColor: "#134e4a",
                width: 110,
                height: 45,
              }}
              onClick={() => addSubjects(sendApi)}
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

export default ImportCourse;
