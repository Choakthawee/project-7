import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BoxSetDB from "./component/Boxdb";
import Onlyrename from "./component/onlyrename";
import Tableaddeditdelete from "./component/Tableaddeditdelete";
import PIDbox from "./component/pid";
import { useState } from "react";
import Selectboxtable from "./component/selectboxaddtable";
import { AlertCircleIcon } from "lucide-react";
import Timesetbox from "./component/timesetbox";
import Openlogbox from "./component/openlogbox";
const TableEdit = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("role_id");
    const [readed, setReaded] = useState(false);
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
                        <Selectboxtable remainder="*คำเตือนระบบจะดำเนินการเมื่อวันและเวลา auto ตรวจสอบ" col="subject_category_id" geturl={"/api/setting/focus_sub_cat"} geturlInsert={"/api/setting/subject_categorywithout"} table="focus_sub_cat" title="หมวดวิชาห้ามทับเวลากัน" />
                    </BoxSetDB>
                    <BoxSetDB title={"ค่าสถานะ"} keys={"status-set"}>
                        <Onlyrename geturl="/api/setting/status" table="status" title={"สถานะ"} />
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
                <BoxSetDB title={"ล้างและคืนค่าดาต้าเบส"} keys={"cleardb-set"}>
                    <BoxSetDB title={"ล้างวิชาที่ลงทะเบียน"} keys={"cleardbsubregit-set"}>

                    </BoxSetDB>
                    <BoxSetDB title={"ล้างวิชา"} keys={"cleardbsubregit-set"}>

                    </BoxSetDB>
                    <BoxSetDB title={"คืนค่าจากโรงงาน"} keys={"cleardbsubregit-set"}>

                    </BoxSetDB>
                </BoxSetDB>
                <BoxSetDB title={"ออโต้ ตรวจสอบวิชา"} keys={"auto-set"}>
                    <div className="flex flex-col w-full justify-center items-center" onClick={() => setReaded(true)} >
                        <div className={`  ${readed ? "" : "blur-[2px]"} flex-col flex gap-2 w-full`}>
                            <BoxSetDB title={"วันที่ตรวจสอบ"} keys={"autoday-set"}>
                                <Selectboxtable remainder="*คำเตือนระบบจะดำเนินการเมื่อทำการเริ่มระบบใหม่" col="day_id" geturl={"/api/setting/autoday"} geturlInsert={"/api/setting/daywithout"} table="autoday" title={"วันที่ตรวจสอบ"} />
                            </BoxSetDB>
                            <BoxSetDB title={"เวลาที่ตรวจสอบ"}>
                                <Timesetbox />
                            </BoxSetDB>
                        </div>
                        <div className={`${readed ? " hidden" : "absolute w-1/2"}  transition-all bg-opacity-60 bg-red-300 flex p-2 flex-col justify-center items-center rounded-2xl `}>
                            <AlertCircleIcon size={50} />
                            <p>ระบบนี้จะทำงาน</p>
                            <p>ก็ต่อเมื่อทำการกดรีระบบ</p>

                        </div>
                    </div>
                </BoxSetDB>
                <BoxSetDB title={"Log ข้อความ"} keys={"msg-set"}>
                    <BoxSetDB title={"เปิดการบันทึกLog"} keys={"autoopenlog-msg"}>
                        <Openlogbox/>
                    </BoxSetDB>
                    <BoxSetDB title={"ข้อความการลงทะเบียน"} keys={"register-msg"}>

                    </BoxSetDB>
                    <BoxSetDB title={"ข้อความการตรวจสอบออโต้"} keys={"auto-msg"}>

                    </BoxSetDB>
                </BoxSetDB>
                <BoxSetDB title={"Backend Run"} keys={"Backend-set"}>
                    <BoxSetDB title={"Run on PID"} keys={"pid-set"}>
                        <PIDbox />
                    </BoxSetDB>
                    <BoxSetDB title={"Restart Backend"} keys={"Restartb-set"}>

                    </BoxSetDB>
                </BoxSetDB>
            </div>
        </div>
    )
}

export default TableEdit;