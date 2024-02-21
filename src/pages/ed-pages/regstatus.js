import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useState } from "react";
import { EditIcon } from "lucide-react";

const RegStatus = () => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedProb, setSelectedProb] = useState("");

  const showAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'ข้อผิดพลาด',
      text: 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ตกลง'
    }).then((result) => {
      if (result.isConfirmed) {
        if (userRole === "admin") {
          navigate('/userinfo');
        } else if (userRole === "teacher") {
          navigate('/schedule');
        }
      }
    });
  };

  if (userRole !== 'education department') {
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

      <div className="flex flex-row justify-end ">
        <label className="mr-2" for="required">
          วิชาบังคับ
        </label>
        <input
          className="mr-2"
          type="radio"
          name="subject_type"
          value="required"
          checked={selectedSubject === "required"}
          onChange={() => setSelectedSubject("required")}
        />

        <label className="mr-2" for="elective">
          วิชาเฉพาะเลือก
        </label>
        <input
          className="mr-2"
          type="radio"
          name="subject_type"
          value="elective"
          checked={selectedSubject === "elective"}
          onChange={() => setSelectedSubject("elective")}
        />

        <label className="mr-2" for="subelective">
          วิชาเลือก
        </label>
        <input
          className="mr-2"
          type="radio"
          name="subject_type"
          value="subelective"
          checked={selectedSubject === "subelective"}
          onChange={() => setSelectedSubject("subelective")}
        />
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
              <th className="py-2 font-light text-base border-x-black border-x-2">
                #
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                รหัส
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                วิชา
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                หน่วยกิต
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                lec/lab
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                อาจารย์ผู้สอน
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                จำนวนนิสิต
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                ชั้นปีที่เปิดรับ
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                วัน
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
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
