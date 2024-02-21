//ผลการลงทะเบียน (อาจารย์)
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const RegResultT = () => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  const showAlert = () => {
    Swal.fire({
      icon: "error",
      title: "ข้อผิดพลาด",
      text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
    }).then((result) => {
      if (result.isConfirmed) {
        if (userRole === "admin") {
          navigate("/userinfo");
        } else if (userRole === "education department") {
          navigate("/imcourse");
        }
      }
    });
  };

  if (userRole !== "teacher") {
    showAlert();
    return null;
  }
  return (
    <div className="background">
      <h1>RegResultT</h1>
    </div>
  );
};
export default RegResultT;
