//รายวิชาที่เปิดสอน (ฝ่ายการศึกษา)

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiurl } from "../../config";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const SubOpen = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPage = 7;
  const totalPages = Math.ceil(subjects.length / subjectsPage);
  const startIndex = (currentPage - 1) * subjectsPage;
  const endIndex = startIndex + subjectsPage;
  const currentsubjects =
    subjects.msg || subjects.msgerr ? [] : subjects.slice(startIndex, endIndex);
  useEffect(() => {
    const getapi = async () => {
      try {
        const database = await axios.get(apiurl + "/api/subjest");
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
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // const [statusSem, setSemStatus] = useState(1);
  // const [statusYear, setYearStatus] = useState(1);
  // const [statusCat, setCatStatus] = useState(1);
  // const [Sstatus, setSStatus] = useState(2);

  // const handleSemStatusChange = (e) => {
  //   setSemStatus(e.target.value);
  //   if (e.target.value === "ต้น") {
  //     setSStatus(1);
  //   } else if (e.target.value === "ปลาย") {
  //     setSStatus(2);
  //   }
  // };

  // const handleYearStatusChange = (e) => {
  //   setYearStatus(e.target.value);
  //   if (e.target.value === "") {
  //     setSStatus(0);
  //   } else if (e.target.value === "2566") {
  //     setSStatus(1);
  //   } else if (e.target.value === "2565") {
  //     setSStatus(2);
  //   } else if (e.target.value === "2564") {
  //     setSStatus(3);
  //   } else if (e.target.value === "2563") {
  //     setSStatus(4);
  //   } else if (e.target.value === "2562") {
  //     setSStatus(5);
  //   } else if (e.target.value === "2561") {
  //     setSStatus(6);
  //   }
  // };

  // const handleCatStatusChange = (e) => {
  //   setCatStatus(e.target.value);
  //   if (e.target.value === "บังคับ") {
  //     setSStatus(1);
  //   } else if (e.target.value === "เฉพาะเลือก") {
  //     setSStatus(2);
  //   } else if (e.target.value === "เลือก") {
  //     setSStatus(3);
  //   }
  // };
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
    <div className="flex flex-auto overflow-hidden h-screen background21 ">
      <div
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <h1 className="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow mt-10 ml-10 ">
          รายวิชาที่เปิดสอน
        </h1>

        <div
          style={{
            display: "flex",
            flex: 1,
            marginLeft: 30,
            marginTop: 40,
          }}
        >
          <div
            style={{
              flex: 1,
              // borderColor: "green",
              // borderWidth: 5,
            }}
            className="flex font-family text-xl font-medium"
          >
            <p className="flex font-family text-xl font-medium ptext-shadow mr-3 mt-1">
              ภาคเรียน <span style={{ color: "red" }}>*</span>
            </p>
            <div style={{ position: "relative" }}>
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 120, height: 40 }}
                // value={statusSem}
                // onChange={handleSemStatusChange}
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
          </div>
          <div
            style={{ flex: 4 }}
            className="flex font-family text-xl font-medium ml-3"
          >
            <p className="flex font-family text-xl font-medium ptext-shadow mr-3 mt-1">
              ปีการศึกษา <span style={{ color: "red" }}>*</span>
            </p>
            <div style={{ position: "relative" }}>
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 120, height: 40 }}
                // value={statusYear}
                // onChange={handleYearStatusChange}
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
        <div
          style={{
            display: "flex",
            flex: 1,
            // borderColor: "blue",
            // borderWidth: 5,
            marginLeft: 30,
            marginTop: 30,
          }}
        >
          <div
            style={{
              flex: 3,
              // borderColor: "orange",
              // borderWidth: 5,
            }}
          >
            <form>
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  วิชา/รหัสวิชา
                </label>
                <input
                  type="text"
                  id="course_code"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="โปรดระบุวิชาหรือรหัสวิชา"
                  required
                />
              </div>
            </form>
          </div>
          <div
            style={{
              flex: 1,
            }}
            className="flex font-family font-medium ml-7 flex-col"
          >
            <div>
              <p className="text-sm font-medium mb-2">หมวดวิชา</p>
            </div>
            <div style={{ position: "relative" }}>
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 140, height: 40 }}
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
          <div
            style={{
              flex: 6,
              // borderColor: "orange",
              // borderWidth: 5,
            }}
            className="font-family mt-7 ml-10"
          >
            <button
              type="button"
              class="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
        <div
          style={{
            display: "flex",
            flex: 1,
            // borderColor: "blue",
            // borderWidth: 5,
            marginLeft: 30,
          }}
        >
          <div className="flex flex-1 bg-slate-200 mt-10 rounded-lg overflow-x-auto shadow-xl">
            <table className="h-full w-full">
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
                      {index + 1}
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
        <div className=" text-center mt-5 text-red-600 text-2xl">
          {subjects.msg}
          {subjects.msgerr}
        </div>
      </div>
    </div>
  );
};
export default SubOpen;
