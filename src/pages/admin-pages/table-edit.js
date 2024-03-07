import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BoxSetDB from "./component/Boxdb";
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

                <BoxSetDB title={"PID"}>
                    <div className="flex gap-4 items-center">
                        <div className="bg-slate-300 p-2 pl-5 pr-5   rounded-lg">
                            {123123}
                        </div>
                        <div>
                            reload
                        </div>
                    </div>
                </BoxSetDB>

                <BoxSetDB title={"หมวดวิชา"}>
                    <div className=" rounded-lg overflow-x-auto shadow-xl">
                        <table className=" w-full">
                            <thead className="column-color1 text-white ">
                                <tr>
                                    <th>id</th>
                                    <th>หมวด</th>
                                    <th>แก้ไข</th>
                                    <th>ลบ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className=" bg-slate-100">
                                    <td className=" text-center p-2  border border-yellow-950">1</td>
                                    <td className=" text-center p-2 border">วิชาเอก</td>
                                    <td className=" text-center p-2 border">แก้</td>
                                    <td className=" text-center p-2 border">ลบ</td>
                                </tr>
                                <tr className=" bg-white">
                                    <td className=" text-center p-2  border">1</td>
                                    <td className=" text-center p-2 border">วิชาเอก</td>
                                    <td className=" text-center p-2 border">แก้</td>
                                    <td className=" text-center p-2 border">ลบ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </BoxSetDB>
            </div>
        </div>
    )
}

export default TableEdit;