import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Pidbox from "./component/pidbox";
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

                <Pidbox title={"PID"}>
                    <div>
                        sasdasd
                    </div>
                    <div>
                        sasdasd
                    </div>
                    <div>
                        sasdasd
                    </div>
                    <div>
                        sasdasd
                    </div>
                </Pidbox>
            </div>
        </div>
    )
}

export default TableEdit;