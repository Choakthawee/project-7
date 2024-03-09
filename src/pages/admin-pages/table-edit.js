import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BoxSetDB from "./component/Boxdb";
import Onlyrename from "./component/onlyrename";
import Tableaddeditdelete from "./component/Tableaddeditdelete";
import PIDbox from "./component/pid";
import { useEffect, useState } from "react";
import { apiurl } from "../../config";
import openInputAlert from "./component/SwalInputeditname";
import axios from "axios";
const TableEdit = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("role_id");
    const showAlert = () => {
        Swal.fire({
            icon: "error",
            title: "ข้อผิดพลาด",
            text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ตกลง",
        }).then((result) => {
            if (result.isConfirmed) {
                if (userRole === "3") {
                    navigate("/imcourse");
                } else if (userRole === "1") {
                    navigate("/schedule");
                }
            }
        });
    };
    if (userRole !== "2") {
        showAlert();
        return null;
    }

    return (
        <div
            className="flex-col flex w-full min-h-screen p-2 md:p-10" style={{ backgroundColor: "#cce3de" }}        >
            <div className="flex flex-col gap-3">
                <p className="text-4xl font-bold h1text-shadow text-midgreen">
                    ตั้งค่า Database
                </p>

                <BoxSetDB title={"ดาต้าเบส"} keys={"database-set"}>
                    <BoxSetDB title={"หมวดวิชา"} keys={"course-set"}>
                        <Tableaddeditdelete geturl={"/api/setting/subject_category"} table="subject_category" remainder={"*คำเตือนอัปโหลดไฟล์หลักสูตรจะเกี่ยวข้องตรงนี้ด้วย"}
                            foredeleteurl={"/api/setting/deleteforesubject_category"}
                            title="หมวดวิชา"
                        />
                    </BoxSetDB>
                    <BoxSetDB title={"หมวดวิชาห้ามทับเวลากัน"} keys={"coursetub-set"}>
                        <Tableaddeditdelete geturl={"/api/setting/focus_sub_cat"} table="" title="" />
                    </BoxSetDB>
                    <BoxSetDB title={"ค่าสถานะ"} keys={"status-set"}>
                        <Onlyrename geturl="/api/setting/status" table="status" title={"สถานะ"}/>
                    </BoxSetDB>
                    <BoxSetDB title={"ตำแหน่งผู้ใช้"} keys={"role-set"}>
                        <Tableaddeditdelete geturl={"/api/setting/role"} remainder="*ไม่สามารถลบตำแหน่งแอดมินได้ หรือ id 2 ได้" table="role"
                            title="ตำแหน่งผู้ใช้"
                        />
                    </BoxSetDB>
                    <BoxSetDB title={"ตำแหน่งผู้ใช้ เข้าถึงลิ้งค์"} keys={"rolelink-set"}>
                    </BoxSetDB>
                    <BoxSetDB title={"หมวดเรียน"} keys={"course-set"}>
                        <Onlyrename geturl={"/api/setting/category"} table={"category"} title={"หมวดเรียน"} />
                    </BoxSetDB>
                    <BoxSetDB title={"วัน"} keys={"day-set"}>
                        <Tableaddeditdelete geturl={"/api/setting/day"} table={"day"} title={"วัน"} />
                    </BoxSetDB>
                </BoxSetDB>
                <BoxSetDB title={"ออโต้ ตรวจสอบวิชา"} keys={"auto-set"}>
                    <BoxSetDB title={"วันที่ตรวจสอบ"}>
                        <Tableaddeditdelete geturl={"/api/setting/autoday"} />
                    </BoxSetDB>
                    <BoxSetDB title={"เวลาที่ตรวจสอบ"}>

                    </BoxSetDB>
                </BoxSetDB>
                <BoxSetDB title={"Log ข้อความ"} keys={"msg-set"}>
                    <BoxSetDB title={"ข้อความการลงทะเบียน"} keys={"register-msg"}>

                    </BoxSetDB>
                    <BoxSetDB title={"ข้อความการตรวจสอบออโต้"} keys={"auto-msg"}>

                    </BoxSetDB>
                </BoxSetDB>
                <BoxSetDB title={"Bankend run on PID"} keys={"pid-set"}>
                    <PIDbox />
                </BoxSetDB>
            </div>
        </div>
    )
}

export default TableEdit;