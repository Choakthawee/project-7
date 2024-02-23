import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import "./reg-set.css";

function Secadd() {
  const [showSecondSelect, setShowSecondSelect] = useState(false);

  const handleFirstSelectChange = (event) => {
    setShowSecondSelect(event.target.value !== "");
  };

  return (
    <div className="flex flex-col border-4 border-red-500 rounded-3xl bg-gray-200 p-2">
      <div className="flex flex-col text-midgreen">
        <p style={{ textAlign: "left" }}>
          หมู่เรียน <span style={{ color: "red" }}>*</span> :
        </p>
        <fieldset className="flex flex-row mb-2" style={{ textAlign: "left" }}>
          <div className="ml-2">
            <input type="checkbox" id="lec"></input>
            <label htmlFor="lec" className="ml-1 text-midgreen">
              บรรยาย
            </label>
          </div>
          <div className="ml-2">
            <input type="checkbox" id="lab"></input>
            <label htmlFor="lab" className="ml-1 text-midgreen">
              ปฏิบัติ
            </label>
          </div>
        </fieldset>
      </div>

      <div>
        <label className="block mb-2 text-midgreen">
          จำนวนชั่วโมง{" "}
          <span style={{ color: "red", textAlign: "left" }}>*</span>
        </label>
        <input
          type="text"
          id="sub_hour"
          className="bg-gray-50 border border-gray-300 text-midgreen text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 h-10 p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="โปรดระบุจำนวนชั่วโมงที่ใช้สอน"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-midgreen ">
          จำนวนนิสิตที่เปิดรับ
          <span style={{ color: "red", textAlign: "left" }}>*</span>
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-midgreen text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="โปรดระบุจำนวนนิสิตที่ต้องการเปิดรับ"
          required
        />
      </div>
      <div className="flex mr-3 mt-1">
        <label className="text-midgreen mb-1">
          สาขาที่เปิดรับ :
          <FontAwesomeIcon
            icon={faPlusSquare}
            className="ml-2"
            style={{ fontSize: "16px" }}
          />
        </label>
      </div>
      <div className="flex mr-3 mt-1">
        <select
          id="first-select"
          data-te-select-init
          className="form-select appearance-none py-2 px-4 border rounded bg-white shadow-md"
          onChange={handleFirstSelectChange}
        >
          <option value="">กรุณาเลือก</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">Five</option>
          <option value="6">Six</option>
          <option value="7">Seven</option>
          <option value="8">Eight</option>
        </select>

        {showSecondSelect && (
          <div className="relative inline-block text-left">
            <select
              id="second-select"
              data-te-select-init
              multiple
              className="form-multiselect form-select appearance-none py-2 px-4 border rounded bg-white shadow-md focus:ring-0"
            >
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
              <option value="6">Six</option>
              <option value="7">Seven</option>
              <option value="8">Eight</option>
            </select>
            <label
              data-te-select-label-ref
              className="absolute top-0 right-0 flex items-center px-2 py-1 text-xs font-bold text-gray-700 uppercase"
            >
              Example label
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default Secadd;
