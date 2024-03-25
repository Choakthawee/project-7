import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { EditIcon } from "lucide-react";
import axios from "axios";
import React from "react";
import { apiurl } from "../../config";
import { Link } from "react-router-dom";

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
    axios
      .get(apiurl + "/api/eu/allRegister")
      .then((response) => {
        setSubjectReg(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(apiurl + "/api/all/status")
      .then((response) => {
        setchStatus(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(apiurl + "/api/subject_category")
      .then((response) => {
        console.log(response.data);
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const navtoStatusEdit = (subject) => {
    if (subject.status_id === 3) {
      const duplicatedSubjects = subjectReg.filter(sub => sub.st === subject.st && sub.et === subject.et && sub.DAYNAME === subject.DAYNAME && sub.status_id === 3);
      if (duplicatedSubjects.length > 0) {
        navigate("/regstatus_edit", { state: { subjects: duplicatedSubjects } });
      }
    }
  }

  const handleEdit = (subject) => {
    if (subject.status_id === 2) {
      const branchNames = subject.branch.t12
        .map((item) => `T12-${item}`)
        .join(", ");
      Swal.fire({
        title: `<span style="color: #246705;font-size: 20px;"> วิชา </span> <span style="color: red;font-size: 20px;">${subject.SUBJECTNAME}</span> <span style="color: #246705;font-size: 20px;"> รหัสวิชา </span> <span style="color: red;font-size: 20px;">${subject.Subjects_id}</span>`,
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
          axios
            .post(apiurl + "/api/eu/ubdatestatusregister", {
              id: subject.id,
              status_id: 1,
            })
            .then((response) => {
              console.log(response.data);
              Swal.fire({
                icon: "success",
                title: "ยืนยันสำเร็จ",
                confirmButtonColor: "#4C956C",
                confirmButtonText: "ตกลง",
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000); // รอ 2 วินาทีก่อน reload หน้า
            })
            .catch((error) => {
              console.error("Error updating subject register: ", error);
            });
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
        <label className="mr-2">ทั้งหมด</label>
        <input
          className="mr-2"
          type="radio"
          name="category"
          value="all"
          checked={selectedCategory === "all"}
          onChange={() => setSelectedCategory("all")}
        />
        {category.map((item, index) => (
          <React.Fragment key={index}>
            <label className="mr-2" htmlFor={`category_${item.id}`}>
              {item.name}
            </label>
            <input
              className="mr-2"
              type="radio"
              name="category"
              value={item.id}
              checked={selectedCategory === item.id}
              onChange={() => setSelectedCategory(item.id)}
              id={`category_${item.id}`}
            />

          </React.Fragment>
        ))}
      </div>


      <div className="flex flex-row justify-end">
        <label className="mr-2">ทั้งหมด</label>
        <input
          className="mr-2"
          type="radio"
          name="status"
          value="all"
          checked={selectedStatus === "all"}
          onChange={() => setSelectedStatus("all")}
        />
        {chstatus.map((item, index) => (
          <React.Fragment key={index}>
            <label className="mr-2" htmlFor={`status_${item.id}`}>
              {item.name}
            </label>
            <input
              className="mr-2"
              type="radio"
              name="status"
              value={item.id}
              checked={selectedStatus === item.id}
              onChange={() => setSelectedStatus(item.id)}
              id={`status_${item.id}`}
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
              <th className="py-2 font-light text-base border-r-black border-x-2 border-opacity-10">
                หมายเหตุ
              </th>
              <th className="py-2 font-light text-base">แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {subjectReg.length > 0 &&
              subjectReg
                .filter(
                  (subject) => {
                    if (selectedCategory === "all" && selectedStatus === "all") {
                      return true; // ถ้าเลือก "ทั้งหมด" ให้แสดงทุกข้อมูล
                    } else if (selectedCategory === "all") {
                      return subject.status_id === selectedStatus; // ถ้าเลือก "ทั้งหมด" ของ category แต่ไม่เลือก "ทั้งหมด" ของ status ให้กรองเฉพาะ status
                    } else if (selectedStatus === "all") {
                      return subject.category_id === selectedCategory; // ถ้าเลือก "ทั้งหมด" ของ status แต่ไม่เลือก "ทั้งหมด" ของ category ให้กรองเฉพาะ category
                    } else {
                      return (
                        subject.category_id === selectedCategory &&
                        subject.status_id === selectedStatus
                      ); // กรองตาม category และ status ที่เลือก
                    }
                  })
                .reduce((acc, curr) => {
                  const isStatusThree = curr.status_id === 3;
                  const key = isStatusThree ? `${curr.st}-${curr.et}-${curr.DAYNAME}-${curr.status_id}` : `${curr.id}-${curr.status_id}`;

                  const existingGroupIndex = acc.findIndex(group => group.key === key);

                  if (existingGroupIndex !== -1) {
                    acc[existingGroupIndex].data.push(curr);
                  } else {
                    acc.push({
                      key: key,
                      data: [curr],
                    });
                  }

                  return acc;
                }, [])
                .map((group, index) => (
                  <React.Fragment key={index}>
                    {group.data.map((subject, subIndex) => (
                      <tr
                        key={`${group.key}-${subIndex}`}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="py-2 font-normal text-sm text-center">
                          {index + 1}
                        </td>
                        <td className="py-2 font-normal text-sm text-center">
                          {subject.idsubject}-{subject.years.substring(2)}
                        </td>
                        <td className="py-2 font-normal text-sm text-center">
                          {subject.SUBJECTNAME}
                        </td>
                        <td className="py-2 font-normal text-sm text-center">
                          {subject.credit}
                        </td>
                        <td className="py-2 font-normal text-sm text-center">
                          {subject.CATEGORYNAME}
                        </td>
                        <td className="py-2 font-normal text-sm text-center">
                          {subject.USERNAME}
                        </td>
                        <td className="py-2 font-normal text-sm text-center">
                          {subject.N_people}
                        </td>
                        <td className="py-2 font-normal text-sm text-center">
                          {Object.keys(subject.branch).map((branchKey) => (
                            <div key={branchKey}>
                              <span>{branchKey} : </span>
                              {subject.branch[branchKey].map((item, idx) => (
                                <span key={idx}>
                                  {idx > 0 && ", "}
                                  ชั้นปี {item}
                                </span>
                              ))}
                            </div>
                          ))}
                        </td>
                        <td className="py-2 font-normal text-sm text-center">
                          {subject.DAYNAME}
                        </td>
                        <td className="py-2 font-normal text-sm text-center">
                          {subject.st.substring(0, 5)}-{subject.et.substring(0, 5)} น.
                        </td>
                        <td
                          className={`py-2 font-normal text-sm text-center ${subject.STATUSNAME === "รอ"
                            ? "text-orange-400"
                            : subject.STATUSNAME === "ไม่ผ่าน"
                              ? "text-red-500"
                              : "text-green-400"
                            }`}
                        >
                          {subject.STATUSNAME}
                        </td>
                        {subIndex === 0 && (
                          <td rowSpan={group.data.length}>
                            {subject.status_id === 3 && (
                              <EditIcon
                                size={24}
                                className="cursor-pointer self-center"
                                onClick={() => navtoStatusEdit(subject)}
                              />
                            )}
                            {subject.status_id === 1 || subject.status_id === 2 && (
                              <span className="opacity-0 cursor-default visible"></span>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// แก้ไขแล้ว
export default RegStatus;
