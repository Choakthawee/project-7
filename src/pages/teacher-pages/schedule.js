//ตารางสอน (อาจารย์)
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Search } from "lucide-react";
const Schedule = () => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  // const showAlert = () => {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'ข้อผิดพลาด',
  //     text: 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้',
  //     confirmButtonColor: '#3085d6',
  //     confirmButtonText: 'ตกลง'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       if (userRole === "admin") {
  //         navigate('/userinfo');
  //       } else if (userRole === "education department") {
  //         navigate('/imcourse');
  //       }
  //     }
  //   });
  // };

  // if (userRole !== 'teacher') {
  //   showAlert();
  //   return null;
  // }

  return (
    <div className="flex-col flex py-10 px-10 bg-white flex-1 min-h-screen"
      style={{ backgroundColor: "#cce3de" }}>

      <div className="flex">
        <p className="text-4xl font-bold h1text-shadow text-midgreen">
          ตารางสอน
        </p>
      </div>

      <div className="flex flex-row mt-3">
        <div className="flex flex-col mr-3">
          <label>รหัส/วิชา/ผู้สอน</label>
          <input className="focus:outline-none rounded-sm"></input>
        </div>
        <div className="flex flex-col w-24 mr-3 ">
          <label>สาขา/ชั้นปี</label>
          <input className="focus:outline-none rounded-sm"></input>
        </div>
        <div className="flex flex-col w-24 mr-3">
          <label>หมวดวิชา</label>
          <input className="focus:outline-none rounded-sm"></input>
        </div>

        <div className="flex mt-2">
          <button className="transition-all bg-green-600 rounded-3xl w-24 h-10 justify-center items-center flex flex-row shadow-lg">
            <label className="text-white text-base">ค้นหา</label>
            <Search size={21} color="white" />
          </button>
        </div>

        <div>

        </div>
      </div>
    </div>
  );
};
export default Schedule;
