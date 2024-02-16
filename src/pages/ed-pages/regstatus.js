import { Radio } from "lucide-react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const RegStatus = () => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  const showAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'ข้อผิดพลาด',
      text: 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ตกลง'
    }).then((result) => {
      if (result.isConfirmed) {
        if (userRole === "admin") {
          navigate('/userinfo');
        } else if (userRole === "teacher") {
          navigate('/schedule');
        }
      }
    });
  };

  if (userRole !== 'education department') {
    showAlert();
    return null;
  }
  return (
    <div className="flex-col flex py-10 px-10 bg-white flex-1 h-screen">

      <div className="flex">
        <p className="text-4xl font-bold h1text-shadow text-midgreen">
          ตรวจสอบการลงทะเบียน
        </p>
      </div>

      <div className="flex flex-1 flex-row">
      </div>
    </div>
  );
};
export default RegStatus;
