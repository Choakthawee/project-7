//ผลการลงทะเบียน (อาจารย์)
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import SortBar from "../component/sortBar";
import axios from "axios";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { apiurl } from "../../config";
import { RiEdit2Fill } from "react-icons/ri";
const RegResultT = () => {
  const userRole = localStorage.getItem("role_id");
  const userID = localStorage.getItem("userid");
  const navigate = useNavigate();
  const [showsubject, setShowsubject] = useState([{}]);
  const [noneSubject, setNoneSubject] = useState();
  const [correctsubject, setCorrectsubject] = useState([{}]);
  //next and prev
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPage = 8;
  const totalPages = showsubject
    ? Math.ceil(showsubject.length / subjectsPage)
    : 1;
  const startIndex = (currentPage - 1) * subjectsPage;
  const endIndex = startIndex + subjectsPage;
  const currentsubjects = showsubject
    ? showsubject.slice(startIndex, endIndex)
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
  useEffect(() => {
    const showSubject = async () => {
      try {
        const response = await axios.get(
          apiurl + "/api/statusRegister/" + userID
        );
        const datasubject = response.data;
        console.log(datasubject.message);
        setShowsubject(datasubject.message);
      } catch (error) {
        setNoneSubject(error);
        // console.error(error);
      }
    };
    showSubject();
  }, []);

  // useEffect(() => {
  //   console.log(id);
  //   console.log(changed);
  //   console.log(changest);
  //   console.log(changeet);
  // }, [changed, changest, changeet]);

  const changeSubject = async (id, input) => {
    try {
      const response = await axios.put(apiurl + "/api/teacher/update_time", {
        idSubject: id,
        st: input.startTime,
        et: input.endTime,
        day: input.day,
        user_id: userID,
      });
      console.log(response);
      setCorrectsubject(response);
    } catch (error) {
      console.log(error);
      const subjectNames = error.response.data.overlappingSubjects?.map(
        (subject) => subject.subject_name
      );

      // ใช้ join() เพื่อรวม subject_name เป็น string โดยคั่นด้วย ', '
      const combinedSubjectNames = subjectNames.join(", ");
      Swal.fire({
        title: "มีวิชาที่ลงทะเบียนเวลานี้แล้ว",
        text: "มีวิชาที่ลงทะเบียนก่อนแล้ว : " + combinedSubjectNames,
      });
    }
  };

  const showSweetAlertWithInput = async (value) => {
    let idd = value;

    const { value: userInput } = await Swal.fire({
      title: "เปลี่ยนแปลงวันและเวลาสอน",
      html: `
        <label for="day">เลือกวันที่จะสอน:</label>
        <select id="day" class="swal2-input">
          <option value="" disabled selected>โปรดเลือก</option>
          <option value="1">จันทร์</option>
          <option value="2">อังคาร</option>
          <option value="3">พุธ</option>
          <option value="4">พฤหัสบดี</option>
          <option value="5">ศุกร์</option>
          <option value="6">เสาร์</option>
          <option value="7">อาทิตย์</option>
        </select><br>
        <label for="startTime">เลือกเวลาเริ่มสอน:</label>
        <select id="startTime" class="swal2-input">
          <option value="" disabled selected>---</option>
          ${generateTimeOptions(7, 22)}
        </select><br>
        <label for="endTime">เลือกเวลาสิ้นสุดการสอน:</label>
        <select id="endTime" class="swal2-input">
          <option value="" disabled selected>---</option>
          ${generateTimeOptions(7, 22)}
        </select>
      `,
      focusConfirm: true,
      confirmButtonColor: "green",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "red",
      showCancelButton: true,
      focusCancel: true,
      preConfirm: async () => {
        const day = document.getElementById("day").value;
        const startTime = document.getElementById("startTime").value;
        const endTime = document.getElementById("endTime").value;

        if (!day || !startTime || !endTime) {
          await Swal.showValidationMessage("กรุณากรอกข้อมูลให้ครบ");
          return false;
        }

        // เช็คว่าเวลาที่เลือกต้องอยู่ในช่วง 7:00 ถึง 22:00
        const startHour = parseInt(startTime.split(":")[0]);
        const endHour = parseInt(endTime.split(":")[0]);

        if (startHour < 7 || endHour > 22) {
          await Swal.showValidationMessage(
            "กรุณาเลือกเวลาในช่วง 7:00 ถึง 22:00 เท่านั้น"
          );
          return false;
        }

        if (startTime === endTime) {
          await Swal.showValidationMessage(
            "เวลาเริ่มสอนและสิ้นสุดการสอนต้องไม่ใช่เวลาเดียวกัน"
          );
          return false;
        }

        if (startTime >= endTime) {
          await Swal.showValidationMessage(
            "เวลาเริ่มสอนต้องน้อยกว่าเวลาสิ้นสุดการสอน"
          );
          return false;
        }

        return { day, startTime, endTime };
      },
    });

    function generateTimeOptions() {
      let options = "";
      for (let hour = 7; hour <= 22; hour++) {
        // หยุดการสร้างตัวเลือกเวลาเมื่อชั่วโมงเกิน 22:00
        if (hour === 22) {
          options += `<option value="${padZero(hour)}:00">${padZero(
            hour
          )}:00</option>`;
          break;
        }
        for (let minutes of ["00", "30"]) {
          options += `<option value="${padZero(hour)}:${minutes}">${padZero(
            hour
          )}:${minutes}</option>`;
        }
      }
      return options;
    }

    function padZero(num) {
      return num.toString().padStart(2, "0");
    }

    if (userInput) {
      console.log(userInput);
      const { day, startTime, endTime } = userInput;
      const dayNames = {
        1: "จันทร์",
        2: "อังคาร",
        3: "พุธ",
        4: "พฤหัสบดี",
        5: "ศุกร์",
        6: "เสาร์",
        7: "อาทิตย์",
      };

      const selectedDayName = dayNames[day];

      const message = `วันที่สอน: ${selectedDayName} 
      <br>เวลาเริ่มสอน: ${startTime} นาฬิกา
      <br>เวลาสิ้นสุดการสอน: ${endTime} นาฬิกา
      <br>`;

      Swal.fire({
        title: "สรุปการเปลี่ยนวันเวลา",
        html: message,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
      });

      changeSubject(idd, userInput);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const [searchInput, setSearchInput] = useState("");
  if (userRole !== "1") {
    showAlert();
    return null;
  }
  function Accident({ id }) {
    const [strdata, setStrdata] = useState("");
    const [data, setdata] = useState([]);
    useEffect(() => {
      const getapi = async () => {
        try {
          const response = await axios.get(apiurl + "/api//teacher/f/" + id);
          console.log(response.data);
          setdata(response.data.data);
        } catch (error) {}
      };
      getapi();
    }, []);
    const getswal = () => {
      const formattedData = data.map(
        (entry) => `${entry.subject_name} ${entry.name} ${entry.st}-${entry.et}`
      );
      const result = formattedData.join(", ");

      Swal.fire({ text: result });
    };
    useEffect(() => {
      if (data.length > 0) {
        setStrdata("");
        data.map((v, i) => {
          setStrdata((data) => data + v.subject_name + " ");
        });
      } else {
        setStrdata("loading");
      }
    }, [data]);

    if (strdata === "loading") {
      return (
        <div>
          <div
            className=" underline text-red-500 cursor-pointer font-[700]"
            onClick={getswal}
          >
            กำลังโหลดข้อมูล
          </div>
        </div>
      );
    }

    return (
      <div
        className=" underline text-red-500 cursor-pointer font-[700]"
        onClick={getswal}
      >
        ซ้ำ {strdata.length > 20 ? strdata.slice(0, 20) + "..." : strdata}
      </div>
    );
  }

  const deletesubjectcorrect = async (id) => {
    try {
      const response = await axios.delete(
        apiurl + "/api/teacher/deleteReg/" + id
      );
      const deleteresponse = response.data;
      console.log(deleteresponse);
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาดขณะลบรายวิชา",
        text: "ไม่สามารถดำเนินการลบรายวิชาได้",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex w-full h-full min-h-screen background21">
      <div className="flex w-full flex-col p-2 md:p-10 gap-3">
        <div className="flex relative">
          <p className="flex font-family font-bold text-4xl size-30  text-midgreen h1text-shadow">
            ผลการลงทะเบียน
          </p>
        </div>
        {/* <div className="flex flex-col lg:flex-row gap-3">
          <SortBar
            url="/api/Searchsubjectopen/"
            url1="/api/searchingbar"
            setCurrent={setSubjects}
            data={subjects}
          />
        </div> */}

        <div className="flex flex-col">
          <div className="flex items-center justify-center content-center">
            {showsubject &&
              (noneSubject ? (
                <p className="text-2xl text-red-700 text-center  underline">
                  ไม่พบข้อมูลในระบบ
                </p>
              ) : showsubject.length > 0 ? (
                <div className="flex flex-1 bg-slate-200 rounded-lg overflow-x-auto shadow-xl h-full overflow-y-auto">
                  <table className=" w-full">
                    <thead>
                      <tr className="column-color1 text-white">
                        <th className="py-2 font-light text-xl">#</th>
                        <th className="py-2 font-light text-xl">ชื่อวิชา</th>
                        <th className="py-2 font-light text-xl">วันที่สอน</th>
                        <th className="py-2 font-light text-xl">เวลาที่สอน</th>
                        <th className="py-2 font-light text-xl">สถานะ</th>
                        <th className="py-2 font-light text-xl">หมายเหตุ</th>
                        <th className="py-2 font-light text-xl">แก้ไข</th>
                        <th className="py-2 font-light text-xl">
                          ลบวิชารายวิชา
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentsubjects.map((value, index) => (
                        <tr key={index}>
                          <td className="py-2 font-light text-lg text-center">
                            {startIndex + index + 1}
                          </td>
                          <td className="py-2 font-light text-lg text-center">
                            {value.SUBJECT}
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
                          <td className="py-2 font-light text-lg text-center">
                            {value.status_name}
                          </td>
                          <td className="py-2 font-light text-lg text-center">
                            {value.status_id === 3 ? (
                              <Accident id={value.id} />
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="py-2 font-light text-lg text-center">
                            <div className="flex items-center me-4 justify-center">
                              {value.status_id !== 1 ? (
                                <button
                                  className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-3"
                                  onClick={() =>
                                    showSweetAlertWithInput(value.id)
                                  }
                                >
                                  <RiEdit2Fill size={20} />
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          </td>
                          <td className="py-2 font-light text-lg text-center">
                            <div className="flex items-center me-4 justify-center">
                              <button
                                className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded ml-3"
                                onClick={() => {
                                  Swal.fire({
                                    title: "คุณแน่ใจใช่ไหมที่จะลบ",
                                    text: "ต้องการลบวิชานี้ใช่ไหม",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#0a6765",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "ลบรายวิชา",
                                    cancelButtonText: "ไม่ต้องการลบ",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      deletesubjectcorrect(value.id);
                                      Swal.fire({
                                        title: "คุณได้ลบรายวิชานี้แล้ว!",
                                        text: "ดำเนินการลบสำเร็จ!",
                                        icon: "success",
                                        showCancelButton: false,
                                        showConfirmButton: false,
                                        timer: 1000,
                                        timerProgressBar: true,
                                        allowOutsideClick: false,
                                      });
                                      setTimeout(() => {
                                        window.location.reload();
                                      }, 1000);
                                    }
                                  });
                                }}
                              >
                                <RiDeleteBin5Fill size={20} />
                              </button>
                            </div>
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
        </div>
        <div className=" flex h-full items-end">
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
        </div>
      </div>
    </div>
  );
};
export default RegResultT;
