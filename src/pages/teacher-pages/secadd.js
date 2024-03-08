import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./reg-set.css";

function Secadd() {
  const [showSecondSelect, setShowSecondSelect] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
    setSelectedYears([]);
    setShowSecondSelect(true);
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    if (
      !selectedYears.includes(year) &&
      !selectedOptions.includes(`${selectedBranch}-${year}`)
    ) {
      setSelectedYears([...selectedYears, year]);
    } else if (
      selectedYears.includes(year) &&
      !selectedOptions.includes(`${selectedBranch}-${year}`)
    ) {
      setSelectedYears(
        selectedYears.filter((selectedYear) => selectedYear !== year)
      );
    }
  };

  const handleConfirm = () => {
    if (selectedBranch && selectedYears.length > 0) {
      const options = selectedYears.map((year) => `${selectedBranch}-${year}`);
      const duplicateOptions = options.filter((option) =>
        selectedOptions.includes(option)
      );
      if (duplicateOptions.length === 0) {
        setSelectedOptions([...selectedOptions, ...options]);
      } else {
        alert("คุณได้เลือกสาขาและปีนี้ไว้แล้ว");
      }
      setSelectedYears([]);
      setShowSecondSelect(false);
    }
  };

  const handleDeleteOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  const handleClearAll = () => {
    setSelectedOptions([]);
  };

  return (
    <div className="flex flex-col w-full sm:w-80 rounded-md bg-gray-200 p-2 -ml-1 mt-2">
      <div>
        <label className="block mb-2 mt-2 text-midgreen ">
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

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mr-3 mt-1">
        <label className="text-midgreen mb-1">
          สาขาที่เปิดรับ :
          <FontAwesomeIcon
            icon={faPlusSquare}
            className="ml-2 cursor-pointer"
            style={{ fontSize: "16px" }}
            onClick={() => setShowSecondSelect(!showSecondSelect)}
          />
        </label>
        {showSecondSelect && (
          <div className="flex flex-row  ">
            <div className="flex flex-col w-42 h-12">
              <select
                value={selectedBranch}
                onChange={handleBranchChange}
                className=" ml-2 bg-gray-50 border border-gray-300 text-midgreen text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 flex "
              >
                <option value="">กรุณาเลือกสาขา</option>
                <option value="T8">T8</option>
                <option value="T9">T9</option>
                <option value="T10">T10</option>
                <option value="T11">T11</option>
              </select>
              <button
                onClick={handleConfirm}
                className=" w-16 h-7 ml-2 sm:ml-10 bg-green-500 text-white px-3 py-1 rounded mt-2 sm:mt-0"
              >
                ยืนยัน
              </button>
            </div>
            <div className="flex flex-col ">
              <select
                value={selectedYears}
                onChange={handleYearChange}
                className="ml-2 bg-gray-50 border border-gray-300 text-midgreen text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                multiple
              >
                <option value=" " disabled>
                  กรุณาเลือกปี
                </option>
                {[...Array(8).keys()].map((year) => (
                  <option key={year + 1} value={year + 1}>
                    {year + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap">
          {selectedOptions.map((option) => (
            <div key={option} className="flex items-center mr-4 mb-2">
              <p className="text-midgreen">{option}</p>
              <FontAwesomeIcon
                icon={faTrash}
                className="ml-2 cursor-pointer text-red-500"
                onClick={() => handleDeleteOption(option)}
              />
            </div>
          ))}
          <button
            onClick={handleClearAll}
            className="bg-red-500 w-12 h-6 text-white py-1 rounded mt-1 mb-1 text-xs"
          >
            ลบหมด
          </button>
        </div>
      )}
    </div>
  );
}

export default Secadd;
