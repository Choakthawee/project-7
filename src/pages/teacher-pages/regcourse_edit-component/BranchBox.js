import { useEffect, useState } from "react";
import BranchCheckbox from "./BranchCheckbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaTimes } from "react-icons/fa";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function BranchBox({
  setall,
  textColor,
  all,
  select = [],
  children,
}) {
  //เลือกสาขา
  const [selectedOptions, setSelectedOptions] = useState(select);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedAll, setSelectedAll] = useState({ l: [1] });

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
    setSelectedYears([]);
  };
  useEffect(() => {
    if (all) {
      Object.entries();
    }
  }, []);
  const handleYearChange = (event, year) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedYears([...selectedYears, year]);
    } else {
      setSelectedYears(selectedYears.filter((y) => y !== year));
    }
  };

  const handleConfirm = () => {
    // เรียงลำดับ selectedYears จากน้อยไปมาก
    selectedYears.sort((a, b) => parseInt(a) - parseInt(b));
    // ทำสิ่งที่คุณต้องการกับ selectedYears ที่เรียงลำดับแล้ว
    console.log(selectedYears);
    if (selectedBranch && selectedYears.length > 0) {
      const options = selectedYears.map((year) => `${selectedBranch}-${year}`);
      const options1 = selectedYears.map((year) => Number(year));
      const newData = {
        [selectedBranch]: options1,
      };

      const duplicateOptions = options.filter((option) =>
        selectedOptions.includes(option)
      );
      if (duplicateOptions.length === 0) {
        setall((prevData) => {
          let newData = {};
          if (prevData[selectedBranch]) {
            // ถ้า key มีอยู่แล้วใน object ให้เพิ่มข้อมูลเข้าไปใน array ที่มีอยู่แล้ว
            newData = {
              ...prevData,
              [selectedBranch]: [...prevData[selectedBranch], ...options1],
            };
          } else {
            // ถ้า key ยังไม่มีอยู่ใน object ให้สร้าง key ใหม่พร้อมกับเพิ่มข้อมูลเข้าไปใน array
            newData = {
              ...prevData,
              [selectedBranch]: options1,
            };
          }
          return newData;
        });
        setSelectedOptions([...selectedOptions, ...options]);
      } else {
        // alert("คุณได้เลือกสาขาและปีนี้ไว้แล้ว");
        Swal.fire({
          position: "top",
          icon: "warning",
          title: "คุณได้เลือกสาขาและชั้นปีนี้ไว้แล้ว",
          showConfirmButton: false,
          width: 550,
          timer: 2000,
          timerProgressBar: true,
        });
      }
      setSelectedYears([]);
    }
  };

  const handleDeleteOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
    console.log(option);
    setall((prevData) => {
      const [branch, year] = option.split("-");
      if (prevData[branch]) {
        const updatedData = {
          ...prevData,
          [branch]: prevData[branch].filter((item) => item !== Number(year)),
        };
        // ถ้าข้อมูลใน branch มีความยาวเท่ากับ 0 ให้ลบ key นั้นออกจาก prevData
        if (updatedData[branch].length === 0) {
          delete updatedData[branch];
        }
        return updatedData;
      }
      return prevData;
    });
  };

  const handleClearAll = () => {
    setSelectedOptions([]);
    setall((prevData) => {
      const [branch] = selectedBranch.split("-");
      return {};
    });
  };

  return (
    <div className={"box-gray mt-1 mb-3 " + textColor}>
      {children}
      <div className="flex flex-col mt-2">
        <div>
          <label className="block mb-2 ">
            สาขาที่เปิดสอน <span style={{ color: "red" }}>*</span>
          </label>
          <div className="flex">
            <div className="flex items-center justify-end">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 120, height: 40 }}
                value={selectedBranch}
                // onChange={(e) => {
                //   handleBranchChange(e.target.value);
                // }}
                onChange={handleBranchChange}
              >
                <option value="" disabled hidden>
                  ---
                </option>
                <option>T05</option>
                <option>T12</option>
                <option>T13</option>
                <option>T14</option>
                <option>T17</option>
                <option>T18</option>
                <option>T19</option>
                <option>T20</option>
                <option>T21</option>
                <option>T22</option>
                <option>T23</option>
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
        <div className="mt-5">
          <p>
            ชั้นปีที่เปิดรับ(เลือกได้มากกว่า 1)
            <span style={{ color: "red" }}>*</span>
          </p>
          <div className="flex flex-row">
            <div className="mt-2">
              <div className="flex flex-row mb-1">
                <BranchCheckbox
                  id={`bcb1`}
                  checked={selectedYears.includes("1")}
                  onChange={(e) => handleYearChange(e, "1")}
                />
                <label htmlFor={`bcb1`}>ชั้นปี 1</label>
              </div>
              <div className="flex flex-row mb-1">
                <BranchCheckbox
                  id={`bcb2`}
                  checked={selectedYears.includes("2")}
                  onChange={(e) => handleYearChange(e, "2")}
                />
                <label htmlFor={`bcb2`}>ชั้นปี 2</label>
              </div>
              <div className="flex flex-row mb-1">
                <BranchCheckbox
                  id={`bcb3`}
                  checked={selectedYears.includes("3")}
                  onChange={(e) => handleYearChange(e, "3")}
                />
                <label htmlFor={`bcb3`}>ชั้นปี 3</label>
              </div>
              <div className="flex flex-row mb-1">
                <BranchCheckbox
                  id={`bcb4`}
                  checked={selectedYears.includes("4")}
                  onChange={(e) => handleYearChange(e, "4")}
                />
                <label htmlFor={`bcb4`}>ชั้นปี 4</label>
              </div>
            </div>
            <div className="mt-2 ml-3">
              <div className="flex flex-row mb-1">
                <BranchCheckbox
                  id={`bcb5`}
                  checked={selectedYears.includes("5")}
                  onChange={(e) => handleYearChange(e, "5")}
                />
                <label htmlFor={`bcb5`}>ชั้นปี 5</label>
              </div>
              <div className="flex flex-row mb-1">
                <BranchCheckbox
                  id={`bcb6`}
                  checked={selectedYears.includes("6")}
                  onChange={(e) => handleYearChange(e, "6")}
                />
                <label htmlFor={`bcb6`}>ชั้นปี 6</label>
              </div>
              <div className="flex flex-row mb-1">
                <BranchCheckbox
                  id={`bcb7`}
                  checked={selectedYears.includes("7")}
                  onChange={(e) => handleYearChange(e, "7")}
                />
                <label htmlFor={`bcb7`}>ชั้นปี 7</label>
              </div>
              <div className="flex flex-row mb-1">
                <BranchCheckbox
                  id={`bcb8`}
                  checked={selectedYears.includes("8")}
                  onChange={(e) => handleYearChange(e, "8")}
                />
                <label htmlFor={`bcb8`}>ชั้นปี 8</label>
              </div>
            </div>
          </div>
          <button
            onClick={handleConfirm}
            className="bg-lightgreen text-white hover:bg-white hover:text-gray-300 font-bold py-1 px-4 rounded mt-3"
          >
            ตกลง
          </button>
        </div>
      </div>
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap mt-3">
          {selectedOptions.map((option) => (
            <div key={option} className="flex items-center mr-4">
              <p className="text-midgreen">{option}</p>
              <FaTimes
                className="ml-2 cursor-pointer text-red-500"
                onClick={() => handleDeleteOption(option)}
              />
            </div>
          ))}
          <button
            onClick={handleClearAll}
            className="bg-red-500 w-20 h-6 text-white py-1 rounded mt-1 mb-1 text-xs"
          >
            ลบทั้งหมด
          </button>
        </div>
      )}
    </div>
  );
}
