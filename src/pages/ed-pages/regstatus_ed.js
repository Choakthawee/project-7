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

    const handleBack = () => {
        navigate("/regstatus");
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
                                        {subject.branch.t12.map((item, index) => (
                                            <span key={index}>
                                                {index > 0 && ", "}
                                                T12-{item}
                                            </span>
                                        ))}
                                    </td>
                                    <td className="py-2 font-normal text-sm text-center">{subject.DAYNAME}</td>
                                    <td className="py-2 font-normal text-sm text-center">
                                        {subject.st.substring(0, 5)}-{subject.et.substring(0, 5)} น.
                                    </td>
                                    <td className="py-2 font-normal text-sm text-center">
                                        <button className="bg-orange-400 rounded-lg text-white py-2 px-2"> แก้ไข </button>
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