import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { EditIcon } from "lucide-react";
import axios from "axios";
import React from "react";
import { apiurl } from "../../config";

const RegStatus = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("required");
  const [category, setCategory] = useState([]);
  const [chstatus, setchStatus] = useState([]);
  const [subjectReg, setSubjectReg] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    axios.get(apiurl + '/api/eu/allRegister')
      .then((response) => {
        setSubjectReg(response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching data', error)
      })
  }, [])

  useEffect(() => {
    axios.get(apiurl + '/api/all/status')
      .then((response) => {
        setchStatus(response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching data', error)
      })
  }, [])

  useEffect(() => {
    axios
      .get(apiurl + '/api/subject_category')
      .then((response) => {
        console.log(response.data)
        setCategory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleEdit = (subject) => {
    if (subject.status_id === 2) {
      const branchNames = subject.branch.t12.map(item => `T12-${item}`).join(", ");
      Swal.fire({
        title: `<span style="color: #246705;"> วิชา </span> <span style="color: red;">${subject.SUBJECTNAME}</span> <span style="color: #246705;"> รหัสวิชา </span> <span style="color: red;">${subject.Subjects_id}</span>`,
        html: `
          <div>
            <p><strong>อาจารย์ผู้สอน :</strong> ${subject.USERNAME}</p>
            <p><strong>หมู่เรียน :</strong> ${subject.sec}</p>
            <p><strong>จำนวนหน่วยกิต :</strong> ${subject.credit}</p>
            <p><strong>จำนวนนิสิต :</strong> ${subject.N_people}</p>
            <p><strong>สาขาที่เปิดรับ :</strong> ${branchNames}</p>
            <p><strong>สอนวัน :</strong> ${subject.DAYNAME}</p>
            <p><strong>เวลา :</strong> ${subject.st} - ${subject.et}</p>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "#4C956C",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
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
            <label className="mr-2" htmlFor={item.id}>
              {item.name}
            </label>
            <input
              className="mr-2"
              type="radio"
              name="category"
              value={item.id}
              checked={selectedCategory === item.id}
              onChange={() => setSelectedCategory(item.id)}
              id={item.id}
            />
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-row justify-end">
        {chstatus.map((item, index) => (
          <React.Fragment key={index}>
            <label className="mr-2" htmlFor={item.id}>
              {item.name}
            </label>
            <input
              className="mr-2"
              type="radio"
              name="status"
              value={item.id}
              checked={selectedStatus === item.id}
              onChange={() => setSelectedStatus(item.id)}
              id={item.id}
            />
          </React.Fragment>
        ))}
      </div>

      <div className="flex bg-slate-200 mt-5 rounded-lg overflow-x-auto shadow-xl">
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
              <th className="py-2 font-light text-base border-r-black border-x-2 border-opacity-10">หมายเหตุ</th>
              <th className="py-2 font-light text-base">แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {subjectReg.length > 0 && subjectReg
              .filter(subject =>
                (selectedCategory === "" || subject.category_id === selectedCategory) &&
                (selectedStatus === "" || subject.status_id === selectedStatus)
              )
              .map((subject, index) => (
                <tr key={index} className={
                  (index) % 2 === 0 ? "bg-gray-100" : "bg-white"
                }>
                  <td className="py-2 font-normal text-lg text-center">{index + 1}</td>
                  <td className="py-2 font-normal text-lg text-center">{subject.Subjects_id}</td>
                  <td className="py-2 font-normal text-lg text-center">{subject.SUBJECTNAME}</td>
                  <td className="py-2 font-normal text-lg text-center">{subject.credit}</td>
                  <td className="py-2 font-normal text-lg text-center">{subject.CATEGORYNAME}</td>
                  <td className="py-2 font-normal text-lg text-center">{subject.USERNAME}</td>

                  <td className="py-2 font-normal text-lg text-center">{subject.N_people}</td>
                  <td className="py-2 font-normal text-lg text-center">
                    {subject.branch.t12.map((item, index) => (
                      <span>
                        {index > 0 && ", "}
                        T12-{item}
                      </span>
                    ))}
                  </td>
                  <td className="py-2 font-normal text-lg text-center">{subject.DAYNAME}</td>
                  <td className="py-2 font-normal text-lg text-center">{subject.st}-{subject.et}</td>
                  <td className={`py-2 font-normal text-lg text-center ${subject.STATUSNAME === "รอ" ? "text-orange-400" : subject.STATUSNAME === "ไม่ผ่าน" ? "text-red-500" : "text-green-400"}`}>{subject.STATUSNAME}</td>
                  <td >
                    <EditIcon
                      size={24}
                      className="cursor-pointer self-center"
                      onClick={() => handleEdit(subject)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RegStatus;
