import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiurl } from "../../../config";
import BranchBox from "./BranchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { TiDelete } from "react-icons/ti";

export default function GrayBox({
  data,
  keys,
  i,
  practice_t,
  lecture_t,
  exsub,
  sub_id,
  setGrayBoxData,
  handleDelete,
}) {
  const [ListSelect, setListSelect] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(
    data.category_id ? data.category_id : undefined
  );
  const [all, setall] = useState({});
  const [realcredit, setRealCredit] = useState(
    exsub
      ? exsub === 0
        ? exsub
        : data.realcredit
        ? data.realcredit
        : Number
      : Number
  );
  const [st, setSt] = useState(data.st);
  const [et, setEt] = useState(data.et);
  const [day, setDay] = useState(data.day);
  const [status_id, setStatusId] = useState(2);
  const [N_people, setNPeople] = useState(
    data.N_people ? data.N_people : Number
  );
  useEffect(() => {
    axios
      .get(apiurl + "/api/category")
      .then((response) => {
        setListSelect(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         apiurl + "/api/teacher/subjectsRegister" + id
  //       );
  //       const subjectData = response.data[0]; // สมมติว่าข้อมูลจาก API คือ object ของรายวิชาเดียว
  //       setSubjectData({
  //         credit: subjectData.credit,
  //         lecture_t: subjectData.lecture_t,
  //         practice_t: subjectData.practice_t,
  //         exsub: subjectData.exsub,
  //         sub_hour: "", // ต้องเพิ่มข้อมูลจำนวนชั่วโมงที่ต้องการเรียน
  //         selectedBranch: "", // ต้องเพิ่มข้อมูลสาขาที่เลือก
  //         selectedYears: [], // ต้องเพิ่มข้อมูลชั้นปีที่เลือก
  //         selectedOptions: [], // ต้องเพิ่มข้อมูลหมู่เรียนที่เลือก
  //         teachingSchedule: [], // ต้องเพิ่มข้อมูลตารางสอน
  //       });
  //     } catch (error) {
  //       console.error("Error fetching subject data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const handleUpdateData = () => {
      const data = {
        keys: keys,
        uid: localStorage.getItem("userid"),
        st: st,
        et: et,
        day_id: day,
        status_id: status_id,
        N_people: N_people,
        branch: all,
        category_id: selectedRadio,
        Subjects_id: sub_id,
        realcredit: exsub === 0 ? exsub : realcredit,
      };
      console.log(data);
      setGrayBoxData((prevData) => {
        return prevData.map((item, index) => {
          if (index === i) {
            return data; // เพิ่มข้อมูลที่ต้องการที่ index 3
          } else {
            return item; // ใช้ข้อมูลเดิมในกรณีอื่น
          }
        });
      });
    };
    handleUpdateData();
  }, [st, et, day, status_id, N_people, all, selectedRadio, realcredit]);
  return (
    <div className="box-gray p-2">
      <div className="flex flex-col gap-3 ml-3 mr-3 mt-3">
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">หมู่เรียนที่ : {i + 1}</h1>
          <button onClick={() => handleDelete(i)}>
            <TiDelete size={28} />
          </button>
        </div>

        {exsub === 1 && (
          <div>
            <p className="mb-2">
              หน่วยกิต <span style={{ color: "red" }}>*</span>
            </p>
            <input
              placeholder="กรอกหน่วยกิตที่ต้องการ"
              value={realcredit === 0 ? "" : realcredit}
              onChange={(e) => setRealCredit(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{ width: "160px" }}
              required
            ></input>
          </div>
        )}
        <div className="flex">
          <p>
            หมู่เรียน <span style={{ color: "red" }}>*</span> :
          </p>
          <fieldset className="flex flex-row">
            <div className="ml-2">
              {ListSelect.map((item, index) => (
                <React.Fragment key={index}>
                  <input
                    className="mr-2"
                    type="radio"
                    name={i}
                    value={item.id}
                    id={i + "x" + item.id}
                    onChange={(e) => setSelectedRadio(e.target.value)}
                  />
                  <label className="mr-2" htmlFor={i + "x" + item.id}>
                    {item.name}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="mt-2">
          <label className="block mb-2 ">
            วันที่ต้องการเปิดสอน
            <span style={{ color: "red" }}>*</span>
          </label>
          <div className="flex items-center">
            <div className="flex items-center justify-end">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 120, height: 40 }}
                // value={statusSem}
                onChange={(e) => {
                  setDay(e.target.value);
                }}
              >
                <option value="" disabled selected hidden>
                  ---
                </option>
                <option value={7}>อาทิตย์</option>
                <option value={1}>จันทร์</option>
                <option value={2}>อังคาร</option>
                <option value={3}>พุธ</option>
                <option value={4}>พฤหัส</option>
                <option value={5}>ศุกร์</option>
                <option value={6}>เสาร์</option>
              </select>
              <FontAwesomeIcon
                icon={faArrowAltCircleDown}
                style={{
                  pointerEvents: "none",
                  marginLeft: -25,
                }}
              />
            </div>
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
              value={st}
              onChange={(e) => {
                setSt(e.target.value);
              }}
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
              value={et}
              onChange={(e) => {
                setEt(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="mt-2">
          <label className="block mb-2 ">
            จำนวนนิสิตที่เปิดรับ
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="โปรดระบุจำนวนนิสิตที่ต้องการเปิดรับ"
            value={N_people ? N_people : ""}
            style={{ width: "230px" }}
            required
            onChange={(e) => {
              setNPeople(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <BranchBox setall={setall} />
        </div>
      </div>
    </div>
  );
}
