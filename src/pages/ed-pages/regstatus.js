import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { EditIcon } from "lucide-react";
import axios from "axios";
import React from "react";

const RegStatus = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("required");
  const [selectedProb, setSelectedProb] = useState("");
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4133/api/subject_category')
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
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
    <div
      className="flex-col flex py-10 px-10 bg-white flex-1 h-screen"
      style={{ backgroundColor: "#cce3de" }}
    >
      <div className="flex">
        <p className="text-4xl font-bold h1text-shadow text-midgreen">
          ตรวจสอบการลงทะเบียน
        </p>
      </div>

      <div className="flex flex-row justify-end">
        {category.map((item, index) => (
          <React.Fragment key={index}>
            <label className="mr-2" htmlFor={item.value}>
              {item.name}
            </label>
            <input
              className="mr-2"
              type="radio"
              name="subject_type"
              value={item.value}
              checked={selectedSubject === item.value}
              onChange={() => setSelectedSubject(item.value)}
              id={item.value}
            />
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-row justify-end mt-3">
        <label className="mr-2" for="wait">
          รอยืนยัน
        </label>
        <input
          className="mr-2"
          type="radio"
          name="prob_type"
          value="wait"
          checked={selectedProb === "wait"}
          onChange={() => setSelectedProb("wait")}
        />

        <label className="mr-2" for="prob">
          วิชาที่ติดปัญหา
        </label>
        <input
          className="mr-2"
          type="radio"
          name="prob_type"
          value="prob"
          checked={selectedProb === "prob"}
          onChange={() => setSelectedProb("prob")}
        />
      </div>

      <div className="flex flex-1 bg-slate-200 mt-5 rounded-lg overflow-x-auto shadow-xl">
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
              <th className="py-2 font-light text-base">หมายเหตุ</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};
export default RegStatus;
