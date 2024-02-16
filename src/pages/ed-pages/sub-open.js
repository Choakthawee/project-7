//รายวิชาที่เปิดสอน (ฝ่ายการศึกษา)
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import React, { useState } from "react";

const SubOpen = () => {
  const [isSemOpen, setIsSemOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isSylOpen, setIsSylOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  const showAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'ข้อผิดพลาด',
      text: 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ตกลง'
    }).then((result) => {
      if (result.isConfirmed) {
        if (userRole === "admin") {
          navigate('/userinfo');
        } else if (userRole === "teacher") {
          navigate('/schedule');
        }
      }
    });
  };

  if (userRole !== 'education department') {
    showAlert();
    return null;
  }

  const toggleSemDropdown = () => {
    setIsSemOpen(!isSemOpen);
  };

  const toggleYearDropdown = () => {
    setIsYearOpen(!isYearOpen);
  };

  const toggleSylDropdown = () => {
    setIsSylOpen(!isSylOpen);
  };

  const toggleTypeDropdown = () => {
    setIsTypeOpen(!isTypeOpen);
  };

  return (
    <div className="background">
      <div
        style={{
          flex: 1,
          borderColor: "red",
          borderWidth: 5,
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            flex: 1,
          }}
          className="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow mt-10 ml-10 "
        >
          รายวิชาที่เปิดสอน
        </h1>

        <div
          style={{
            display: "flex",
            flex: 1,
            borderColor: "blue",
            borderWidth: 5,
            marginLeft: 30,
            marginTop: 30,
          }}
        >
          <div
            style={{
              flex: 1,
              borderColor: "green",
              borderWidth: 5,
            }}
            className="flex font-family text-xl font-medium"
          >
            <p className="flex font-family text-xl font-medium ptext-shadow">
              ภาคเรียน
            </p>
            <div className="relative ml-5">
              <button
                id="dropdownDefaultButton-Sem"
                data-dropdown-toggle="dropdown"
                className="text-black bg-white hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:hover:bg-white dark:focus:ring-black"
                type="button"
                onClick={toggleSemDropdown}
              >
                ----
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isSemOpen && (
                <div
                  id="dropdown"
                  className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white absolute top-full mt-1"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-black"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        ต้น
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        ปลาย
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              flex: 5,
              borderColor: "yellow",
              borderWidth: 5,
            }}
            className="flex font-family text-xl font-medium"
          >
            <p className="flex font-family text-xl font-medium ptext-shadow">
              ปีการศึกษา
            </p>
            <div className="relative ml-5">
              <button
                id="dropdownDefaultButton-Year"
                data-dropdown-toggle="dropdown"
                className="text-black bg-white hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:hover:bg-white dark:focus:ring-black"
                type="button"
                onClick={toggleYearDropdown}
              >
                ----
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isYearOpen && (
                <div
                  id="dropdown"
                  className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white absolute top-full mt-1"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-black"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        2566
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        2565
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        2564
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        2563
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            borderColor: "blue",
            borderWidth: 5,
            marginLeft: 30,
            marginTop: 30,
          }}
        >
          <div>
            <form>
              <div class="gap-5 mb-6">
                <label
                  for="course_code"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  วิชา/รหัสวิชา <span style={{ color: "red" }}>*</span>
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
          <div className="ml-10">
            <label
              for="syl"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              หลักสูตร <span style={{ color: "red" }}>*</span>
            </label>
            <div className="relative">
              <button
                id="dropdownDefaultButton-Year"
                data-dropdown-toggle="dropdown"
                className="text-black bg-white hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:hover:bg-white dark:focus:ring-black"
                type="button"
                onClick={toggleSylDropdown}
              >
                ----
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isSylOpen && (
                <div
                  id="dropdown"
                  className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white absolute top-full mt-1"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-black"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        2566
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        2565
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        2564
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        2563
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="ml-10">
            <label
              for="dropdownDefaultButton-Type"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              หมวดวิชา <span style={{ color: "red" }}>*</span>
            </label>
            <div className="relative">
              <button
                id="dropdownDefaultButton-Type"
                data-dropdown-toggle="dropdown"
                className="text-black bg-white hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:hover:bg-white dark:focus:ring-black"
                type="button"
                onClick={toggleTypeDropdown}
              >
                ----
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isTypeOpen && (
                <div
                  id="dropdown"
                  className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white absolute top-full mt-1"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-black"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        บังคับ
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        เฉพาะเลือก
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        เลือก
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubOpen;
