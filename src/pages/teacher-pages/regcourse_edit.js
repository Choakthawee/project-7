//ใส่ข้อมูลลงทะเบียนรายวิชา (อาจารย์)
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import React, { useState } from "react";
import "./reg-set.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FaCirclePlus } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { TiDeleteOutline } from "react-icons/ti";

const RegCourseEdit = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();

  const [data, setData] = useState([{ subhour: "" }]);
  const [branch, setBranch] = useState([{ subbranch: "" }]);

  const addbox = () => {
    setData([...data, { subhour: "" }]);
  };

  const addbox_branch = () => {
    setBranch([...branch, { subbranch: "" }]);
  };

  const handleDelete = (i) => {
    const deleteData = [...data];
    deleteData.splice(i, 1);
    setData(deleteData);
  };

  const handleDeleteBranch = (i) => {
    const deleteBranch = [...branch];
    deleteBranch.splice(i, 1);
    setBranch(deleteBranch);
  };

  const BranchCheckbox = () => {
    return (
      <div className="flex items-center me-4 justify-center">
        <input
          id="branch-checkbox"
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-3"
        />
      </div>
    );
  };

  const BranchBox = (x) => {
    return (
      <div className="box-gray mt-3 mb-3">
        <div className="flex justify-end">
          <button onClick={() => handleDeleteBranch(x)}>
            <TiDeleteOutline size={20} />
          </button>
        </div>
        <div className="flex flex-col mt-2">
          <div>
            <label class="block mb-2 ">
              สาขา <span style={{ color: "red" }}>*</span>
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
                <option>T01(วิศวะอิอิ)</option>
                <option>T02(วิศวะป่าตอง)</option>
                <option>T12(วิศวกรรมคอมพิวเตอร์และสารสนเทศ)</option>
              </select>
              <FontAwesomeIcon
                icon={faArrowAltCircleDown}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "33%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
          <div className="mt-3">
            <p>
              ชั้นปีที่เปิดรับ(เลือกได้มากกว่า 1){" "}
              <span style={{ color: "red" }}>*</span>
            </p>
            <div className="flex flex-row">
              <div className="mt-2">
                <div className="flex flex-row mb-1">
                  <BranchCheckbox id="bcb1" />
                  <label for="bcb1">ชั้นปี 1</label>
                </div>
                <div className="flex flex-row mb-1">
                  <BranchCheckbox id="bcb2" />
                  <label for="bcb2">ชั้นปี 2</label>
                </div>
                <div className="flex flex-row mb-1">
                  <BranchCheckbox id="bcb3" />
                  <label for="bcb3">ชั้นปี 3</label>
                </div>
                <div className="flex flex-row mb-1">
                  <BranchCheckbox id="bcb4" />
                  <label for="bcb4">ชั้นปี 4</label>
                </div>
              </div>
              <div className="mt-2 ml-3">
                <div className="flex flex-row mb-1">
                  <BranchCheckbox id="bcb5" />
                  <label for="bcb5">ชั้นปี 5</label>
                </div>
                <div className="flex flex-row mb-1">
                  <BranchCheckbox id="bcb6" />
                  <label for="bcb6">ชั้นปี 6</label>
                </div>
                <div className="flex flex-row mb-1">
                  <BranchCheckbox id="bcb7" />
                  <label for="bcb7">ชั้นปี 7</label>
                </div>
                <div className="flex flex-row mb-1">
                  <BranchCheckbox id="bcb8" />
                  <label for="bcb8">ชั้นปี 8</label>
                </div>
              </div>
            </div>
            <button className="bg-lightgreen text-white hover:bg-white hover:text-gray-300 font-bold py-1 px-4 rounded mt-3">
              ตกลง
            </button>
          </div>
        </div>
      </div>
    );
  };

  const GrayBox = (i) => {
    return (
      <div className="box-gray mt-2 mb-3">
        <div className="flex justify-end">
          <button onClick={() => handleDelete(i)}>
            <TiDelete size={28} />
          </button>
        </div>
        <div className="ml-5 mr-56 mb-3">
          <h1 className="mt-1 mb-3 text-lg">หมู่เรียนที่ : {i + 1}</h1>
          <div className="flex">
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
                  left: "33%",
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
          <div className="mt-2">
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
          <div className="flex flex-col mt-2">
            <label for="bbox" class="block mb-2 mr-2">
              สาขาที่เปิดสอน<span style={{ color: "red" }}>*</span>
            </label>
            <button id="bbox" onClick={() => addbox_branch()}>
              <FiPlusCircle size={20} />
            </button>
            {branch.map((val_b, x) => BranchBox(x))}
          </div>
        </div>
      </div>
    );
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
        if (userRole === "2") {
          navigate("/userinfo");
        } else if (userRole === "3") {
          navigate("/imcourse");
        }
      }
    });
  };

  if (userRole !== "1") {
    showAlert();
    return null;
  }

  const handleSwab = () => {
    navigate("/regcourse");
  };

  return (
    <div className="background">
      <div className="flex flex-row mt-5 ml-10">
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
        <div className="box rounded-lg mt-5 mb-5 overflow-y-scroll">
          <div className="ml-14 mr-96 mt-10">
            <h1 className="font-bold text-2xl text-lightgreen">
              ลงทะเบียนรายวิชา
            </h1>
            <div className="mt-3 text-sm font-medium text-gray-900 dark:text-black">
              <div>
                <label class="block mb-2">ชื่อรายวิชา</label>
                <p className="text-xl text-gray-300">Network Programming</p>
              </div>
              <div className="flex mt-3">
                <p className="mr-3">รหัสวิชา : </p>
                <p className="text-gray-300">03603423</p>
              </div>
              <div className="flex mt-3">
                <p className="mr-3">จำนวนหน่วยกิต :</p>
                <p className="text-gray-300">3</p>
              </div>
              <div className="flex mt-3">
                <p className="mr-3">หมวดวิชา :</p>
                <p className="text-gray-300">เลือก</p>
              </div>
              <div className="mt-3 text-lightgreen">
                <label for="add" className="mr-3">
                  เพิ่มหมู่เรียน
                </label>
                <button id="add" onClick={() => addbox()}>
                  <FaCirclePlus size={20} />
                </button>
                {data.map((val, i) => GrayBox(i))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegCourseEdit;
