import { Link, useNavigate } from "react-router-dom";
import "./course-set.css";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const ImportCourse = () => {
  const [isSemOpen, setIsSemOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const toggleSemDropdown = () => {
    setIsSemOpen(!isSemOpen);
  };

  const toggleYearDropdown = () => {
    setIsYearOpen(!isYearOpen);
  };

  const userRole = localStorage.getItem("role");

  const navigate = useNavigate();
  const InlineCheckbox = () => {
    return (
      <div className="flex items-center me-4 justify-center">
        <input
          id="inline-checkbox"
          type="checkbox"
          value=""
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
    return null;
  }

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
        <h1
          style={{
            flex: 1,
          }}
          className="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow mt-10 ml-10 "
        >
          เลือกรายวิชาที่เปิดสอน
        </h1>
        <div className="flex flex-1 relative mt-10">
          <div className="flex flex-1 flex-row items-center ">
            <p className="textinsert font-bold ml-10">ภาคเรียน</p>
            <div className="flex relative ml-5">
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
            <p className="textinsert font-bold ml-5">ปีการศึกษา</p>
            <div className="flex relative ml-5">
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
        <div
          style={{
            display: "flex",
            flex: 1,
            // borderColor: "blue",
            // borderWidth: 5,
            marginLeft: 40,
            marginTop: 10,
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
                marginTop: 3,
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
        <div className="flex flex-7 flex-col mt-5 ">
          <div className="flex flex-4">
            <div className="flex flex-1 ml-10 mr-5 bg-slate-200 rounded-lg overflow-x-auto shadow-xl h-full overflow-y-auto">
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

                <tbody>
                  <td className="py-2 font-light text-lg text-center">
                    <InlineCheckbox />
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"03603423"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"Network Programming"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"60"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"บังคับ"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">{"3"}</td>
                </tbody>

                <tbody>
                  <td className="py-2 font-light text-lg text-center ">
                    <InlineCheckbox />
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"03603423"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"Network Programming"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"64"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"บังคับ"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">{"3"}</td>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-1 justify-center">
            <button>
              <FaCircleLeft size={21} color="#0a6765" className="mr-3 mt-8" />
            </button>
            <p className="text-lg font-semibold text-midgreen  mt-8">
              หน้า 1 จาก 1
            </p>
            <button>
              <FaCircleRight size={21} color="#0a6765" className="ml-3 mt-8" />
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
