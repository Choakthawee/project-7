import "./regresults_ed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { apiurl } from "../../config";
import { useEffect, useState } from "react";
const RegResultED = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();
  const [subjectssuccess, setSubjectssuccess] = useState();
  const [subjectsnotsuccess, setSubjectnotssuccess] = useState();
  //next and prev
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPage = 6;
  const totalPages = subjectssuccess
    ? Math.ceil(subjectssuccess.length / subjectsPage)
    : 1;
  const startIndex = (currentPage - 1) * subjectsPage;
  const endIndex = startIndex + subjectsPage;
  const currentsubjects = subjectssuccess
    ? subjectssuccess.slice(startIndex, endIndex)
    : [];

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
  useEffect(() => {
    const show_regresult = async () => {
      try {
        const Data = await axios.get(apiurl + "/api/edu/subjectReg");
        const subjectssuccess = Data.data;
        console.log(subjectssuccess);
        setSubjectssuccess(subjectssuccess);
      } catch (error) {
        setSubjectnotssuccess(error);
      }
    };
    show_regresult();
  }, []);
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
    return null;
  }

  return (
    <div className="bged">
      <div className="flex flex-1 flex-col ">
        <div className="flex relative">
          <p className="flex font-family font-bold text-4xl size-30  text-midgreen h1text-shadow mt-10 ml-10">
            ผลการลงทะเบียน
          </p>
        </div>
        <div className="flex relative mt-10">
          <div className="flex flex-row flex-1 items-center">
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
            <div className="flex relative ml-5 mt-2">
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
        </div>

        <div className="flex flex-7 flex-col mt-5">
          <div className="flex flex-4 items-center justify-center content-center">
            {subjectssuccess &&
              (subjectsnotsuccess ? (
                <p className="text-2xl text-red-700 text-center  underline">
                  ไม่พบข้อมูลในระบบ
                </p>
              ) : subjectssuccess.length > 0 ? (
                <div className="flex flex-1 ml-10 mr-5 bg-slate-200 rounded-lg overflow-x-auto shadow-xl h-full overflow-y-auto">
                  <table className=" w-full">
                    <thead>
                      <tr className="column-color1 text-white">
                        <th className="py-2 font-light text-xl">#</th>
                        <th className="py-2 font-light text-xl">รหัสวิชา</th>
                        <th className="py-2 font-light text-xl">ชื่อวิชา</th>
                        <th className="py-2 font-light text-xl">หน่วยกิต</th>
                        <th className="py-2 font-light text-xl">หมู่เรียน</th>
                        <th className="py-2 font-light text-xl">
                          อาจารย์ผู้สอน
                        </th>
                        <th className="py-2 font-light text-xl">จำนวนนิสิต</th>
                        <th className="py-2 font-light text-xl">
                          สาขาชั้นปีที่เปิดรับ
                        </th>
                        <th className="py-2 font-light text-xl">วันที่สอน</th>
                        <th className="py-2 font-light text-xl">เวลาที่สอน</th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentsubjects.map((value, index) => (
                        <tr>
                          <td className="py-2 font-light text-lg text-center">
                            {startIndex + index + 1}
                          </td>
                          <td className="py-2 font-light text-lg text-center">
                            {value.idSubject}
                          </td>
                          <td className="py-2 font-light text-lg text-center">
                            {value.SUBJECT}
                          </td>
                          <td className="py-2 font-light text-lg text-center">
                            {value.credit}
                          </td>
                          <td className="py-2 font-light text-lg text-center">
                            {value.sec}
                          </td>
                          <td className="py-2 font-light text-lg text-center">
                            {value.NAME}
                          </td>
                          <td className="py-2 font-light text-lg text-center">
                            {value.N_people}
                          </td>
                          <td className="py-2 font-light text-lg  justify-center flex gap-1 hover:text-green-600 transition-all underline  cursor-pointer">
                            <div
                              onClick={() => {
                                let stringdata = "";
                                Object.keys(value.branch).forEach(
                                  (key, keyIndex) => {
                                    const items = value.branch[key];
                                    items.forEach((item, index) => {
                                      stringdata += `${key}-${index + 1}`;
                                      if (index !== items.length - 1) {
                                        stringdata += ", ";
                                      } else if (
                                        keyIndex !==
                                        Object.keys(value.branch).length - 1
                                      ) {
                                        stringdata += "\n";
                                      }
                                    });
                                  }
                                );
                                Swal.fire({
                                  title: "สาขาชั้นปีที่เปิดรับ",
                                  text: stringdata,
                                  showCloseButton: true,
                                });
                              }}
                            >
                              {Object.keys(value.branch)
                                .map((key) => {
                                  const items = value.branch[key];
                                  if (items.length <= 2) {
                                    return items.map((item, index) => (
                                      <span
                                        key={key + "-" + (index + 1)}
                                        className="py-2 font-light text-lg text-center"
                                      >
                                        {key}-{index + 1}
                                      </span>
                                    ));
                                  } else {
                                    return [
                                      <span
                                        key={key + "-1"}
                                        className="py-2 font-light text-lg text-center"
                                      >
                                        {key}-1
                                      </span>,
                                      <span
                                        key={key + "-2"}
                                        className="py-2 font-light text-lg text-center"
                                      >
                                        {key}-2
                                      </span>,
                                      <span
                                        key={key + "-more"}
                                        className="py-2 font-light text-lg text-center"
                                      >
                                        ...
                                      </span>,
                                    ];
                                  }
                                })
                                .flat()}
                            </div>
                          </td>
                          <td className="py-2 font-light text-lg text-center">
                            {value.day}
                          </td>
                          <td className="py-2 font-light text-lg text-center">
                            {value.st && value.et
                              ? `${value.st.slice(0, -3)}-${value.et.slice(
                                  0,
                                  -3
                                )}`
                              : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                ""
              ))}
          </div>

          <div className="flex flex-1 justify-center">
            <button onClick={handlePrevPage}>
              <FaCircleLeft size={21} color="#0a6765" className="mr-3 mt-8" />
            </button>
            <p className="text-lg font-semibold text-midgreen  mt-8">
              หน้า {currentPage} จาก {totalPages}
            </p>
            <button onClick={handleNextPage}>
              <FaCircleRight size={21} color="#0a6765" className="ml-3 mt-8" />
            </button>
          </div>

          <div className="flex felx-1 justify-end">
            <div className="flex relative ml-5 mt-5 mr-10">
              <button
                type="button"
                class="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                style={{
                  backgroundColor: "#134e4a",
                  width: 190,
                  height: 45,
                }}
              >
                <p className="text-lg mr-2">นำออกไฟล์ xlsx</p>
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
export default RegResultED;
