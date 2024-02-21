import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Search } from "lucide-react";
import { CalendarClockIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Schedule = () => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const [isTeacher, setIsTeacher] = useState(false);

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
        } else if (userRole === "education department") {
          navigate('/imcourse');
        }
      }
    });
  };

  if (userRole !== 'teacher') {
    showAlert();
    return null;
  }

  // เวลาทั้งหมด
  const times = [
    '7.00-7.30', '7.30-8.00', '8.00-8.30', '8.30-9.00',
    '9.00-9.30', '9.30-10.00', '10.00-10.30', '10.30-11.00',
    '11.00-11.30', '11.30-12.00', '12.00-12.30', '12.30-13.00',
    '13.00-13.30', '13.30-14.00', '14.00-14.30', '14.30-15.00',
    '15.00-15.30', '15.30-16.00', '16.00-16.30', '16.30-17.00',
    '17.00-17.30', '17.30-18.00', '18.00-18.30', '18.30-19.00',
    '19.00-19.30', '19.30-20.00', '20.00-20.30', '20.30-21.00',
    '21.00-21.30', '21.30-22.00'
  ];

  // รายการวัน
  const days = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'];


  return (
    <div className="flex-col flex py-10 px-10 bg-white flex-1 min-h-screen" style={{ backgroundColor: "#cce3de" }}>

      <div className="flex">
        <p className="text-4xl font-bold h1text-shadow text-midgreen">
          ตารางสอน
        </p>
      </div>

      <div className="flex flex-row mt-10 mb-5">
        <div className="flex flex-col mr-3 w-48">
          <label className="text-midgreen mb-1">รหัส/วิชา/ผู้สอน</label>
          <input className="focus:outline-none rounded-sm h-8"></input>
        </div>
        <div className="flex flex-col w-32 mr-3">
          <label className="text-midgreen mb-1">สาขา/ชั้นปี</label>
          <input className="focus:outline-none rounded-sm h-8"></input>
        </div>
        <div className="flex flex-col w-32 mr-3">
          <label className="text-midgreen mb-1">หมวดวิชา</label>
          <input className="focus:outline-none rounded-sm h-8"></input>
        </div>

        <div className="flex mt-2 items-end">
          <button className="transition-all bg-green-600 rounded-3xl w-24 h-10 justify-center items-center flex flex-row shadow-lg">
            <label className="text-white text-base">ค้นหา</label>
            <Search size={21} color="white" />
          </button>
        </div>

        <div className="flex-row flex mt-2 ml-2 items-end">
          <div className={`transition-all w-8 h-8 mr-2 ${isTeacher ? "bg-green-400" : "bg-pink-400"}`}></div>
          <label className="ptext-shadow mb-1">{isTeacher ? "ผ่าน" : "บังคับ"}</label>
        </div>

        <div className="flex flex-row ml-2 items-end">
          <div className={`transition-all w-8 h-8 mr-2 ${isTeacher ? "bg-red-500" : "bg-yellow-400"}`}></div>
          <label className="ptext-shadow mb-1">{isTeacher ? "ไม่ผ่าน" : "เฉพาะเลือก"}</label>
        </div>

        <div className="flex flex-row ml-2 items-end">
          <div className={`transition-all w-8 h-8 mr-2 ${isTeacher ? "bg-orange-500" : "bg-cyan-400"}`}></div>
          <label className="ptext-shadow mb-1">{isTeacher ? "รอพิจารณา" : "เลือก"}</label>
        </div>

        <div className="flex flex-row ml-10 items-end mb-1" onClick={() => { setIsTeacher(!isTeacher) }}>
          <CalendarClockIcon size={21} className="border-white cursor-pointer" />
          <label className="ml-2 font-bold ptext-shadow cursor-pointer">MY SCHEDULE</label>
        </div>
      </div>

      {/*โค๊ดสำหรับตาราง*/}

      <table className="mt-0 border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 py-2 px-4"></th>
            {times.map((time, index) => (
              <th key={index} className="border border-gray-400 py-2 px-4">{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, dayIndex) => (
            <tr key={dayIndex} className="bg-white">
              <td className="border border-gray-400 py-2 px-4 font-semibold">{day}</td>
              {times.map((_, timeIndex) => (
                <td key={timeIndex} className="border border-gray-400 py-2 px-4">
                  {/* ตำแหน่งของตารางสอน */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-1 bg-slate-200 mt-5 rounded-lg overflow-x-auto shadow-xl">
        <table className="h-full w-full">
          <thead>
            <tr className="column-color1 text-white">
              <th className="py-2 font-light text-base border-x-black border-x-2">
                #
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                รหัส
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                วิชา
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                หน่วยกิต
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                lec/lab
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                อาจารย์ผู้สอน
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                จำนวนนิสิต
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                ชั้นปีที่เปิดรับ
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                วัน
              </th>
              <th className="py-2 font-light text-base border-r-black border-x-2">
                เวลา
              </th>
              <th className="py-2 font-light text-base">หมายเหตุ</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

    </div>
  );
};
export default Schedule;
