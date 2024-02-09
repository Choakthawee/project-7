//นำเข้ารายวิชา (ฝ่ายการศึกษา)
import "./course-set.css";
import React, { useState } from "react";

const ImportCourse = () => {
  const [isSemOpen, setIsSemOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const toggleSemDropdown = () => {
    setIsSemOpen(!isSemOpen);
  };

  const toggleYearDropdown = () => {
    setIsYearOpen(!isYearOpen);
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
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImportCourse;
