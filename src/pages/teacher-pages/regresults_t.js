//ผลการลงทะเบียน (อาจารย์)
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import SearchingBar from "../component/searchBar";
import CourseYears from "../component/courseyear";
import Category_sub from "../component/category_sub";
import ButtonSeaching from "../component/buttonSearching";
import SortBar from "../component/sortBar";
import axios from "axios";
import { apiurl } from "../../config";
const RegResultT = () => {
  const userRole = localStorage.getItem("role_id");
  const userID = localStorage.getItem("userid");
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([{}]);
  const [showsubject, setShowsubject] = useState([{}]);
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
          apiurl + "/api/statusRegisteredpro1/" + userID
        );
        const datasubject = response.data;
        console.log(datasubject.message);
        setShowsubject(datasubject.message);

        // Now you can use datasubject in the rest of your code
      } catch (error) {
        setShowsubject(error);
        console.error(error);
      }
    };
    showSubject();
  }, []);

  const showSweetAlertWithInput = async () => {
    const { value: day } = await Swal.fire({
      title: "เปลี่ยนแปลงวัน",
      input: "select",
      inputOptions: {
        จันทร์: "จันทร์",
        อังคาร: "อังคาร",
        พุธ: "พุธ",
        พฤหัสบดี: "พฤหัสบดี",
        ศุกร์: "ศุกร์",
        เสาร์: "เสาร์",
        อาทิตย์: "อาทิตย์",
      },
      inputPlaceholder: "เลือกวันที่จะสอน",
      showCancelButton: true,
      confirmButtonColor: "green",
      confirmButtonText: "ยืนยัน",
      cancelButtonColor: "red",
      cancelButtonText: "ยกเลิก",
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value !== "") {
            resolve();
          } else {
            resolve("Please select a day.");
          }
        });
      },
    });

    if (day) {
      const { value: startTime } = await Swal.fire({
        title: "เปลี่ยนแปลงเวลาเริ่มสอน",
        input: "time",
        inputPlaceholder: "Select a time",
        showCancelButton: true,
        confirmButtonColor: "green",
        confirmButtonText: "ยืนยัน",
        cancelButtonColor: "red",
        cancelButtonText: "ยกเลิก",
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value !== "") {
              resolve();
            } else {
              resolve("Please select a time.");
            }
          });
        },
      });

      if (startTime) {
        // Prompt for the end time
        const { value: endTime } = await Swal.fire({
          title: "เปลี่ยนแปลงเวลาสิ้นสุดการสอน",
          input: "time",
          inputPlaceholder: "Select a time",
          showCancelButton: true,
          confirmButtonColor: "green",
          confirmButtonText: "ยืนยัน",
          cancelButtonColor: "red",
          cancelButtonText: "ยกเลิก",
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value !== "") {
                resolve();
              } else {
                resolve("Please select a time.");
              }
            });
          },
        });

        if (day && startTime && endTime) {
          const message = `วันที่สอน: ${day} 
          <br>เวลาเริ่มสอน: ${startTime} นาฬิกา
          <br>เวลาสิ้นสุดการสอน: ${endTime} นาฬิกา
          <br>`;

          Swal.fire({
            title: "สรุปการเปลี่ยนวันเวลา",
            html: message,
            confirmButtonColor: "green",
            confirmButtonText: "ยืนยัน",
          });
        }
      }
    }
  };
  const [searchInput, setSearchInput] = useState("");
  if (userRole !== "1") {
    showAlert();
    return null;
  }
  return (
    <div className="flex w-full h-full min-h-screen background21">
      <div className="flex w-full flex-col p-2 md:p-10 gap-3">
        <div className="flex relative">
          <p className="flex font-family font-bold text-4xl size-30  text-midgreen h1text-shadow">
            ผลการลงทะเบียน
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          <SortBar
            url="/api/Searchsubjectopen/"
            url1="/api/searchingbar"
            setCurrent={setSubjects}
            data={subjects}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex">
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
                  </tr>
                </thead>

                <tbody>
                  {showsubject.map((value, index) => (
                    <tr>
                      <td className="py-2 font-light text-lg text-center">
                        {index + 1}
                      </td>
                      <td className="py-2 font-light text-lg text-center">
                        {value.name}
                      </td>
                      <td className="py-2 font-light text-lg text-center">
                        {value.day_name}
                      </td>
                      <td className="py-2 font-light text-lg text-center">
                        {value.st.slice(0, -3)}-{value.et.slice(0, -3)}
                      </td>
                      <td className="py-2 font-light text-lg text-center">
                        {value.status_id}
                      </td>
                      <td className="py-2 font-light text-lg text-center">
                        {value.status_id === 3 ? "" : "-"}
                      </td>
                      <td className="py-2 font-light text-lg text-center">
                        <div className="flex items-center me-4 justify-center">
                          <button
                            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-3"
                            onClick={showSweetAlertWithInput}
                          >
                            แก้ไขข้อมูล
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className=" flex h-full items-end">
          <div className="flex flex-1 justify-center">
            <button>
              <FaCircleLeft size={21} color="#0a6765" className="mr-3 mt-8" />
            </button>
            <p className="text-lg font-semibold text-midgreen  mt-8">
              หน้า 1 จาก 1
            </p>
            <button>
              <FaCircleRight size={21} color="#0a6765" className="ml-3 mt-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegResultT;
