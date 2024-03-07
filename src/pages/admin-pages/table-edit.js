import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BoxSetDB from "./component/Boxdb";
import openInputAlert from "./component/SwalInputeditname";
import Course_set from "./component/course-set";
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
            className="flex-col flex w-full min-h-screen p-10" style={{ backgroundColor: "#cce3de" }}        >
            <div className="flex flex-col gap-3">
                <p className="text-4xl font-bold h1text-shadow text-midgreen">
                    ตั้งค่า Database
                </p>

                <BoxSetDB title={"ดาต้าเบส"} keys={"database-set"}>
                    <BoxSetDB title={"หมวดวิชา"} keys={"course-set"}>
                        <Course_set/>
                    </BoxSetDB>
                    <BoxSetDB title={"หมวดวิชาห้ามทับเวลากัน"} keys={"coursetub-set"}>
                    </BoxSetDB>
                    <BoxSetDB title={"ค่าสถานนะ"} keys={"status-set"}>
                        <div className=" flex gap-2 flex-col p-2">
                            <div className=" overflow-x-auto shadow-xl">
                                <table className="border-separate w-full">
                                    <thead className="column-color1 text-white ">
                                        <tr>
                                            <th className="p-2 w-1/12">id</th>
                                            <th className="p-2 w-9/12">ชื่อสถานะ</th>
                                            <th className="p-2 w-1/12">แก้ไขชื่อ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className=" bg-slate-100">
                                            <td className=" text-center p-2 ">1</td>
                                            <td className=" text-center p-2 ">ผ่าน</td>
                                            <td className=" text-center p-2 " onClick={() => openInputAlert("ๅ/-", "แก้ชื่อ", "asdasd")}>แก้</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </BoxSetDB>
                    
                    <BoxSetDB title={"สถานะผู้ใช้"} keys={"role-set"}>
                    </BoxSetDB>
                    <BoxSetDB title={"สถานะผู้ใช้ เข้าถึงลิ้งค์"} keys={"rolelink-set"}>
                    </BoxSetDB>
                    <BoxSetDB title={"หมวดเรียน"} keys={"course-set"}>
                    </BoxSetDB>
                </BoxSetDB>
                <BoxSetDB title={"ออโต้ ตรวจสอบวิชา"} keys={"auto-set"}>
                    <BoxSetDB title={"วันที่ตรวจสอบ"}>

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
                    <div className="flex gap-4 p-2 items-center">
                        <div className="bg-slate-300 p-2 pl-5 pr-5   rounded-lg">
                            {123123}
                        </div>
                        <div>
                            reload
                        </div>
                    </div>
                </BoxSetDB>
            </div>
        </div>
    )
}

export default TableEdit;