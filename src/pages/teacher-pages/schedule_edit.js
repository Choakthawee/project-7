import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Secadd from "./secadd";
import axios from "axios";
import { apiurl } from "../../config";

const ScheduleEdit = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();
  const { idreg } = useParams();
  const [subject, setSubject] = useState({});

  useEffect(() => {
    const getapi = async () => {
      const userid = localStorage.getItem("userid");
      try {
        const dataRespone = await axios.get(
          apiurl +
            "/api/teacher/schedule_edit?user_id=" +
            userid +
            "&idreg=" +
            idreg
        );
        const data = dataRespone.data;
        console.log(data);
        setSubject(data);
      } catch (err) {
        alert(err.response.data.msg);
      }
    };
    getapi();
  }, []);

  const handleSwab = () => {
    navigate("/schedule");
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

  if (userRole !== "1") {
    showAlert();
    return null;
  }

  return (
    <div className="flex w-full h-full min-h-screen background21">
      <div className="flex w-full items-center overflow-y-scroll justify-center p-2 lg:p-10">
        <div className="flex w-full md:w-3/4 rounded-3xl bg-white h-full p-5 sm:p-10  ">
          <div className="flex flex-col lg:flex-col w-full">
            <div className="flex">
              <div className="">
                <button
                  type="button"
                  className="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  style={{
                    backgroundColor: "#134e4a",
                    width: 90,
                  }}
                  onClick={handleSwab}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="mr-1"
                    style={{ fontSize: "16px" }}
                  />
                  <p className="text-lg text-center"> Back </p>
                </button>
              </div>
            </div>
            <div className="w-full flex">
              <div>
                <p className="text-2xl font-bold text-midgreen mt-2 p-2">
                  แก้ไขรายวิชา
                </p>
                <div className="flex flex-col ">
                  <label className="text-midgreen mb-1">
                    ชื่อรายวิชาที่สอน *
                  </label>
                  <p className="bg-gray-50  text-wrap border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex p-2.5">
                    {subject.name}
                  </p>
                </div>
                <div className="flex flex-col mt-1">
                  <label className="text-midgreen mb-1">
                    รหัสวิชา : {subject.idsubject}
                  </label>
                  <label className="text-midgreen mb-1">
                    จำนวนหน่วยกิต : {subject.credit}
                  </label>
                  <label className="text-midgreen mb-1">
                    หมวดวิชา : {subject.subc}
                  </label>
                  <label className="text-midgreen mb-1">
                    หมู่เรียน : {subject.category}
                  </label>
                  <label className="text-midgreen mb-1">
                    จำนวนชั่วโมง : {subject.lecture_t}
                  </label>
                </div>
                <Secadd />
                <div className="flex items-center mt-4">
                  <button
                    type="button"
                    className="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    style={{
                      backgroundColor: "#134e4a",
                      width: 80,
                    }}
                    onClick={handleSwab}
                  >
                    <p className="text-lg text-center"> ตกลง </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEdit;
