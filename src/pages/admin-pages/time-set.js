//กำหนดเวลา (แอดมิน)
import "./time-set.css";
import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { apiurl } from "../../config";

const TimeSet = () => {
  const [isChecked, setIsChecked] = useState(0);
  const [isRadioSelected, setIsRadioSelected] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  useEffect(() => {
    const getSystem = async () => {
      try {
        const responsedata = await axios.get(apiurl + "/api/admin/SystemGet");
        console.log(responsedata.data);
        const data = responsedata.data[0];
        setStartDate(data.S_date);
        setEndDate(data.E_date);
        setStartTime(data.S_time);
        setEndTime(data.E_time);
        setIsChecked(new Date(data.status));
      } catch (error) {
        alert(error.response.data);
      }
    };
    getSystem();
  }, []);
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    axios
      .post("http://localhost:4133/api/admin/System", {
        systemstatus: e.target.checked ? 1 : 0,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending data to the database:", error);
      });
  };
  const time = (date1) => {
    const date = new Date(date1);
    const offsetInHours = 7;
    date.setHours(date.getHours() + offsetInHours);
    const isoString = date.toISOString();
    return isoString;
  };
  const handleSaveTime = () => {
    console.log(startDate, endDate, startTime, endTime);

    if (startDate && endDate && startTime && endTime) {
      const requestData = {
        systemstatus: 1,
        S_date: time(startDate).slice(0, 10),
        E_date: time(endDate).slice(0, 10),
        S_time: startTime,
        E_time: endTime,
      };
      console.log(requestData);
      axios
        .post("http://localhost:4133/api/admin/System", requestData)
        .then((response) => {
          console.log("Save successful:", response.data);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    } else {
      console.error("Please complete all selections.");
    }
  };

  return (
    <div className="background">
      <div>
        <h1
          style={{
            flex: 1,
            // borderColor: "red",
            // borderWidth: 5,
          }}
          className="flex flex-col font-family font-bold text-4xl size-30 text-midgreen h1text-shadow mt-10 ml-10 "
        >
          เปิด/ปิด ระบบลงทะเบียน
        </h1>

        <div
          style={{
            flex: 1,
            // borderColor: "green",
            // borderWidth: 10,
          }}
          className="flex flex-col font-family mt-10 ml-10 font-bold text-xl size-30 "
        >
          <div class="flex items-center mb-4">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              className="w-4 h-4 text-green-800 bg-gray-100 border-gray-300 focus:ring-green-800 dark:focus:ring-green-800 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="default-radio-1" class="ms-2 text-l font-medium">
              ตั้งค่าระบบด้วยตนเอง
            </label>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={isChecked}
              onChange={(e) => {
                handleCheckboxChange(e);
              }}
            />
            <div
              className={`w-16 h-9 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-800 ${
                isChecked
                  ? "peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"
                  : ""
              } peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all dark:border-gray-600 peer-checked:bg-green-600`}
            ></div>
            <span className="ms-3 text-l font-medium text-gray-900 dark:text-green-800">
              เปิด
            </span>
          </label>
        </div>

        <div
          style={{
            flex: 1,
            // borderColor: "blue",
            // borderWidth: 10,
          }}
          className={`flex flex-col font-family mt-10 ml-10 font-bold text-xl size-30`}
        >
          <div class="flex items-center">
            <div class="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value=""
                name="default-radio"
                class="w-4 h-4 text-green-800 bg-gray-100 border-gray-300 focus:ring-green-800 dark:focus:ring-green-800 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-radio-1"
                class="ms-2 text-m font-medium text-gray-900 dark:text-black"
              >
                กำหนดเวลา
              </label>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              // borderColor: "yellow",
              // borderWidth: 5,
              flexDirection: "row",
            }}
          >
            <div
              style={{
                flex: 1,
                // borderColor: "green",
                // borderWidth: 5,
                marginTop: 15,
              }}
            >
              <p for="setStartDate" class="ms-1 font-medium text18">
                วันที่เปิด <span style={{ color: "red" }}>*</span>
              </p>
              <div date-rangepicker class="flex items-center">
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    ></svg>
                  </div>
                  <DatePicker
                    name="startDate"
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                    }}
                    placeholderText="MM/DD/YYYY"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-white dark:white dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <p for="setStartDate" class="mt-7 ms-1 font-medium text18">
                วันที่ปิด <span style={{ color: "red" }}>*</span>
              </p>
              <div>
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  ></svg>
                </div>
                <DatePicker
                  name="endDate"
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    console.log(endDate);
                  }}
                  placeholderText="MM/DD/YYYY"
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-white dark:border-white dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div
              style={{
                flex: 1,
                // borderColor: "green",
                // borderWidth: 5,
                marginLeft: 30,
                marginTop: 15,
              }}
            >
              <p class="ms-1 font-medium text18">
                เวลาที่เปิด <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="w-32 p-1 rounded-md font-medium"
                type="time"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);

                  console.log(startTime);
                }}
              />
              <p class="mt-8 ms-1 font-medium text18">
                เวลาที่ปิด <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="w-32 p-1 rounded-md font-medium"
                type="time"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  console.log(endTime);
                }}
              />
            </div>
          </div>
          <div
            style={{
              flex: 1,
              // borderColor: "red",
              // borderWidth: 5,
              marginTop: 30,
            }}
          >
            <button
              type="button"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleSaveTime}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSet;
