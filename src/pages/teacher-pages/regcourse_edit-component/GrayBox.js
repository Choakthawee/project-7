import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiurl } from "../../../config";
import BranchBox from "./BranchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";

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
  const [selectedTime, setSelectedTime] = useState("07:00");
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
  const [st, setSt] = useState(data.st ? data.st : "");
  const [et, setEt] = useState(data.et ? data.et : "");
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

  useEffect(() => {
    const handleUpdateData = () => {
      if (!st || !et) {
        // ถ้า st หรือ et ยังไม่ถูกกรอกให้ไม่ทำอะไรเลย
        return;
      }

      if (st >= et) {
        const initialTime = "--:--";
        // alert("เวลาเริ่มสอนต้องน้อยกว่าเวลาสิ้นสุดการสอน");
        Swal.fire({
          position: "top",
          icon: "warning",
          title: "เวลาเริ่มสอนต้องน้อยกว่าเวลาสิ้นสุดการสอน",
          showConfirmButton: false,
          width: 650,
          timer: 2000,
          timerProgressBar: true,
        });
        setSt("");
        setEt("");
        return;
      }

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
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                }}
              >
                <option value="">---</option>
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

        <div className="flex flex-row mt-2 mb-3">
          <div className="flex flex-col">
            <p className="mb-2">
              เวลาเริ่มสอน <span style={{ color: "red" }}>*</span>
            </p>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              style={{ width: 120, height: 40 }}
              value={st}
              onChange={(e) => {
                setSt(e.target.value);
              }}
            >
              <option value="" disabled hidden>
                ---
              </option>
              <option>07:00</option>
              <option>07:30</option>
              <option>08:00</option>
              <option>08:30</option>
              <option>09:00</option>
              <option>09:30</option>
              <option>10:00</option>
              <option>10:30</option>
              <option>11:00</option>
              <option>11:30</option>
              <option>12:00</option>
              <option>12:30</option>
              <option>13:00</option>
              <option>13:30</option>
              <option>14:00</option>
              <option>14:30</option>
              <option>15:00</option>
              <option>15:30</option>
              <option>16:00</option>
              <option>16:30</option>
              <option>17:00</option>
              <option>17:30</option>
              <option>18:00</option>
              <option>18:30</option>
              <option>19:00</option>
              <option>19:30</option>
              <option>20:00</option>
              <option>20:30</option>
              <option>21:00</option>
              <option>21:30</option>
              <option>22:00</option>
            </select>
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              style={{
                pointerEvents: "none",
                marginLeft: 80,
                marginTop: -27,
              }}
            />
            {/* <input
              className="w-32 p-1 rounded-md font-medium"
              type="time"
              value={st}
              min="07:00"
              max="22:00"
              onChange={handleTimeChange}
            ></input> */}
          </div>
          <div className="flex flex-col ml-5">
            <p className="mb-2">
              เวลาสิ้นสุดการสอน
              <span style={{ color: "red" }}>*</span>
            </p>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              style={{ width: 120, height: 40 }}
              value={et}
              onChange={(e) => {
                setEt(e.target.value);
              }}
            >
              <option value="" disabled hidden>
                ---
              </option>
              <option>07:00</option>
              <option>07:30</option>
              <option>08:00</option>
              <option>08:30</option>
              <option>09:00</option>
              <option>09:30</option>
              <option>10:00</option>
              <option>10:30</option>
              <option>11:00</option>
              <option>11:30</option>
              <option>12:00</option>
              <option>12:30</option>
              <option>13:00</option>
              <option>13:30</option>
              <option>14:00</option>
              <option>14:30</option>
              <option>15:00</option>
              <option>15:30</option>
              <option>16:00</option>
              <option>16:30</option>
              <option>17:00</option>
              <option>17:30</option>
              <option>18:00</option>
              <option>18:30</option>
              <option>19:00</option>
              <option>19:30</option>
              <option>20:00</option>
              <option>20:30</option>
              <option>21:00</option>
              <option>21:30</option>
              <option>22:00</option>
            </select>
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              style={{
                pointerEvents: "none",
                marginLeft: 80,
                marginTop: -27,
              }}
            />
            {/* <input
              className="w-32 p-1 rounded-md font-medium"
              type="time"
              value={et}
              onChange={(e) => {
                setEt(e.target.value);
              }}
            ></input> */}
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
