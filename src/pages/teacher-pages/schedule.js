import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Search } from "lucide-react";
import { CalendarClockIcon } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiurl } from "../../config";
import SearchTab from "./searchtab";
import { TimerResetIcon } from "lucide-react";
import { InfoIcon } from "lucide-react";
import { FaCircleLeft } from "react-icons/fa6";
import { FaCircleRight } from "react-icons/fa6";

const Schedule = () => {
  const userRole = localStorage.getItem("role_id");
  const userName = localStorage.getItem("name");
  const userID = localStorage.getItem("userid");
  const navigate = useNavigate();
  const [isTeacher, setIsTeacher] = useState(true);
  const [subjectUser, setSubjectUser] = useState([]);
  const [subjectAll, setSubjectAll] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [subjectCategories, setSubjectCategories] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searching, setSearching] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teacherSchedule, setTeacherSchedule] = useState([]);
  const [years, setYears] = useState(["1", "2", "3", "4", "5"]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSubjectCategories = async () => {
      try {
        const response = await axios.get(apiurl + "/api/subject_category");
        setSubjectCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching subject categories: ", error);
      }
    };

    fetchSubjectCategories();
  }, []);

  useEffect(() => {
    const tbodyCells = document.querySelectorAll(".flex table tbody td");
    tbodyCells.forEach((cell) => {
      const colspan = cell.getAttribute("colspan");
      if (colspan) {
        cell.style.width = `${100 / parseInt(colspan)}%`;
      }
    });
  }, [filteredSubjects]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        let response;
        if (isTeacher) {
          response = await axios.get(
            apiurl + "/api/teacher/schedule_single/" + userID
          );
        } else {
          response = await axios.get(apiurl + "/api/teacher/schedule");
        }

        if (response.status === 200) {
          const data = response.data;
          if (isTeacher) {
            setSubjectUser(data);
            setFilteredSubjects(data);
            setTeacherSchedule(data);
          } else {
            setSubjectAll(data);
            setFilteredSubjects(data);
          }
        } else {
          console.error(
            "Error fetching schedule data: Unexpected status code ",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching schedule data: ", error);
        if (error.response && error.response.status === 404) {
          setFilteredSubjects([]);
        }
      }
    };

    fetchScheduleData();
  }, [userID, isTeacher]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const selectedId = parseInt(e.target.value);
    setSelectedCategory(selectedId);
  };

  const handleDayChange = (e) => {
    const selectedDay = parseInt(e.target.value);
    setSelectedDay(selectedDay);
  }

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const filteredSubjects = searchAndFilterSubjects(
      searchInput,
      selectedCategory,
      selectedDay,
      selectedYear,
      isTeacher
    );
    setFilteredSubjects(filteredSubjects);
    if (isTeacher) {
      setTeacherSchedule(filteredSubjects);
    }
  };

  const searchAndFilterSubjects = (input, category, day, year, isTeacher) => {
    if (!input.trim()) {
      return isTeacher
        ? subjectUser.filter(
          (subject) =>
            (!category || subject.subject_category_id === category) &&
            (!year ||
              Object.values(subject.branch).some((branchArray) =>
                branchArray.includes(Number(year))
              )) && (!day || subject.day_id === day)
        )
        : subjectAll.filter(
          (subject) =>
            (!category || subject.subject_category_id === category) &&
            (!year ||
              Object.values(subject.branch).some((branchArray) =>
                branchArray.includes(Number(year))
              )) && (!day || subject.day_id === day)
        );
    } else {
      const filtered = isTeacher
        ? subjectUser.filter(
          (subject) =>
            (subject.id_subject.includes(input) ||
              subject.SUBJECT.includes(input) ||
              subject.NAME.includes(input)) &&
            (!category || subject.subject_category_id === category) &&
            (!year ||
              Object.values(subject.branch).some((branchArray) =>
                branchArray.includes(Number(year))
              )) && (!day || subject.day_id === day)
        )
        : subjectAll.filter(
          (subject) =>
            (subject.id_subject.includes(input) ||
              subject.SUBJECT.includes(input) ||
              subject.NAME.includes(input)) &&
            (!category || subject.subject_category_id === category) &&
            (!year ||
              Object.values(subject.branch).some((branchArray) =>
                branchArray.includes(Number(year))
              )) && (!day || subject.day_id === day)
        );
      return filtered;
    }
  };

  const handleReset = () => {
    setSearchInput("");
    setSelectedDay("");
    setSelectedYear("");
    setSelectedCategory("");
    setFilteredSubjects(isTeacher ? subjectUser : subjectAll);
  };

  const showAlert = (subject) => {
    Swal.fire({
      title: subject.SUBJECT,
      html: `
          <div>รหัสวิชา: ${subject.id_subject}-${subject.ySubject.substring(
        2
      )}</div>
          <div>หน่วยกิต: ${subject.credit}</div>
          <div>อาจารย์ผู้สอน: ${subject.NAME}</div>
          <div>จำนวนนิสิต: ${subject.N_people}</div>
          ${Object.keys(subject.branch)
          .map(
            (branchKey) =>
              `<div>ชั้นปีที่เปิดรับ ${branchKey}: ${subject.branch[branchKey]
                ? subject.branch[branchKey].join(", ")
                : "ไม่มีข้อมูล"
              }</div>`
          )
          .join("")}
        <div>วัน: ${subject.day}</div>
        <div>เวลา: ${subject.st.substring(0, 5)}-${subject.et.substring(
            0,
            5
          )} น.</div>
      `,
      icon: "info",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
    });
  };

  const showAlertPermission = () => {
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

  if (userRole !== "1") {
    showAlertPermission();
    return null;
  }

  const times = [
    { start: "07:00", end: "07:30" },
    { start: "07:30", end: "08:00" },
    { start: "08:00", end: "08:30" },
    { start: "08:30", end: "09:00" },
    { start: "09:00", end: "09:30" },
    { start: "09:30", end: "10:00" },
    { start: "10:00", end: "10:30" },
    { start: "10:30", end: "11:00" },
    { start: "11:00", end: "11:30" },
    { start: "11:30", end: "12:00" },
    { start: "12:00", end: "12:30" },
    { start: "12:30", end: "13:00" },
    { start: "13:00", end: "13:30" },
    { start: "13:30", end: "14:00" },
    { start: "14:00", end: "14:30" },
    { start: "14:30", end: "15:00" },
    { start: "15:00", end: "15:30" },
    { start: "15:30", end: "16:00" },
    { start: "16:00", end: "16:30" },
    { start: "16:30", end: "17:00" },
    { start: "17:00", end: "17:30" },
    { start: "17:30", end: "18:00" },
    { start: "18:00", end: "18:30" },
    { start: "18:30", end: "19:00" },
    { start: "19:00", end: "19:30" },
    { start: "19:30", end: "20:00" },
    { start: "20:00", end: "20:30" },
    { start: "20:30", end: "21:00" },
    { start: "21:00", end: "21:30" },
    { start: "21:30", end: "22:00" },
  ];

  const days = [
    { id: 1, name: "วันจันทร์" },
    { id: 2, name: "วันอังคาร" },
    { id: 3, name: "วันพุธ" },
    { id: 4, name: "วันพฤหัสบดี" },
    { id: 5, name: "วันศุกร์" },
    { id: 6, name: "วันเสาร์" },
    { id: 7, name: "วันอาทิตย์" },
  ];

  const itemsPerPage = 5; // จำนวนรายการต่อหน้า

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages && currentSubjects.length > 0) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubjects = filteredSubjects.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);


  const getMergedCells = (day, teacherSchedule) => {
    const mergedCells = [];
    let currentSubject = null;
    let currentStart = null;
    let currentEnd = null;
    for (let i = 0; i < times.length; i++) {
      const { start, end } = times[i];
      const subjectsInRange = teacherSchedule.filter(
        (subject) =>
          subject.day_id === day.id && subject.st <= end && subject.et > start
      );
      if (subjectsInRange.length > 0) {
        if (!currentSubject) {
          currentSubject = subjectsInRange[0];
          currentStart = end; // Start merging from the next time slot
          currentEnd = end;
        } else if (
          subjectsInRange.some(
            (subject) => subject.id_subject !== currentSubject.id_subject
          )
        ) {
          mergedCells.push({
            start: currentStart,
            end: currentEnd,
            subjects: [currentSubject],
          });
          currentSubject = subjectsInRange[0];
          currentStart = end; // Start merging from the next time slot
          currentEnd = end;
        } else {
          currentEnd = end;
        }
      } else {
        if (currentSubject) {
          mergedCells.push({
            start: currentStart,
            end: currentEnd,
            subjects: [currentSubject],
          });
          currentSubject = null;
          currentStart = null;
          currentEnd = null;
        }
      }
    }
    if (currentSubject) {
      mergedCells.push({
        start: currentStart,
        end: currentEnd,
        subjects: [currentSubject],
      });
    }
    return mergedCells;
  };

  return (
    <div
      className="flex-col flex py-10 px-10 bg-white flex-1 min-h-screen"
      style={{ backgroundColor: "#cce3de" }}
    >
      <div className="flex">
        <p className="text-4xl font-bold h1text-shadow text-midgreen">
          ตารางสอน
        </p>
      </div>

      <div className="flex flex-col mt-10 mb-5 md:flex-row">

        <div className="flex mr-3 flex-col w-48">
          <label className="text-midgreen mb-1">รหัส/วิชา/ผู้สอน</label>
          <input
            type="search"
            className="focus:outline-none rounded-sm md:h-8 h-10 md:w-full w-72"
            value={searchInput}
            onChange={handleInputChange}
          ></input>
          {searching && (
            <SearchTab
              searching={searching}
              setSearching={setSearching}
              loading={loading}
              handleInputChange={handleInputChange}
            />
          )}
        </div>

        <div className="flex flex-col w-14 mr-3 mt-3 md:mt-0">
          <label className="text-midgreen mb-1">ชั้นปี</label>
          <select
            className="focus:outline-none rounded-sm md:h-8 h-10 md:w-full w-72"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">เลือกชั้นปี</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year === "5" ? "ชั้นปี 4 ขึ้นไป" : `ชั้นปี ${year}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mr-3 mt-3 md:mt-0">
          <label className="text-midgreen mb-1">หมวดวิชา</label>
          <select
            className="focus:outline-none rounded-sm md:h-8 h-10 md:w-full w-72"
            onChange={handleCategoryChange}
          >
            <option value="">เลือกหมวดวิชา</option>
            {subjectCategories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mr-3 mt-3 md:mt-0">
          <label className="text-midgreen mb-1">เลือกวันที่สอน</label>
          <select
            className="focus:outline-none rounded-sm md:h-8 h-10 md:w-full w-72"
            onChange={handleDayChange}
          >
            <option value="">เลือกวันที่สอน</option>
            {days.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-row md:mt-0 mt-3">
          <div className="flex mt-2 items-end cursor-pointer ml-0 md:ml-2">
            <button
              className="transition-all bg-green-600 rounded-3xl w-24 h-10 justify-center items-center flex flex-row shadow-lg"
              onClick={handleSearch}
            >
              <label className="text-white text-base cursor-pointer">ค้นหา</label>
              <Search size={21} color="white" className="ml-1" />
            </button>
          </div>

          <div className="flex mt-2 items-end cursor-pointer ml-2 mr-2">
            <button
              className="transition-all bg-yellow-400 rounded-3xl w-24 h-10 justify-center items-center flex flex-row shadow-lg"
              onClick={handleReset}
            >
              <label className="text-white text-base cursor-pointer">
                รีเซ็ต
              </label>
              <TimerResetIcon size={21} color="white" className="ml-1" />
            </button>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="flex-row flex mt-5 ml-0 items-end  md:ml-2 md:mt-2">
            <div
              className={`transition-all w-8 h-8 mr-2 ${isTeacher ? "bg-green-400" : "hidden"
                }`}
            ></div>
            <label className={`ptext-shadow mb-1 ${isTeacher ? "" : "hidden"}`}>
              {isTeacher ? "ผ่าน" : ""}
            </label>
          </div>

          <div className="flex flex-row ml-2 items-end">
            <div
              className={`transition-all w-8 h-8 mr-2 ${isTeacher ? "bg-red-500" : "hidden"
                }`}
            ></div>
            <label
              className={`ptext-shadow mb-1 ${isTeacher ? "" : "text-red-600"}`}
            >
              {isTeacher
                ? "ไม่ผ่าน"
                : "*แสดงเฉพาะวิชาที่ลงทะเบียนผ่านแล้วเท่านั้น*"}
            </label>
          </div>

          <div className="flex flex-row ml-2 items-end">
            <div
              className={`transition-all w-8 h-8 mr-2 ${isTeacher ? "bg-orange-500" : "hidden"
                }`}
            ></div>
            <label className={`ptext-shadow mb-1 ${isTeacher ? "" : "hidden"}`}>
              {isTeacher ? "รอ" : ""}
            </label>
          </div>
        </div>

        <div
          className="flex flex-row -ml-0 items-end mb-1 md:mt-0 mt-4 md:ml-8"
          onClick={() => {
            setIsTeacher(!isTeacher);
          }}
        >
          <CalendarClockIcon
            size={21}
            className="border-white cursor-pointer"
          />
          <label className="ml-2 font-bold ptext-shadow cursor-pointer transition-all">
            {isTeacher ? "MY SCHEDULE" : "GLOBAL SCHEDULE"}
          </label>
        </div>
      </div>

      <div className="flex">
        {isTeacher ? (
          teacherSchedule.length === 0 ? (
            <table className="mt-0 border-collapse border border-gray-400 shadow-md">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 py-2 px-4"></th>
                  {times.map((time, index) => (
                    <th
                      key={index}
                      className="border border-gray-400 py-2 px-2"
                    >
                      <div className="text-xs">{`${time.start}-${time.end}`}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {days.map((day, dayIndex) => (
                  <tr key={dayIndex} className="bg-white">
                    <td className="border border-gray-400 py-2 px-4 font-semibold">
                      {day.name}
                    </td>
                    {times.map((time, timeIndex) => (
                      <td
                        key={timeIndex}
                        className="border border-gray-400 py-2 px-2 bg-white"
                      ></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="mt-0 border-collapse border border-gray-400 shadow-md">
              {/* Table Header */}
              <thead>
                <tr className="column-color1">
                  <th className="border border-gray-600 border-opacity-25 text-white font-thin py-2 px-4"></th>
                  {times.map((time, index) => (
                    <th
                      key={index}
                      className="border border-gray-600 border-opacity-25 font-normal text-white py-2 px-2"
                    >
                      <div className="text-xs">{`${time.start}-${time.end}`}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {days.map((day, dayIndex) => (
                  <tr key={dayIndex} className="bg-white">
                    <td className="border border-gray-400 py-2 px-4 font-semibold">
                      {day.name}
                    </td>
                    {times.map((time, timeIndex) => {
                      const mergedCell = getMergedCells(
                        day,
                        teacherSchedule
                      ).find(
                        (cell) =>
                          cell.start <= time.end &&
                          cell.end >= time.start &&
                          cell.end > time.end
                      );
                      if (mergedCell) {
                        if (mergedCell.start === time.start) {
                          return (
                            <td
                              key={`${dayIndex}-${timeIndex}`}
                              className={`border border-gray-400 py-2 px-2 text-center ${mergedCell.subjects.some(
                                (subject) => subject.status_id === 1
                              )
                                ? "bg-green-500"
                                : mergedCell.subjects.some(
                                  (subject) => subject.status_id === 2
                                )
                                  ? "bg-orange-500"
                                  : mergedCell.subjects.some(
                                    (subject) => subject.status_id === 3
                                  )
                                    ? "bg-red-500"
                                    : "bg-white"
                                }`}
                              colSpan={
                                times.findIndex(
                                  (t) => t.end === mergedCell.end
                                ) -
                                times.findIndex(
                                  (t) => t.start === mergedCell.start
                                ) +
                                1
                              }
                            >
                              {mergedCell.subjects.length > 1 && (
                                <div className="text-shadow text-white flex flex-row justify-center mb-2">
                                  {mergedCell.subjects.length} วิชาในเวลานี้
                                </div>
                              )}
                              {mergedCell.subjects.map(
                                (subject, subjectIndex) => (
                                  <div
                                    key={subjectIndex}
                                    className="text-shadow text-white flex flex-row justify-center"
                                  >
                                    {subject.id_subject}-
                                    {subject.ySubject.substring(2)}
                                    <br></br>
                                    {subject.SUBJECT}
                                    <br></br>
                                    {subject.st.substring(0, 5)} -{" "}
                                    {subject.et.substring(0, 5)} น.
                                    <InfoIcon
                                      size={20}
                                      color="white"
                                      className="self-center ml-2 cursor-pointer"
                                      onClick={() => showAlert(subject)}
                                    ></InfoIcon>
                                  </div>
                                )
                              )}
                            </td>
                          );
                        } else {
                          return null;
                        }
                      } else {
                        return (
                          <td
                            key={`${dayIndex}-${timeIndex}`}
                            className="border border-gray-400 py-2 px-2 bg-white"
                          ></td>
                        );
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : null}
      </div>

      <div className={`flex bg-slate-200 mt-10 rounded-lg shadow-xl text-center ${isTeacher ? "" : "-mt-2"}`}>
        <table className="h-full w-full">
          <thead>
            <tr className="column-color1 text-white">
              <th className="py-2 font-light text-base border-x-black border-x-2 border-opacity-10">
                #
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2 border-opacity-10">
                รหัส
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2 border-opacity-10">
                วิชา
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2 border-opacity-10">
                หน่วยกิต
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2 border-opacity-10">
                lec/lab
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2 border-opacity-10">
                อาจารย์ผู้สอน
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2 border-opacity-10">
                จำนวนนิสิต
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2 border-opacity-10">
                ชั้นปีที่เปิดรับ
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2 border-opacity-10">
                วัน
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2 border-opacity-10">
                เวลา
              </th>
              <th
                className={`py-2 font-light text-base border-r-black border-x-2 border-opacity-10`}
              >
                แก้ไข
              </th>
            </tr>
          </thead>
          <tbody>
            {currentSubjects.length === 0 ? (
              <tr>
                <td
                  className="border border-gray-400 py-2 px-4 text-red-600"
                  colSpan="11"
                >
                  ไม่พบข้อมูลที่ท่านค้นหา
                </td>
              </tr>
            ) : (
              currentSubjects.map((subject, index) => (
                <tr key={index} className="bg-white ptext-shadow">
                  <td className="border border-gray-400 py-2 px-4 border-opacity-10">
                    {index + 1}
                  </td>
                  <td className="border border-gray-400 py-2 px-4 border-opacity-10">
                    {subject.id_subject}-{subject.ySubject.substring(2)}
                  </td>
                  <td className="border border-gray-400 py-2 px-4 border-opacity-10">
                    {subject.SUBJECT}
                  </td>
                  <td className="border border-gray-400 py-2 px-4 border-opacity-10">
                    {subject.credit}
                  </td>
                  <td className="border border-gray-400 py-2 px-4 border-opacity-10">
                    {subject.Moo}
                  </td>
                  <td className="border border-gray-400 py-2 px-4 border-opacity-10">
                    {subject.NAME}
                  </td>
                  <td className="border border-gray-400 py-2 px-4 border-opacity-10">
                    {subject.N_people}
                  </td>
                  <td className="border border-gray-400 py-2 px-4 border-opacity-10">
                    {Object.keys(subject.branch).map((branchKey) => (
                      <div key={branchKey}>
                        <span>{branchKey} : ชั้นปี </span>
                        {subject.branch[branchKey].sort().map((item, idx) => (
                          <span key={idx}>
                            {idx > 0 && ", "}
                            {item}
                          </span>
                        ))}
                      </div>
                    ))}
                  </td>
                  <td className="border border-gray-400 py-2 px-4 border-opacity-10">
                    {subject.day}
                  </td>
                  <td className="border border-gray-400 py-2 px-4 border-opacity-10">
                    {subject.st.substring(0, 5)}-{subject.et.substring(0, 5)} น.
                  </td>
                  <td className="border border-gray-400 py-2 px-4 border-opacity-10">
                    <Link to={"/schedule_edit/" + subject.idre}>
                      <button
                        className={`bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-3 ${subject.NAME !== userName
                          ? "hidden opacity-0 cursor-default"
                          : ""
                          }`}
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-2 mt-10 justify-center items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <FaCircleLeft size={21} color="#0a6765" className="mr-1" />
        </button>
        <p className="text-lg font-semibold text-midgreen mx-4">
          หน้า {currentPage} จาก {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <FaCircleRight size={21} color="#0a6765" />
        </button>
      </div>
    </div>
  );
};

export default Schedule;
