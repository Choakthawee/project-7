import { Link, useNavigate } from "react-router-dom";
import "./course-set.css";
import React, { useState } from "react";
import Swal from "sweetalert2";

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
          นำเข้ารายวิชา
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
                      <Link
                        to="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        ต้น
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        ปลาย
                      </Link>
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
                      <Link
                        to="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        2566
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        2565
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        2564
                      </Link>
                    </li>
                    {/* Add other year options as needed */}
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

export default ImportCourse;
