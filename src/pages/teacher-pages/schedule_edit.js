//แก้ไขรายวิชา หน้าตารางสอน (อาจารย์)
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faPlus,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { RiEdit2Fill } from "react-icons/ri";
import React, { useState } from "react";
import "./reg-set.css";

const ScheduleEdit = () => {
  const userRole = localStorage.getItem("role");
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
        if (userRole === "admin") {
          navigate("/userinfo");
        } else if (userRole === "education department") {
          navigate("/imcourse");
        }
      }
    });
  };

  if (userRole !== "teacher") {
    showAlert();
    return null;
  }
  return (
    <div className="background ">
      <div className="flex flex-1 relative border-4 border-solid border-green-500 items-center">
        <div className="flex flex- w-2/4 h-3/4 rounded-2xl mx-auto my-auto bg-white p-2  ">
          <div
            style={{
              flex: 1,
              // borderColor: "orange",
              // borderWidth: 5,
              height: 50,
            }}
            className=" flex flex-col  font-family mt-7 ml-5"
          >
            <button
              type="button"
              class="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-4 py-2.5 me-1 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              style={{
                backgroundColor: "#134e4a",
                width: 90,
                height: 40,
              }}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="mr-1"
                style={{ fontSize: "16px" }}
              />
              <p className="text-lg text-center"> back </p>
            </button>
          </div>
          <div className="flex flex-1 flex-col  relative border-4 border-solid border-green-500 mt-7 mr-56  ">
            <div className="flex">
              <p className="text-2xl font-bold text-midgreen mt-1">ตารางสอน</p>
            </div>
            <div className="flex flex-col mt-3">
              <label className="text-midgreen mb-1">ชื่อรายวิชาที่สอน *</label>
              <input className="focus:outline-none rounded-sm h-8 bg-gray-200"></input>
            </div>
            <div className="flex  mr-3 mt-1">
              <label className="text-midgreen mb-1">รหัสวิชา :</label>
            </div>
            <div className="flex  mr-3 mt-1">
              <label className="text-midgreen mb-1"> จำนวนหน่วยกิต :</label>
            </div>
            <div className="flex  mr-3 mt-1">
              <label className="text-midgreen mb-1">หมวดวิชา :</label>
            </div>
            <div className="flex  mr-3 mt-1">
              <label className="text-midgreen mb-1">
                เพิ่มหมู่เรียน :
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  className="ml-2"
                  style={{ fontSize: "16px" }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScheduleEdit;
