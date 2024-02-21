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
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

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
          if (userRole === "admin") {
            navigate("/userinfo");
          } else if (userRole === "teacher") {
            navigate("/schedule");
          }
        }
      });
    };

    if (userRole !== "education department") {
      showAlert();
    }
  }, [userRole, navigate]);

  // const totalPages = Math.ceil(users.length / usersPerPage);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [users, setUsers] = useState([]);
  // const currentUsers = users.slice(startIndex, endIndex);
  // const usersPerPage = 7;

  // const handleNextPage = () => {
  //   setCurrentPage((prevPage) => prevPage + 1);
  // };

  // const handlePrevPage = () => {
  //   setCurrentPage((prevPage) => prevPage - 1);
  // };

  const [statusSem, setSemStatus] = useState(1);
  const [statusYear, setYearStatus] = useState(1);
  const [statusCat, setCatStatus] = useState(1);
  const [Sstatus, setSStatus] = useState(2);

  const handleSemStatusChange = (e) => {
    setSemStatus(e.target.value);
    if (e.target.value === "ต้น") {
      setSStatus(1);
    } else if (e.target.value === "ปลาย") {
      setSStatus(2);
    }
  };

  const handleYearStatusChange = (e) => {
    setYearStatus(e.target.value);
    if (e.target.value === "2566") {
      setSStatus(1);
    } else if (e.target.value === "2565") {
      setSStatus(2);
    } else if (e.target.value === "2564") {
      setSStatus(3);
    } else if (e.target.value === "2563") {
      setSStatus(4);
    } else if (e.target.value === "2562") {
      setSStatus(5);
    } else if (e.target.value === "2561") {
      setSStatus(6);
    }
  };

  const handleCatStatusChange = (e) => {
    setCatStatus(e.target.value);
    if (e.target.value === "บังคับ") {
      setSStatus(1);
    } else if (e.target.value === "เฉพาะเลือก") {
      setSStatus(2);
    } else if (e.target.value === "เลือก") {
      setSStatus(3);
    }
  };

  return (
    <div className="background">
      <div
        style={{
          flex: 1,
          // borderColor: "red",
          // borderWidth: 5,
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
            // borderColor: "blue",
            // borderWidth: 5,
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
                value={statusSem}
                onChange={handleSemStatusChange}
              >
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
            style={{
              flex: 4,
              // borderColor: "yellow",
              // borderWidth: 5,
            }}
            className="flex font-family text-xl font-medium ml-3"
          >
            <p className="flex font-family text-xl font-medium ptext-shadow mr-3 mt-1">
              ปีการศึกษา <span style={{ color: "red" }}>*</span>
            </p>
            <div style={{ position: "relative" }}>
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 120, height: 40 }}
                value={statusYear}
                onChange={handleYearStatusChange}
              >
                <option>2566</option>
                <option>2565</option>
                <option>2564</option>
                <option>2563</option>
                <option>2562</option>
                <option>2561</option>
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
              // borderColor: "yellow",
              // borderWidth: 5,
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
                value={statusCat}
                onChange={handleCatStatusChange}
              >
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
                </tr>
              </thead>
              <tbody>
                {/* {currentUsers.map((user, index) => (
                  <tr
                    key={startIndex + index}
                    className={
                      (startIndex + index) % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }
                  > */}
                <td className="py-2 font-light text-lg text-center">{"1"}</td>
                <td className="py-2 font-light text-lg text-center">
                  {"03603423"}
                </td>
                <td className="py-2 font-light text-lg text-center">
                  {"Network Programming"}
                </td>
                <td className="py-2 font-light text-lg text-center">
                  {"2566"}
                </td>
                <td className="py-2 font-light text-lg text-center">{"3"}</td>
                <td className="py-2 font-light text-lg text-center">
                  {"เลือก"}
                </td>
                {/* </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubOpen;
