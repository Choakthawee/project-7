//ลงทะเบียนรายวิชา (อาจารย์)
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { RiEdit2Fill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import "./reg-set.css";
import axios from "axios";
import { apiurl } from "../../config";
import { LockIcon } from "lucide-react";

const RegCourse = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();

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
  const [subjects, setSubjects] = useState([]);
  const [noneSubject, setNoneSubject] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPage = 7;
  const totalPages = Math.ceil(subjects.length / subjectsPage);
  const startIndex = (currentPage - 1) * subjectsPage;
  const endIndex = startIndex + subjectsPage;

  useEffect(() => {
    async function getSubject() {
      try {
        const responseData = await axios.get(apiurl + "/api/teacher/subjests")
        const data = responseData.data;
        setSubjects(data);
        console.log(data.results)
      } catch (err) {
        setNoneSubject(err.response.data);
      }
    }
    getSubject();
  }, [])
  const currentsubjects = subjects.msg
    ? []
    : subjects.results ? subjects.results.slice(startIndex, endIndex) : [];
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
  const handleSwab = (v) => {
    navigate("/regcourse_edit/" + v.id);
  };

  // const [statusSem, setSemStatus] = useState(1);
  // const [statusYear, setYearStatus] = useState(1);
  // const [statusSyl, setSylStatus] = useState(1);
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
  //   if (e.target.value === "2566") {
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

  // const handleSylStatusChange = (e) => {
  //   setSylStatus(e.target.value);
  //   if (e.target.value === "2566") {
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

  if (userRole !== "1") {
    showAlert();
    return null;
  }
  return (
    <div className="flex flex-auto overflow-hidden h-screen background21">
      <div className="flex-1 flex flex-col p-10 gap-5">
        <h1 className="flex  font-family font-bold text-4xl size-30 text-midgreen h1text-shadow">
          ลงทะเบียนรายวิชา
        </h1>
        <div className="flex">
          <div className="flex font-family text-xl font-medium">
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
            style={{
              flex: 4,
            }}
            className="flex font-family text-xl font-medium ml-2"
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
          }}
        >
          <div
            style={{
              flex: 4,
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
          <div className="flex flex-1 font-family font-medium ml-7 flex-col">
            <div>
              <p className="text-sm font-medium mb-2">หลักสูตร</p>
            </div>
            <div style={{ position: "relative" }}>
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 140, height: 40 }}
              // value={statusSyl}
              // onChange={handleSylStatusChange}
              >
                <option value="" disabled selected hidden>
                  ---
                </option>
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
          <div className="flex flex-1 font-family font-medium ml-7 flex-col"
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
        {noneSubject.msgerrortime ?
          <div className=" text-2xl text-red-700 text-center underline">{noneSubject.msgerrortime}</div> :
          <div className="flex flex-col gap-2">
            <h1 className=" h1text-shadow text-xl">{subjects.msgtime &&`*${subjects.msgtime}`}</h1>
            <div className="flex flex-1 bg-slate-200 rounded-lg overflow-x-auto shadow-xl">
              <table className="h-full w-full">
                <thead>
                  <tr className="column-color1 text-white">
                    <th className="py-2 font-light text-xl">#</th>
                    <th className="py-2 font-light text-xl">รหัสวิชา</th>
                    <th className="py-2 font-light text-xl">ชื่อวิชา</th>
                    <th className="py-2 font-light text-xl">หลักสูตร</th>
                    <th className="py-2 font-light text-xl">หมวดวิชา</th>
                    <th className="py-2 font-light text-xl">ลงทะเบียน</th>
                  </tr>
                </thead>

                {currentsubjects.map((v, i) => (
                  <tbody key={startIndex + i}

                    className={
                      (startIndex + i) % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }
                  >
                    <td className="py-2 font-light text-lg text-center">{i + 1}</td>
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
                      {v.subject_category}
                    </td>
                    <td className="py-2 font-light text-lg text-center">
                      <button
                        className="text-green-950 py-1 px-2 rounded-md font-light"
                        onClick={() => {
                          subjects.msgtime ? Swal.fire({
                            icon: "warning", "text": subjects.msgtime, title: "ข้อผิดพลาด",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "ตกลง",
                          }) : handleSwab(v)
                        }}
                      >
                        {subjects.msgtime ? <LockIcon></LockIcon> : <RiEdit2Fill size={20} />}
                      </button>
                    </td>
                  </tbody>
                ))}

              </table>
             
            </div>
            <h1 className="text-center text-xl">{noneSubject.msgerror}</h1>
          </div>
        }

      </div>
    </div>
  );
};
export default RegCourse;
