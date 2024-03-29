//รายวิชาที่เปิดสอน (ฝ่ายการศึกษา)

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import { apiurl } from "../../config";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import SearchingBar from "../component/searchBar";
import HeaderSort_pre from "../component/headSort_pre";
import Category_sub from "../component/category_sub";
import CourseYears from "../component/courseyear";
import ButtonSeaching from "../component/buttonSearching";
import SortBar from "../component/sortBar";
import { icon, text } from "@fortawesome/fontawesome-svg-core";

const SubOpen = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPage = 8;
  const totalPages = (subjects.msg || subjects.msgerr) ? 1 : subjects.results? Math.ceil(subjects.results.length / subjectsPage):1;
  const startIndex = (currentPage - 1) * subjectsPage;
  const endIndex = startIndex + subjectsPage;
  const [searchInput, setSearchInput] = useState('');
  const [reload,setReload] = useState(false);
  const currentsubjects =
    (subjects.msg || subjects.msgerr) ? [] :subjects.results? subjects.results.slice(startIndex, endIndex):[];
  useEffect(() => {
    const getapi = async () => {
      try {
        const database = await axios.get(apiurl + "/api/opensubject");
        const data = database.data;
        setSubjects(data);
      } catch (error) {
        setSubjects(error.response.data);
        console.log(error);
      }
    };
    getapi();
  }, [reload]);
  useEffect(() => {
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
    }
  }, [userRole, navigate]);

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
  const unOpenSubject = async (id) => {
    try {
      const dataResponse = await axios.put(
        apiurl + "/api/edu/delete_subjectsIsopen/" + id
      );
      const dataDelete = dataResponse.data;
      console.log(dataDelete.message);
      setReload(!reload);
    } catch (err) {
      if (err.response.data?.error) {
        Swal.fire({icon:"error",text:err.response.data?.error});
      } else {
        console.log(err);
      }
    }
  };
  return (
    <div className="flex min-h-screen w-full background21 ">
      <div className=" flex flex-col h-full w-full p-2 md:p-10 gap-5">
        <h1 className="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow">
          รายวิชาที่เปิดสอน
        </h1>
        {/* <HeaderSort_pre/> */}
        <SortBar url="/api/Searchsubjectopen/" type={3} url1="/api/searchingbar" setCurrent={setSubjects} setCurrentPage={setCurrentPage}/>
        <div className=" flex flex-1">
          <div className="flex w-full bg-slate-200  rounded-lg overflow-x-auto shadow-xl">
            <table className=" w-full">
              <thead>
                <tr className="column-color1 text-white">
                  <th className="py-2 font-light text-xl">#</th>
                  <th className="py-2 font-light text-xl">รหัสวิชา</th>
                  <th className="py-2 font-light text-xl">ชื่อวิชา</th>
                  <th className="py-2 font-light text-xl">หลักสูตร</th>
                  <th className="py-2 font-light text-xl">หน่วยกิต</th>
                  <th className="py-2 font-light text-xl">หมวดวิชา</th>
                  <th className="py-2 font-light text-xl">
                    ลบรายวิชาที่เปิดสอน
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentsubjects.map((v, index) => (
                  <tr
                    key={startIndex + index}
                    className={
                      (startIndex + index) % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }
                  >
                    <td className="py-2 font-light text-lg text-center">
                      {startIndex + index + 1}
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
                      {v.credit}
                    </td>
                    <td className="py-2 font-light text-lg text-center">
                      {v.subject_category}
                    </td>
                    <td className="py-2 text-red-700 underline text-center">
                      <button
                        className=" underline "
                        onClick={() => {
                          Swal.fire({
                            title: "ต้องการลบใช่หรือไม่?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "ใช่",
                            cancelButtonText: "ไม่",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              unOpenSubject(v.id);
                              
                              
                            }
                          });
                        }}
                      >
                        ลบรายวิชา
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {(subjects.msg || subjects.msgerr) && <div className=" text-center text-red-600 text-2xl">
          {subjects.msg}
          {subjects.msgerr}
        </div>}

        <div className="flex justify-center items-end gap-3 h-full">
          <div className="flex  gap-2 items-center">
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
export default SubOpen;
