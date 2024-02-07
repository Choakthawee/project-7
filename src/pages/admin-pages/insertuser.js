import React, { useState, useRef } from "react";
import "./insertuser.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { apiurl } from "../../config";
import * as XLSX from 'xlsx'; // Import XLSX library

const InsertUser = () => {
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(2);
  const [Sstatus, setSStatus] = useState(2);
  const [fileData, setFileData] = useState([]); // State to hold data from the Excel file

  const InsertDatabase = async () => {
    if (!name || !email || !status) {
      Swal.fire({
        title: "ผิดพลาด!",
        text: "กรอกข้อมูลให้ครบ",
        icon: "error",
        confirmButtonColor: "#134e4a",
      });
      return;
    }

    try {
      console.log(Sstatus);
      const responsedata = await axios.post(apiurl + "/api/user1", {
        email: email,
        name: name,
        id: Sstatus,
      });
      const data = responsedata.data;

      Swal.fire({
        title: "กรอกข้อมูลสำเร็จ!",
        text: data,
        icon: "success",
        confirmButtonColor: "#134e4a",
      });
    } catch (error) {
      Swal.fire({
        title: "กรอกข้อมูลผิดพลาด!",
        text: error.response.data,
        icon: "error",
        confirmButtonColor: "#134e4a",
      });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    if (e.target.value === "แอดมิน") {
      setSStatus(2);
    } else if (e.target.value === "ฝ่ายการศึกษา") {
      setSStatus(3);
    } else if (e.target.value === "อาจารย์") setSStatus(1);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Selected File:", selectedFile);
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(selectedFile);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const excelData = XLSX.utils.sheet_to_json(ws, { header: 1 });
        setFileData(excelData);
      };
    }
  };

  const handleSaveToDatabase = () => {
    fileData.forEach((row) => {
      if (row.length === 3) { // ตรวจสอบว่าแถวนั้นมีข้อมูล 3 คอลัมน์หรือไม่
        const [email, name, id] = row; // ดึงข้อมูล email, name, id จากแถวนั้น
        axios.post(apiurl + "/api/user1", { email, name, id })
          .then(response => {
            console.log('Data saved successfully:', response.data);
            Swal.fire({
              title: "บันทึกข้อมูลสำเร็จ!",
              text: "บันทึกข้อมูลลงฐานข้อมูลเรียบร้อยแล้ว",
              icon: "success",
              confirmButtonColor: "#134e4a",
            });
          })
          .catch(error => {
            console.error('Error saving data:', error);
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "ไม่สามารถบันทึกข้อมูลได้ โปรดลองอีกครั้ง",
              icon: "error",
              confirmButtonColor: "#134e4a",
            });
          });
      }
    });
  };


  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="backgroundinsert">
      <div className="bigbox">
        <div className="box-1 m-1 items-center justify-center h-screen">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="m-auto">
              <h1 className="text-header ">เพิ่มผู้ใช้งาน</h1>
            </div>
            <div className="mt-2">
              <p className="textinsert">
                ชื่อ-นามสกุล<span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Name"
                type="text"
                placeholder="กรุณากรอกชื่อ-นามสกุล"
                style={{ width: 500 }}
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="mt-3">
              <p className="textinsert">
                Email<span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="กรุณากรอก Email"
                style={{ width: 500 }}
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mt-3">
              <p className="textinsert">
                สถานะ<span style={{ color: "red" }}>*</span>
              </p>
              <div style={{ position: "relative" }}>
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  style={{ width: 500 }}
                  value={status}
                  onChange={handleStatusChange}
                >
                  <option>แอดมิน</option>
                  <option>ฝ่ายการศึกษา</option>
                  <option>อาจารย์</option>
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
            <div className="m-auto mt-5">
              <button
                className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                type="button"
                style={{
                  backgroundColor: "#134e4a",
                  width: 150,
                  justifyContent: "center",
                }}
                onClick={() => InsertDatabase()}
              >
                <p className="m-0 text-inbox" style={{ marginRight: "10px" }}>
                  ยืนยัน
                </p>
                <FontAwesomeIcon
                  icon={faSave}
                  className="mr-2"
                  style={{ fontSize: "24px" }}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="border-display items-center justify-center bg-gray-500"></div>
        <div className="box-2 ml-1 flex-col">
          <div className="flex justify-end">
            <Link
              to="/userinfo"
              className="mt-10 mr-40 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              style={{
                backgroundColor: "#134e4a",
                width: 130,
                height: "fit-content",
                textDecoration: "none",
              }}
            >
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                style={{
                  fontSize: "24px",
                  marginRight: "5px",
                }}
              />
              ย้อนกลับ
            </Link>
          </div>
          <div className="box-3 ml-20 mr-40 ">
            <div className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 box2-flex">
              <div className="m-auto">
                <h1 className="text-header ">เพิ่มผู้ใช้งานหลายคน</h1>
              </div>
              <div>
                <button
                  className="textimport mt-5 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                  type="button"
                  style={{
                    backgroundColor: "#ffffff",
                    width: 300,
                    border: "3px dashed black",
                  }}
                  onClick={handleClick}
                >
                  <FontAwesomeIcon icon={faFileImport} className="mr-2" />
                  <p className="m-0" style={{ marginLeft: "10px" }}>
                    Import Excel File
                  </p>
                </button>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>

              <div className="m-auto mt-5">
                <button
                  className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                  type="button"
                  style={{
                    backgroundColor: "#134e4a",
                    width: 150,
                    justifyContent: "center",
                  }}
                  onClick={handleSaveToDatabase} // Call handleSaveToDatabase function when clicking Save button
                >
                  <p className="m-0 text-inbox" style={{ marginRight: "10px" }}>
                    ยืนยัน
                  </p>
                  <FontAwesomeIcon
                    icon={faSave}
                    className="mr-2"
                    style={{ fontSize: "24px" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertUser;
