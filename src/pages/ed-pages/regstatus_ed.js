import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { EditIcon } from "lucide-react";
import axios from "axios";
import React from "react";
import { apiurl } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router";



const RegStatusEdit = (props) => {
    const userRole = localStorage.getItem("role_id");
    const navigate = useNavigate();
    const location = useLocation();
    const subjects = location.state.subjects;
    console.log(subjects)

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

    const changeSubject = async (subjectid, input) => {
        try {
            const response = await axios.post(apiurl + "/api/eu/ubdatestatusregister", {
                st: input.startTime,
                et: input.endTime,
                day_id: input.day,
                id: subjectid,
            });
            console.log(response);
        } catch (error) {
            console.error("Error fetching schedule data: ", error);
        }
    };

    const handleBack = () => {
        navigate("/regstatus");
    };

    const handleEditSubject = async (subject) => {
        const result = await Swal.fire({
            title: `<span style="color: #246705;font-size: 20px;"> วิชา </span> <span style="color: red;font-size: 20px;">${subject.SUBJECTNAME}</span> <span style="color: #246705;font-size: 20px;"> รหัสวิชา </span> <span style="color: red;font-size: 20px;">${subject.idsubject}-${subject.years.substring(2)}</span> <span style="color: #246705;font-size: 20px;"> หมู่เรียน </span> <span style="color: red;font-size: 20px;">${subject.sec}</span>`,
            html: `
            <div>
              <div>
                <input type="radio" id="confirmOldTime" name="action" value="confirmOldTime">
                <label for="confirmOldTime">ยืนยันเวลาเดิม</label><br>
                <input type="radio" id="notifyChange" name="action" value="notifyChange">
                <label for="notifyChange">แจ้งเปลี่ยนวันเวลา</label><br>
              </div>
            </div>
          `,
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก",
            confirmButtonColor: "#4C956C",
            cancelButtonColor: "#d33",
        });

        if (result.isConfirmed) {
            const checkedRadio = document.querySelector('input[name="action"]:checked');
            if (checkedRadio) {
                const action = checkedRadio.value;
                if (action === "confirmOldTime") {
                    try {
                        const response = await axios.post(apiurl + "/api/eu/ubdatestatusregister", {
                            id: subject.id,
                        });
                        console.log(response.data);
                        Swal.fire({
                            icon: "success",
                            title: "ยืนยันสำเร็จ",
                            confirmButtonColor: "#4C956C",
                            confirmButtonText: "ตกลง",
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } catch (error) {
                        console.error("Error updating subject register: ", error);
                    }
                } else if (action === "notifyChange") {
                    const { value: userInput } = await Swal.fire({
                        title: "เปลี่ยนแปลงวันและเวลาสอน",
                        html: `
                    <label for="day">เลือกวันที่จะสอน:</label>
                    <select id="day" class="swal2-input">
                      <option value="1">จันทร์</option>
                      <option value="2">อังคาร</option>
                      <option value="3">พุธ</option>
                      <option value="4">พฤหัสบดี</option>
                      <option value="5">ศุกร์</option>
                      <option value="6">เสาร์</option>
                      <option value="7">อาทิตย์</option>
                    </select><br>
                    <label for="startTime">เลือกเวลาเริ่มสอน:</label>
                    <select id="startTime" class="swal2-input">
                    <option value="" disabled selected>---</option>
                    ${generateTimeOptions(7, 22)}
                    </select><br>
                    <label for="endTime">เลือกเวลาสิ้นสุดการสอน:</label>
                    <select id="endTime" class="swal2-input">
                    <option value="" disabled selected>---</option>
                    ${generateTimeOptions(7, 22)}
                    </select>
                  `,
                        focusConfirm: true,
                        confirmButtonColor: "green",
                        confirmButtonText: "ยืนยัน",
                        cancelButtonText: "ยกเลิก",
                        cancelButtonColor: "red",
                        showCancelButton: true,
                        focusCancel: true,
                        preConfirm: () => {
                            const day = document.getElementById("day").value;
                            const startTime = document.getElementById("startTime").value;
                            const endTime = document.getElementById("endTime").value;

                            if (!day || !startTime || !endTime) {
                                Swal.showValidationMessage("กรุณากรอกข้อมูลให้ครบ");
                            }
                            // เช็คว่าเวลาที่เลือกต้องอยู่ในช่วง 7:00 ถึง 22:00
                            const startHour = parseInt(startTime.split(":")[0]);
                            const endHour = parseInt(endTime.split(":")[0]);

                            if (startHour < 7 || endHour > 22) {
                                Swal.showValidationMessage(
                                    "กรุณาเลือกเวลาในช่วง 7:00 ถึง 22:00 เท่านั้น"
                                );
                                return false;
                            }

                            if (startTime === endTime) {
                                Swal.showValidationMessage(
                                    "เวลาเริ่มสอนและสิ้นสุดการสอนต้องไม่ใช่เวลาเดียวกัน"
                                );
                                return false;
                            }

                            if (startTime >= endTime) {
                                Swal.showValidationMessage(
                                    "เวลาเริ่มสอนต้องน้อยกว่าเวลาสิ้นสุดการสอน"
                                );
                                return false;
                            }
                            return { day, startTime, endTime };
                        },
                    });

                    function generateTimeOptions() {
                        let options = "";
                        for (let hour = 7; hour <= 22; hour++) {
                            // หยุดการสร้างตัวเลือกเวลาเมื่อชั่วโมงเกิน 22:00
                            if (hour === 22) {
                                options += `<option value="${padZero(hour)}:00">${padZero(
                                    hour
                                )}:00</option>`;
                                break;
                            }
                            for (let minutes of ["00", "30"]) {
                                options += `<option value="${padZero(hour)}:${minutes}">${padZero(
                                    hour
                                )}:${minutes}</option>`;
                            }
                        }
                        return options;
                    }

                    function padZero(num) {
                        return num.toString().padStart(2, "0");
                    }

                    if (userInput) {
                        console.log(userInput);
                        const { day, startTime, endTime } = userInput;
                        const dayNames = {
                            1: "จันทร์",
                            2: "อังคาร",
                            3: "พุธ",
                            4: "พฤหัสบดี",
                            5: "ศุกร์",
                            6: "เสาร์",
                            7: "อาทิตย์",
                        };

                        const selectedDayName = dayNames[day];

                        const message = `วันที่สอน: ${selectedDayName} 
                    <br>เวลาเริ่มสอน: ${startTime} นาฬิกา
                    <br>เวลาสิ้นสุดการสอน: ${endTime} นาฬิกา
                    <br>`;

                        Swal.fire({
                            title: "สรุปการเปลี่ยนวันเวลา",
                            html: message,
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        });

                        try {
                            await changeSubject(subject.id, userInput);
                        } catch (error) {
                            console.error("Error changing subject: ", error);
                        }
                    }
                }
            } else {

            }
        }
    };




    return (
        <div
            className="flex-col flex py-10 px-10 bg-white flex-1 h-screen"
            style={{ backgroundColor: "#cce3de" }}
        >
            <div className="flex bg-white rounded-2xl h-full w-full flex-col py-10 px-10">

                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="flex">
                        <p className="text-4xl font-bold h1text-shadow text-midgreen">
                            แก้ไขรายวิชา
                        </p>
                    </div>

                    <button
                        type="button"
                        className="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        style={{ backgroundColor: "#134e4a", width: 90 }}
                        onClick={handleBack}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1" style={{ fontSize: "16px" }} />
                        <p className="text-lg text-center"> Back </p>
                    </button>
                </div>

                <div className="flex bg-slate-200 mt-10 rounded-lg overflow-x-auto shadow-xl">
                    <table className="h-full w-full">
                        <thead>
                            <tr className="column-color1 text-white">
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
                                <th className="py-2 font-light text-base">แก้ไข</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject, index) => (
                                <tr
                                    key={`${subject.key}-${index}`}
                                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                                >
                                    <td className="py-2 font-normal text-sm text-center">
                                        {subject.idsubject}-{subject.years.substring(2)}
                                    </td>
                                    <td className="py-2 font-normal text-sm text-center">{subject.SUBJECTNAME}</td>
                                    <td className="py-2 font-normal text-sm text-center">{subject.credit}</td>
                                    <td className="py-2 font-normal text-sm text-center">{subject.CATEGORYNAME}</td>
                                    <td className="py-2 font-normal text-sm text-center">{subject.USERNAME}</td>
                                    <td className="py-2 font-normal text-sm text-center">{subject.N_people}</td>
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
                                    <td className="py-2 font-normal text-sm text-center">{subject.DAYNAME}</td>
                                    <td className="py-2 font-normal text-sm text-center">
                                        {subject.st.substring(0, 5)}-{subject.et.substring(0, 5)} น.
                                    </td>
                                    <td className="py-2 font-normal text-sm text-center">
                                        <button className="bg-orange-400 rounded-lg text-white py-2 px-2" onClick={() => { handleEditSubject(subject) }}> แก้ไข </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RegStatusEdit;