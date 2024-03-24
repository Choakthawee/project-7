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
import { Link } from "react-router-dom";
const RegResultED = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("registered");
  const [subjectssuccess, setSubjectssuccess] = useState();
  const [subjectsnotsuccess, setSubjectnotssuccess] = useState();
  const [countsub, setCountsub] = useState();
  const [noneRegisterSubject, setNoneRegisterSubject] = useState();
  const [noneRegisterSubjectError, setNoneRegisterSubjectError] = useState();
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
  //next and prev 2
  const [currentPage2, setCurrentPage2] = useState(1);
  const subjectsPage2 = 6;
  const totalPages2 = noneRegisterSubject
    ? Math.ceil(noneRegisterSubject.length / subjectsPage2)
    : 1;
  const startIndex2 = (currentPage2 - 1) * subjectsPage2;
  const endIndex2 = startIndex2 + subjectsPage2;
  const currentsubjects2 = noneRegisterSubject
    ? noneRegisterSubject.slice(startIndex2, endIndex2)
    : [];

  const handleNextPage2 = () => {
    if (currentPage2 < totalPages2) {
      setCurrentPage2((prevPage2) => prevPage2 + 1);
    }
  };

  const handlePrevPage2 = () => {
    if (currentPage2 > 1) {
      setCurrentPage2((prevPage2) => prevPage2 - 1);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    const show_regresult = async () => {
      try {
        const Data = await axios.get(
          apiurl + "/api/education/noneRegisterSubject"
        );
        const data1 = Data.data;
        console.log(data1);
        setNoneRegisterSubject(data1);
      } catch (error) {
        setNoneRegisterSubjectError(error.response.data.msg);
      }
    };
    show_regresult();
  }, []);
  useEffect(() => {
    const show_regresult = async () => {
      try {
        const Data = await axios.get(apiurl + "/api/edu/subjectReg");
        const subjectssuccess = Data.data;
        console.log(subjectssuccess);
        setSubjectssuccess(subjectssuccess);
      } catch (error) {
        setSubjectnotssuccess(error.response.data.msg);
      }
    };
    show_regresult();
  }, []);
  useEffect(() => {
    const getapi = async () => {
      try {
        const data1 = await axios.get(apiurl + "/api/subjecthasregiscount");
        const data = data1.data;
        setCountsub(data[0]);
        console.log(data);
      } catch (err) { }
    };
    getapi();
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
  const [redirectUrl, setRedirectUrl] = useState('');
  if (userRole !== "3") {
    showAlert();
    return null;
  }
  async function exportfiles() {
    if (countsub) {
      if (countsub.subjectcont === countsub.allopen) {
        try {
          const data = await axios.get(apiurl + "/api/export/file")
          const redirectUrl = data.request.responseURL;
          // อัพเดท state ให้มีค่า URL สำหรับ redirect
          window.location.href = redirectUrl;
        } catch (error) {
          Swal.fire({ icon: "error", text: error.response.data.msgerror })
        }
      } else {
        Swal.fire({ icon: "error", text: "คนลงทะเบียนไม่คบ" })
      }
    }
  }
  return (
    <div className="flex w-full bged p-2 md:p-5 lg:p-10 min-h-screen">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex relative">
          <p className="flex font-family font-bold text-4xl size-30  text-midgreen h1text-shadow ">
            ผลการลงทะเบียน
          </p>
        </div>
        <div className="flex mt-10">
          <div className="flex flex-col lg:flex-row  lg:items-center text-xl justify-between w-full">
            <div className="flex gap-2 flex-col lg:flex-row">
              <p className="textinsert font-bold">
                จำนวนวิชาที่ลงทะเบียนแล้ว {countsub && countsub.subjectcont}/
                {countsub && countsub.allopen}
              </p>

              <p className="textinsert font-bold ">
                จำนวนวิชาที่ยังไม่ได้ลงทะเบียน{" "}
                {countsub && countsub.allopen - countsub.subjectcont}/
                {countsub && countsub.allopen}
              </p>
            </div>
            <div className="flex gap-2">
              <label className="">
                <input
                  type="radio"
                  value="registered"
                  checked={selectedOption === "registered"}
                  onChange={handleOptionChange}
                />
                วิชาที่ลงทะเบียนที่ผ่านแล้ว
              </label>
              <label>
                <input
                  type="radio"
                  value="unregistered"
                  checked={selectedOption === "unregistered"}
                  onChange={handleOptionChange}
                />
                วิชาที่ยังไม่ได้ลงทะเบียน
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-7 flex-col">
          {selectedOption === "registered" && (
            <div className="flex flex-4 items-center justify-center content-center">
              {subjectsnotsuccess ? (
                <p className="text-2xl text-red-700 text-center  underline">
                  ไม่พบข้อมูลในระบบ
                </p>
              ) : subjectssuccess ? (
                subjectssuccess.length > 0 ? (
                  <div className="flex flex-1 bg-slate-200 rounded-lg overflow-x-auto shadow-xl h-full overflow-y-auto">
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
                          <th className="py-2 font-light text-xl">
                            จำนวนนิสิต
                          </th>
                          <th className="py-2 font-light text-xl">
                            สาขาชั้นปีที่เปิดรับ
                          </th>
                          <th className="py-2 font-light text-xl">วันที่สอน</th>
                          <th className="py-2 font-light text-xl">
                            เวลาที่สอน
                          </th>
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
                  "ไม่พบข้อมูลในระบบ"
                )
              ) : (
                "ไม่พบข้อมูลในระบบ"
              )}
            </div>
          )}

          {selectedOption === "unregistered" && (
            <div className="flex flex-4 items-center justify-center content-center">
              {noneRegisterSubjectError ? (
                <div>{noneRegisterSubjectError}</div>
              ) : noneRegisterSubject ? (
                noneRegisterSubject.length > 0 ? (
                  <div className="flex flex-1 bg-slate-200 rounded-lg overflow-x-auto shadow-xl h-full overflow-y-auto">
                    <table className=" w-full">
                      <thead>
                        <tr className="column-color1 text-white">
                          <th className="py-2 font-light text-xl">#</th>
                          <th className="py-2 font-light text-xl">รหัสวิชา</th>
                          <th className="py-2 font-light text-xl">ชื่อวิชา</th>
                          <th className="py-2 font-light text-xl">หน่วยกิต</th>
                          <th className="py-2 font-light text-xl">หมู่เรียน</th>
                          <th>เพิ่ม</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentsubjects2.map((value, index) => (
                          <tr>
                            <td className="py-2 font-light text-lg text-center">
                              {startIndex2 + index + 1}
                            </td>
                            <td className="py-2 font-light text-lg text-center">
                              {value.idsubject}
                            </td>
                            <td className="py-2 font-light text-lg text-center">
                              {value.name}
                            </td>
                            <td className="py-2 font-light text-lg text-center">
                              {value.credit}
                            </td>
                            <td className="py-2 font-light text-lg text-center">
                              {value.category_name}
                            </td>
                            <td className=" underline hover:bg-slate-300 text-center">
                              <Link to={"/regcoursefore/" + value.id}>
                                ลงทะเบียน
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          )}
          <div className="flex flex-1 justify-center">
            <button
              onClick={() => {
                if (selectedOption === "unregistered") {
                  handlePrevPage2();
                } else {
                  handlePrevPage();
                }
              }}
            >
              <FaCircleLeft size={21} color="#0a6765" className="mr-3 mt-8" />
            </button>
            {selectedOption === "unregistered" ? (
              <p className="text-lg font-semibold text-midgreen  mt-8">
                หน้า {currentPage2} จาก {totalPages2}
              </p>
            ) : (
              <p className="text-lg font-semibold text-midgreen  mt-8">
                หน้า {currentPage} จาก {totalPages}
              </p>
            )}

            <button
              onClick={() => {
                if (selectedOption === "unregistered") {
                  handleNextPage2();
                } else {
                  handleNextPage();
                }
              }}
            >
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
                onClick={() => { exportfiles() }}
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
