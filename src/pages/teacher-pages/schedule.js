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
  const userRole = localStorage.getItem('role_id');
  const userID = localStorage.getItem('userid');
  const navigate = useNavigate();
  const [isTeacher, setIsTeacher] = useState(false);
  const [subjectAll, setSubjectAll] = useState([]);
  const [subjectUser, setSubjectUser] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  {/* option */ }
  const [years, setYears] = useState(["1", "2", "3", "4", "5"]);
  const [subjectCategories, setSubjectCategories] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  {
    /* search */
  }
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  useEffect(() => {
    axios
      .get(apiurl + "/api/subject_category")
      .then((response) => {
        setSubjectCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    axios.get(apiurl + "/api/teacher/schedule_single/" + userID)
      .then((response) => {
        setSubjectUser(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
  }, [])

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const [searching, setSearching] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getapiSearch = async () => {
      try {
        setLoading(true);
        const dataresponse = await axios.get(
          apiurl + "/api/searchregister/" + searchInput
        );
        const data = dataresponse.data;
        setSearching(data.message);
      } catch (err) {
        setSearching({ error: err.response.data.error });
      } finally {
        setLoading(false);
      }
    };

    if (searchInput && searching) {
      getapiSearch();
    } else {
      setSearching([]);
    }
  }, [searchInput]);

  useEffect(() => {
    axios
      .get(apiurl + "/api/teacher/schedule")
      .then((response) => {
        setSubjectAll(response.data);
        setFilteredSubjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    console.log(selectedYear)
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log(selectedCategory)
  };

  const handleSearch = () => {
    if (searchInput.trim() === '') {
      setFilteredSubjects(subjectAll.filter(subject =>
        (selectedCategory === '' || subject.subject_category === selectedCategory) &&
        (selectedYear === '' || subject.branch.t12.includes(Number(selectedYear)))
      ));
    } else {
      const filtered = subjectAll.filter(subject =>
        ((subject.id_subject.includes(searchInput) ||
          subject.SUBJECT.includes(searchInput) ||
          subject.NAME.includes(searchInput)) &&
          (selectedCategory === '' || subject.subject_category === selectedCategory)) &&
        (selectedYear === '' || subject.branch.t12.includes(Number(selectedYear)))
      );
      setFilteredSubjects(filtered);
    }
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
        if (userRole === "2") {
          navigate("/userinfo");
        } else if (userRole === "3") {
          navigate("/imcourse");
        }
      }
    });
  };

  const handleReset = () => {
    setSearchInput("");
    setSelectedYear("");
    setSelectedCategory("");
    setFilteredSubjects(subjectAll);
  };

  if (userRole !== "1") {
    showAlert();
    return null;
  }

  const times = [
    "7.00-7.30",
    "7.30-8.00",
    "8.00-8.30",
    "8.30-9.00",
    "9.00-9.30",
    "9.30-10.00",
    "10.00-10.30",
    "10.30-11.00",
    "11.00-11.30",
    "11.30-12.00",
    "12.00-12.30",
    "12.30-13.00",
    "13.00-13.30",
    "13.30-14.00",
    "14.00-14.30",
    "14.30-15.00",
    "15.00-15.30",
    "15.30-16.00",
    "16.00-16.30",
    "16.30-17.00",
    "17.00-17.30",
    "17.30-18.00",
    "18.00-18.30",
    "18.30-19.00",
    "19.00-19.30",
    "19.30-20.00",
    "20.00-20.30",
    "20.30-21.00",
    "21.00-21.30",
    "21.30-22.00",
  ];

  const days = [
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
    "อาทิตย์",
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
                {year === '5' ? 'ชั้นปี 4 ขึ้นไป' : `ชั้นปี ${year}`}
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
            <label className="text-white text-base cursor-pointer">รีเซ็ต</label>
            <TimerResetIcon size={21} color="white" className="ml-1" />
          </button>
        </div>

        <div className="flex-row flex mt-2 ml-2 items-end">
          <div
            className={`transition-all w-8 h-8 mr-2 ${isTeacher ? "bg-green-400" : "bg-pink-400"
              }`}
          ></div>
          <label className="ptext-shadow mb-1">
            {isTeacher ? "ผ่าน" : "บังคับ"}
          </label>
        </div>

        <div className="flex flex-row ml-2 items-end">
          <div
            className={`transition-all w-8 h-8 mr-2 ${isTeacher ? "bg-red-500" : "bg-yellow-400"
              }`}
          ></div>
          <label className="ptext-shadow mb-1">
            {isTeacher ? "ไม่ผ่าน" : "เฉพาะเลือก"}
          </label>
        </div>

        <div className="flex flex-row ml-2 items-end">
          <div
            className={`transition-all w-8 h-8 mr-2 ${isTeacher ? "bg-orange-500" : "bg-cyan-400"
              }`}
          ></div>
          <label className="ptext-shadow mb-1">
            {isTeacher ? "รอพิจารณา" : "เลือก"}
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
            {isTeacher ? 'MY SCHEDULE' : 'GLOBAL SCHEDULE'}
          </label>
        </div>
      </div>

      <div className="flex">
        <table className=" mt-0 border-collapse border border-gray-400 shadow-md">
          <thead>
            <tr classNa me="bg-gray-200">
              <th className="border border-gray-400 py-2 px-4"></th>
              {times.map((time, index) => (
                <th key={index} className="border border-gray-400 py-2 px-2">
                  <div className="text-xs">
                    {time.split("-").map((part, idx) => (
                      <div key={idx}>{part}</div>
                    ))}
                  </div>
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
                {times.map((_, timeIndex) => (
                  <td
                    key={timeIndex}
                    className="border border-gray-400 py-2 px-2"
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
              <th className="py-2 font-light text-base">แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((subject, index) => (
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
                    <span>
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
                    <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-3">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
