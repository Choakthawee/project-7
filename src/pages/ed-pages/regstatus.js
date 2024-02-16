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
    <div className="h-screen">
      <h1>RegStatus</h1>
    </div>
  );
};
export default RegStatus;
