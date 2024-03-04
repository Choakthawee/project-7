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

const SubOpen = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPage = 8;
  const totalPages = (subjects.msg || subjects.msgerr) ? 1 : Math.ceil(subjects.length / subjectsPage);
  const startIndex = (currentPage - 1) * subjectsPage;
  const endIndex = startIndex + subjectsPage;
  const [searchInput, setSearchInput] = useState('');
  
  const currentsubjects =
    (subjects.msg || subjects.msgerr) ? [] : subjects.slice(startIndex, endIndex);
  useEffect(() => {
    const getapi = async () => {
      try {
        const database = await axios.get(apiurl + "/api/opensubject");
        const data = database.data;
        setSubjects(data);
        console.log(data);
      } catch (error) {
        setSubjects(error.response.data);
        console.log(error);
      }
    };
    getapi();
  }, []);
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
    } catch (err) {
      if (err.response.data.error) {
        console.log(err.response.data.error);
      } else {
        console.log(err);
      }
    }
  };
  return (
    <div className="flex min-h-screen w-full background21 ">
      <div className=" flex flex-col h-full w-full p-10 gap-5">
        <h1 className="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow">
          รายวิชาที่เปิดสอน
        </h1>
        {/* <HeaderSort_pre/> */}
        <div className=" flex gap-5 flex-col md:flex-row">
          <SearchingBar searchInput={searchInput} setSearchInput={setSearchInput} url="/api/Searchsubjectopen/"></SearchingBar>
          <CourseYears/>
          <div className="flex gap-8 ">
            <Category_sub/>
            <div className="font-family flex items-end ">
              <button type="button" class="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
                      {"3"}
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
                              setSubjects(
                                subjects.filter((item) => item.id !== v.id)
                              );
                              Swal.fire("Deleted!", "ลบสำเร็จ!", "success");
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
