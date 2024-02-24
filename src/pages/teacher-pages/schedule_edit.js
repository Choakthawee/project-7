import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import Secadd from "./secadd";

const ScheduleEdit = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();

  const [redBoxes, setRedBoxes] = useState([]);

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
        } else if (userRole ==="3") {
          navigate("/imcourse");
        }
      }
    });
  };

  if (userRole !== "1") {
    showAlert();
    return null;
  }

  const handleSwab = () => {
    navigate("/schedule");
  };

  const addRedBox = () => {
    setRedBoxes([...redBoxes, {}]);
  };

  const removeRedBox = (index) => {
    setRedBoxes(redBoxes.filter((_, i) => i !== index));
  };

  return (
    <div className="background">
      <div className="flex flex-1 relative border-4 border-solid border-green-500 items-center overflow-y-scroll">
        <div className="flex w-3/4 rounded-3xl mx-auto my-auto bg-white p-2 ">
          <div
            style={{
              flex: 1,
              height: 50,
            }}
            className="flex flex-col font-family mt-7 ml-5"
          >
            <button
              type="button"
              className="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-4 py-2.5 me-1 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              style={{
                backgroundColor: "#134e4a",
                width: 90,
                height: 40,
              }}
              onClick={() => handleSwab()}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="mr-1"
                style={{ fontSize: "16px" }}
              />
              <p className="text-lg text-center"> back </p>
            </button>
          </div>
          <div className="flex flex-1 flex-col  relative border-4 border-solid border-green-500 mt-7 mr-56">
            <div className="ml-14 mr-80">
              <div className="flex">
                <p className="text-2xl font-bold text-midgreen mt-1">
                  แก้ไขรายวิชา
                </p>
              </div>
              <div className="flex flex-col mt-3">
                <label className="text-midgreen mb-1">
                  ชื่อรายวิชาที่สอน *
                </label>
                <input
                  type="text"
                  id="sub_name"
                  class="bg-gray-50 border w-64 h-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="โปรดระบุวิชาหรือรหัสวิชา"
                  required
                />
              </div>
              <div className="flex mr-3 mt-1">
                <label className="text-midgreen mb-1">รหัสวิชา :</label>
              </div>
              <div className="flex mr-3 mt-1">
                <label className="text-midgreen mb-1"> จำนวนหน่วยกิต :</label>
              </div>
              <div className="flex mr-3 mt-1">
                <label className="text-midgreen mb-1">หมวดวิชา :</label>
              </div>
              <div className="flex mr-3 mt-1">
                <label className="text-midgreen mb-1">
                  เพิ่มหมู่เรียน :
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    className="ml-2"
                    style={{ fontSize: "16px" }}
                    onClick={addRedBox}
                  />
                </label>
              </div>
              {redBoxes.map((_, index) => (
                <div className="flex mr-3 mt-1" key={index}>
                  <Secadd />
                  <button
                    className="ml-2 text-red-500 focus:outline-none"
                    onClick={() => removeRedBox(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEdit;
