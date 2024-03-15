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

  const handleEdit2 = (subjectId) => {
    const selectedSubject = subjectReg.find((sub) => sub.id === subjectId);

    if (selectedSubject) {
      Swal.fire({
        title: `<span style="color: #246705;font-size: 20px;"> วิชา </span> <span style="color: red;font-size: 20px;">${selectedSubject.SUBJECTNAME}</span> <span style="color: #246705;font-size: 20px;"> รหัสวิชา </span> <span style="color: red;font-size: 20px;">${selectedSubject.Subjects_id}</span>`,
        html: `
          <div>
            <p><strong>อาจารย์ผู้สอน :</strong> ${selectedSubject.USERNAME}</p>
            <p><strong>หมู่เรียน :</strong> ${selectedSubject.sec}</p>
            <p><strong>จำนวนหน่วยกิต :</strong> ${selectedSubject.credit}</p>  
            <p><strong>จำนวนนิสิต :</strong> ${selectedSubject.N_people}</p>
            <p><strong>สาขาที่เปิดรับ :</strong> ${selectedSubject.branch.t12
              .map((branch) => `T12-${branch}`)
              .join(", ")}</p>
            <p><strong>สอนวัน :</strong> ${selectedSubject.DAYNAME}</p>
            <p><strong>เวลา :</strong> ${selectedSubject.st} - ${
          selectedSubject.et
        }</p>
          </div>
        `,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#4C956C",
      });
    }
  };

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
    } else if (subject.status_id === 3) {
      const subjectsWithSameDateTime = subjectReg.filter(
        (sub) =>
          sub.st === subject.st &&
          sub.et === subject.et &&
          sub.DAYNAME === subject.DAYNAME
      );

      const tableRows = subjectsWithSameDateTime
        .map(
          (sub) => `
            <tr style="font-size: 13px; border: 1px solid #000000;">
              <td style="font-size: 13px; border: 1px solid #000000;">${
                sub.idsubject
              }-${sub.years.substring(2)}</td>
              <td style="font-size: 13px; border: 1px solid #000000;">${
                sub.SUBJECTNAME
              }</td>
              <td style="font-size: 13px; border: 1px solid #000000;">${
                sub.credit
              }</td>
              <td style="font-size: 13px; border: 1px solid #000000;">${
                sub.CATEGORYNAME
              }</td>
              <td style="font-size: 13px; border: 1px solid #000000;">${
                sub.USERNAME
              }</td>
              <td style="font-size: 13px; border: 1px solid #000000;">${
                sub.N_people
              }</td>
              <td style="font-size: 13px; border: 1px solid #000000;">${sub.branch.t12
                .map((branch) => `T12-${branch}`)
                .join(", ")}</td>
              <td style="font-size: 13px; border: 1px solid #000000;">${
                sub.DAYNAME
              }</td>
              <td style="font-size: 13px; border: 1px solid #000000;">${subject.st.substring(
                0,
                5
              )}-${subject.et.substring(0, 5)} น.</td>
              <td style="font-size: 13px; border: 1px solid #000000;">
                <button
                  class="edit-button"
                  onclick="handleEdit2(${sub.id})"
                >
                  แก้ไข
                </button>
              </td>
            </tr>`
        )
        .join("");

      const tableHTML = `
        <table style='border-collapse: collapse; width: 100%;'>
          <thead>
            <tr style='font-size: 13px; background-color: #1B4242; color: white;'>
              <th style='border: 1px solid #000000; padding: 8px;'>รหัส</th>
              <th style='border: 1px solid #000000; padding: 8px;'>วิชา</th>
              <th style='border: 1px solid #000000; padding: 8px;'>หน่วยกิต</th>
              <th style='border: 1px solid #000000; padding: 8px;'>lec/lab</th>
              <th style='border: 1px solid #000000; padding: 8px;'>อาจารย์ผู้สอน</th>
              <th style='border: 1px solid #000000; padding: 8px;'>จำนวนนิสิต</th>
              <th style='border: 1px solid #000000; padding: 8px;'>ชั้นปีที่เปิดรับ</th>
              <th style='border: 1px solid #000000; padding: 8px;'>วัน</th>
              <th style='border: 1px solid #000000; padding: 8px;'>เวลา</th>
              <th style='border: 1px solid #000000; padding: 8px;'>แก้ไข</th>
            </tr>
          </thead>
          <tbody style="font-size: 13px; border: 1px solid #000000;">
            ${tableRows}
          </tbody>
        </table>`;

      const numRows = subjectsWithSameDateTime.length;
      const popupHeight = numRows > 5 ? `${numRows * 30}px` : "auto";
      const popupWidth = "960px";

      let duplicatedSubjectsText = "";
      if (subjectsWithSameDateTime.length > 1) {
        duplicatedSubjectsText = `<span style="color: black;">วิชา</span> ${subjectsWithSameDateTime
          .map(
            (subject) =>
              `<span style="color: red;">${subject.SUBJECTNAME}</span>`
          )
          .join(`<span style="color: black;"> ชนกับ </span>`)}`;
      }

      Swal.fire({
        title: `<span style="color: #246705;font-size: 20px;"> แก้ไขรายวิชา </span>`,
        html: `${tableHTML}`,
        showCancelButton: false,
        confirmButtonText: "ยืนยัน",
        confirmButtonColor: "#4C956C",
        width: popupWidth,
        height: popupHeight,
        footer: `${duplicatedSubjectsText}`,
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
                  (subject) =>
                    (selectedCategory === "" ||
                      subject.category_id === selectedCategory) &&
                    (selectedStatus === "" ||
                      subject.status_id === selectedStatus)
                )
                .reduce((acc, curr) => {
                  const isStatusThree = curr.status_id === 3;
                  const key = `${curr.st}-${curr.et}-${curr.DAYNAME}`;

                  if (isStatusThree) {
                    const existingSubjectIndex = acc.findIndex(
                      (item) => item.key === key
                    );

                    if (existingSubjectIndex !== -1) {
                      acc[existingSubjectIndex].data.push(curr);
                    } else {
                      acc.push({
                        key: key,
                        data: [curr],
                      });
                    }
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
                          {subject.branch.t12.map((item, index) => (
                            <span key={index}>
                              {index > 0 && ", "}
                              T12-{item}
                            </span>
                          ))}
                        </td>
                        <td className="py-2 font-normal text-sm text-center">
                          {subject.DAYNAME}
                        </td>
                        <td className="py-2 font-normal text-sm text-center">
                          {subject.st.substring(0, 5)}-
                          {subject.et.substring(0, 5)} น.
                        </td>
                        <td
                          className={`py-2 font-normal text-sm text-center ${
                            subject.STATUSNAME === "รอ"
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
                            <EditIcon
                              size={24}
                              className={`cursor-pointer self-center ${
                                subject.status_id === 1
                                  ? "opacity-0 cursor-default"
                                  : ""
                              }`}
                              onClick={() => handleEdit(subject)}
                            />
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
export default RegStatus;
