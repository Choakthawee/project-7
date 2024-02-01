//กำหนดเวลา (แอดมิน)
import "./time-set.css";
import "./text.css";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';


const TimeSet = () => {
    const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className="background">
      <div>
        <h1
          style={{
            flex: 1,
            borderColor: "red",
            borderWidth: 5,
          }}
          className="flex flex-col font-family mt-10 ml-10 font-bold text-xl size-30 "
        >
          เปิด/ปิด ระบบลงทะเบียน
        </h1>

        <div
          style={{
            flex: 1,
            borderColor: "green",
            borderWidth: 10,
          }}
        >
          <div class="flex items-center mb-4">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-1"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Default radio
            </label>
          </div>
          <p>jjjjjjjj</p>
          <p>jjjjjjjj</p>
          <p>jjjjjjjj</p>
          <p>jjjjjjjj</p>
          <p>jjjjjjjj</p>
        </div>

        <div
          style={{
            flex: 1,
            flexDirection : "row",
            borderColor: "blue",
            width : "100%",
            borderWidth: 10,
          }}
        >
          <div class="flex items-center">
            <input
              checked
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-2"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Checked state
            </label>
          </div>
          <div class="1E1E1E font-bold text-15 ">
          วันที่เปิด*
          </div>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            </div>
            
            <DatePicker
            showIcon
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholderText="Select date"
            />
          </div>
          <div class="1E1E1E font-bold text-15 justify-end">
          เวลาที่เปิด*
          </div>
          <p>mmmmmmm</p>
        </div>
      </div>
    </div>
  );
};
export default TimeSet;
