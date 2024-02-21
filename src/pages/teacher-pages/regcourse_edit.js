//ใส่ข้อมูลลงทะเบียนรายวิชา (อาจารย์)
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import React, { useState } from "react";
import "./reg-set.css";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegCourseEdit = () => {
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

  const handleSwab = () => {
    navigate("/regcourse");
  };

  return (
    <div className="background">
      <div className="mt-10 ml-10">
        <div className="flex justify-end text-inbox">
          <button
            className="mt-10 mr-40 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center "
            style={{
              backgroundColor: "#134e4a",
              width: 140,
              height: "fit-content",
              textDecoration: "none",
            }}
            onClick={() => handleSwab()}
          >
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              style={{
                fontSize: "24px",
                marginRight: "5px",
              }}
            />
            ย้อนกลับ
          </button>
        </div>
        <div className="box-1 bg-white rounded"></div>
        <h1>RegCourseEdit</h1>
      </div>
    </div>
  );
};
export default RegCourseEdit;
