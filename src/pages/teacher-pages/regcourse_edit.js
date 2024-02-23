//ใส่ข้อมูลลงทะเบียนรายวิชา (อาจารย์)
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import React, { useState } from "react";
import "./reg-set.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FaCirclePlus } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { FiPlusCircle } from "react-icons/fi";

// function InputField() {
//   return (
//     <div className="text-gray-500">
//       <p>Hiiiiiiiiiii</p>
//     </div>
//   );
// }

const RegCourseEdit = () => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  const [data, setData] = useState([{ subhour: "" }]);
  const addbox = () => {
    setData([...data, { subhour: "" }]);
  };

  const handleDelete = () => {
    const deleteVal = [...data];
    deleteVal.splice(1);
    setData(deleteVal);
  };

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

  const handleSwab = () => {
    navigate("/regcourse");
  };

  return (
    <div className="background">
      <div className="flex flex-row mt-10 ml-10">
        <div className="flex justify-end text-inbox">
          <button
            className="mt-10 mr-20 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center "
            style={{
              backgroundColor: "#134e4a",
              width: 140,
              height: "fit-content",
              textDecoration: "none",
            }}
            onClick={() => handleSwab()}
          >
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              style={{
                fontSize: "24px",
                marginRight: "5px",
              }}
            />
            ย้อนกลับ
          </button>
        </div>
        {/* กล่องขาวครอบสำหรับกรอกข้อมูล */}
        <div className="box rounded-lg mt-5 mr-100 overflow-y-scroll">
          <div className="ml-14 mr-96 mt-10">
            <h1 className="font-bold text-xl text-lightgreen">
              ลงทะเบียนรายวิชา
            </h1>
            <div className="mt-3 text-sm font-medium text-gray-900 dark:text-black">
              <div>
                <label class="block mb-2 ">
                  ชื่อรายวิชา <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="sub_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="โปรดระบุวิชาหรือรหัสวิชา"
                  required
                />
              </div>
              <div className="mt-3">
                <p className="mr-3">รหัสวิชา :</p>
              </div>
              <div className="mt-3">
                <p className="mr-3">จำนวนหน่วยกิต :</p>
              </div>
              <div className="mt-3">
                <p className="mr-3">หมวดวิชา :</p>
              </div>
              <div className="mt-3 text-lightgreen">
                <label for="add" className="mr-3">
                  เพิ่มหมู่เรียน
                </label>
                <button id="add" onClick={() => addbox()}>
                  <FaCirclePlus size={20} />
                </button>
                {data.map((val, i) => (
                  <div className="box-gray mt-2 mb-3">
                    <div className="flex justify-end">
                      <button onClick={() => handleDelete()}>
                        <TiDelete size={28} />
                      </button>
                    </div>
                    <h1 className="mt-1 mb-3 text-lg">หมู่เรียนที่ :</h1>
                    <div className="flex flex-row">
                      <p>
                        หมู่เรียน <span style={{ color: "red" }}>*</span> :
                      </p>
                      <fieldset className="flex flex-row mb-2">
                        <div className="ml-2">
                          <input type="radio" id="lec"></input>
                          <label for="lec" className="ml-1">
                            บรรยาย
                          </label>
                        </div>
                        <div className="ml-2">
                          <input type="radio" id="lab"></input>
                          <label for="lab" className="ml-1">
                            ปฏิบัติ
                          </label>
                        </div>
                      </fieldset>
                    </div>
                    <div>
                      <label class="block mb-2 ">
                        จำนวนชั่วโมง <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="sub_hour"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="โปรดระบุจำนวนชั่วโมงที่ใช้สอน"
                        required
                      />
                    </div>
                    <div className="mt-2">
                      <label class="block mb-2 ">
                        วันที่ต้องการเปิดสอน
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <select
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          style={{ width: 120, height: 40 }}
                          // value={statusSem}
                          // onChange={handleSemStatusChange}
                        >
                          <option value="" disabled selected hidden>
                            ---
                          </option>
                          <option>อาทิตย์</option>
                          <option>จันทร์</option>
                          <option>อังคาร</option>
                          <option>พุธ</option>
                          <option>พฤหัส</option>
                          <option>ศุกร์</option>
                          <option>เสาร์</option>
                        </select>
                        <FontAwesomeIcon
                          icon={faArrowAltCircleDown}
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "12px",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row mt-2">
                      <div>
                        <p>
                          เวลาเริ่มสอน <span style={{ color: "red" }}>*</span>
                        </p>
                        <input
                          className="w-32 p-1 rounded-md font-medium"
                          type="time"
                        ></input>
                      </div>
                      <div className="ml-5">
                        <p>
                          เวลาสิ้นสุดการสอน
                          <span style={{ color: "red" }}>*</span>
                        </p>
                        <input
                          className="w-32 p-1 rounded-md font-medium"
                          type="time"
                        ></input>
                      </div>
                    </div>
                    <div>
                      <label class="block mb-2 ">
                        จำนวนนิสิตที่เปิดรับ
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="โปรดระบุจำนวนนิสิตที่ต้องการเปิดรับ"
                        required
                      />
                    </div>
                    <div className="flex flex-row">
                      <p className="mr-3">เพิ่มหมู่เรียน</p>
                      <button onClick={() => addbox()}>
                        <FaCirclePlus size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegCourseEdit;
