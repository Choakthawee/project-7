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

const Schedule = () => {
  const userRole = localStorage.getItem("role_id");
  const userName = localStorage.getItem("name");
  const userID = localStorage.getItem("userid");
  const navigate = useNavigate();
  const [isTeacher, setIsTeacher] = useState(false);
  const [subjectUser, setSubjectUser] = useState([]);
  const [subjectAll, setSubjectAll] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [subjectCategories, setSubjectCategories] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searching, setSearching] = useState([]);
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState(["1", "2", "3", "4", "5"]);

  useEffect(() => {
    const fetchSubjectCategories = async () => {
      try {
        const response = await axios.get(apiurl + "/api/subject_category");
        setSubjectCategories(response.data);
      } catch (error) {
        console.error("Error fetching subject categories: ", error);
      }
    };

    fetchSubjectCategories();
  }, []);

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
        const data = response.data;
        if (isTeacher) {
          setSubjectUser(data);
          setFilteredSubjects(data);
        } else {
          setSubjectAll(data);
          setFilteredSubjects(data);
        }
      } catch (error) {
        console.error("Error fetching schedule data: ", error);
      }
    };

    fetchScheduleData();
  }, [userID, isTeacher]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const filteredSubjects = searchAndFilterSubjects(
      searchInput,
      selectedCategory,
      selectedYear,
      isTeacher
    );
    setFilteredSubjects(filteredSubjects);
  };

  const searchAndFilterSubjects = (input, category, year, isTeacher) => {
    if (!input.trim()) {
      return isTeacher
        ? subjectUser.filter(
            (subject) =>
              (!category || subject.subject_category === category) &&
              (!year || subject.branch.t12.includes(Number(year)))
          )
        : subjectAll.filter(
            (subject) =>
              (!category || subject.subject_category === category) &&
              (!year || subject.branch.t12.includes(Number(year)))
          );
    } else {
      const filtered = isTeacher
        ? subjectUser.filter(
            (subject) =>
              (subject.id_subject.includes(input) ||
                subject.SUBJECT.includes(input) ||
                subject.NAME.includes(input)) &&
              (!category || subject.subject_category === category) &&
              (!year || subject.branch.t12.includes(Number(year)))
          )
        : subjectAll.filter(
            (subject) =>
              (subject.id_subject.includes(input) ||
                subject.SUBJECT.includes(input) ||
                subject.NAME.includes(input)) &&
              (!category || subject.subject_category === category) &&
              (!year || subject.branch.t12.includes(Number(year)))
          );
      return filtered;
    }
  };

  const handleReset = () => {
    setSearchInput("");
    setSelectedYear("");
    setSelectedCategory("");
    setFilteredSubjects(isTeacher ? subjectUser : subjectAll);
  };

  const showAlert = (subject) => {
    Swal.fire({
      title: subject.SUBJECT,
      html: `<div>รหัสวิชา: ${subject.id_subject}-${subject.ySubject.substring(
        2
      )}</div>
           <div>หน่วยกิต: ${subject.credit}</div>
           <div>อาจารย์ผู้สอน: ${subject.NAME}</div>
           <div>จำนวนนิสิต: ${subject.N_people}</div>
           <div>ชั้นปีที่เปิดรับ: ${subject.branch.t12.join(", ")}</div>
           <div>วัน: ${subject.day}</div>
           <div>เวลา: ${subject.st.substring(0, 5)}-${subject.et.substring(
        0,
        5
      )} น.</div>`,
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
    { start: "7:00", end: "7:30" },
    { start: "7:30", end: "8:00" },
    { start: "8:00", end: "8:30" },
    { start: "8:30", end: "9:00" },
    { start: "9:00", end: "9:30" },
    { start: "9:30", end: "10:00" },
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
    "วันจันทร์",
    "วันอังคาร",
    "วันพุธ",
    "วันพฤหัสบดี",
    "วันศุกร์",
    "วันเสาร์",
    "วันอาทิตย์",
  ];
  return (
    <div
      className="flex-col flex py-10 px-10 bg-white flex-1 h-screen"
      style={{ backgroundColor: "#cce3de" }}
    >
      <div className="flex">
        <p className="text-4xl font-bold h1text-shadow text-midgreen">
          ตารางสอน
        </p>
      </div>

      <div className="flex flex-row mt-10 mb-5">
        <div className="flex flex-col mr-3 w-48">
          <label className="text-midgreen mb-1">รหัส/วิชา/ผู้สอน</label>
          <input
            type="search"
            className="focus:outline-none rounded-sm h-8"
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

        <div className="flex flex-col w-14 mr-3">
          <label className="text-midgreen mb-1">ชั้นปี</label>
          <select
            className="focus:outline-none rounded-sm h-8"
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

        <div className="flex flex-col mr-3">
          <label className="text-midgreen mb-1">หมวดวิชา</label>
          <select
            className="focus:outline-none rounded-sm h-8 w-36"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">เลือกหมวดวิชา</option>
            {subjectCategories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex mt-2 items-end cursor-pointer ml-1">
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

        <div className="flex-row flex mt-2 ml-2 items-end">
          <div
            className={`transition-all w-8 h-8 mr-2 ${
              isTeacher ? "bg-green-400" : "bg-pink-400"
            }`}
          ></div>
          <label className="ptext-shadow mb-1">
            {isTeacher ? "ผ่าน" : "บังคับ"}
          </label>
        </div>

        <div className="flex flex-row ml-2 items-end">
          <div
            className={`transition-all w-8 h-8 mr-2 ${
              isTeacher ? "bg-red-500" : "bg-yellow-400"
            }`}
          ></div>
          <label className="ptext-shadow mb-1">
            {isTeacher ? "ไม่ผ่าน" : "เฉพาะเลือก"}
          </label>
        </div>

        <div className="flex flex-row ml-2 items-end">
          <div
            className={`transition-all w-8 h-8 mr-2 ${
              isTeacher ? "bg-orange-500" : "bg-cyan-400"
            }`}
          ></div>
          <label className="ptext-shadow mb-1">
            {isTeacher ? "รอ" : "เลือก"}
          </label>
        </div>

        <div
          className="flex flex-row ml-10 items-end mb-1"
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
        {filteredSubjects.length === 0 ? (
          <table className="mt-0 border-collapse border border-gray-400 shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 py-2 px-4"></th>
                {times.map((time, index) => (
                  <th key={index} className="border border-gray-400 py-2 px-2">
                    <div className="text-xs">{`${time.start}-${time.end}`}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, dayIndex) => (
                <tr key={dayIndex} className="bg-white">
                  <td className="border border-gray-400 py-2 px-4 font-semibold">
                    {day}
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
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 py-2 px-4"></th>
                {times.map((time, index) => (
                  <th key={index} className="border border-gray-400 py-2 px-2">
                    <div className="text-xs">{`${time.start}-${time.end}`}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, dayIndex) => (
                <tr key={dayIndex} className="bg-white">
                  <td className="border border-gray-400 py-2 px-4 font-semibold">
                    {day}
                  </td>
                  {times.map((time, timeIndex) => {
                    const subject = filteredSubjects.find(
                      (sub) =>
                        sub.day === day &&
                        sub.st <= time.end &&
                        sub.et >= time.start &&
                        sub.et >= time.end
                    );
                    let colorClass = "";
                    if (!isTeacher && subject) {
                      switch (subject.subject_category) {
                        case "วิชาบังคับ":
                          colorClass = "bg-pink-400";
                          break;
                        case "วิชาเอก":
                          colorClass = "bg-yellow-400";
                          break;
                        case "วิชาเลือก":
                          colorClass = "bg-cyan-400";
                          break;
                        default:
                          colorClass = "bg-white";
                          break;
                      }
                    } else if (isTeacher && subject) {
                      switch (subject.status) {
                        case "รอ":
                          colorClass = "bg-orange-500";
                          break;
                        case "ผ่าน":
                          colorClass = "bg-green-400";
                          break;
                        case "ไม่ผ่าน":
                          colorClass = "bg-red-500";
                          break;
                        default:
                          colorClass = "bg-white";
                          break;
                      }
                    }
                    return (
                      <td
                        key={timeIndex}
                        className={`border border-gray-400 py-2 px-2 text-xs ${
                          subject ? "border-0 cursor-pointer" : "border"
                        } ${colorClass}`}
                        onClick={() => subject && showAlert(subject)}
                      >
                        {subject
                          ? `${subject.id_subject}-${subject.ySubject.substring(
                              2
                            )}`
                          : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex bg-slate-200 mt-10 rounded-lg overflow-x-auto shadow-xl text-center">
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
            {filteredSubjects.length === 0 ? (
              <tr>
                <td
                  className="border border-gray-400 py-2 px-4 text-red-600"
                  colSpan="11"
                >
                  ไม่พบข้อมูลที่ท่านค้นหา
                </td>
              </tr>
            ) : (
              filteredSubjects.map((subject, index) => (
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
                    {subject.branch.t12.map((item, index) => (
                      <span key={index}>
                        {index > 0 && ", "}
                        ชั้นปี {item}
                      </span>
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
                        className={`bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-3 ${
                          subject.NAME !== userName
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
    </div>
  );
};

export default Schedule;
