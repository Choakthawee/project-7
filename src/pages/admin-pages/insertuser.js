import React, { useState, useRef } from "react";
import "./insertuser.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { apiurl } from "../../config";
import * as XLSX from "xlsx";

const InsertUser = () => {
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(2);
  const [Sstatus, setSStatus] = useState(2);
  const [fileData, setFileData] = useState([]);

  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  const [selectedFileName, setSelectedFileName] = useState(null);
  const showAlert = () => {
    Swal.fire({
      icon: "error",
      title: "ข้อผิดพลาด",
      text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
    }).then((result) => {
      if (result.isConfirmed) {
        if (userRole === "education department") {
          navigate("/imcourse");
        } else if (userRole === "teacher") {
          navigate("/schedule");
        }
      }
    });
  };

  if (userRole !== "admin") {
    showAlert();
    return null;
  }

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
      setSelectedFileName(selectedFile.name);
      console.log("Selected File:", selectedFile);
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(selectedFile);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const excelData = XLSX.utils.sheet_to_json(ws, { header: 1 });
        setFileData(excelData);
      };
    }
  };

  const handleSaveToDatabase = () => {
    fileData.forEach((row) => {
      if (row.length === 3) {
        // ตรวจสอบว่าแถวนั้นมีข้อมูล 3 คอลัมน์หรือไม่
        const [email, name, id] = row; // ดึงข้อมูล email, name, id จากแถวนั้น
        axios
          .post(apiurl + "/api/user1", { email, name, id })
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            Swal.fire({
              title: "บันทึกข้อมูลสำเร็จ!",
              text: "บันทึกข้อมูลลงฐานข้อมูลเรียบร้อยแล้ว",
              icon: "success",
              confirmButtonColor: "#134e4a",
            });
          })
          .catch((error) => {
            console.error("Error saving data:", error);
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
    <div className="backgroundinsert p-5 flex-col gap-3">
      <div className="flex flex-row justify-end">
        <Link
          to="/userinfo"
          className=" text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center "
          style={{
            backgroundColor: "#134e4a",
            width: 140,
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
      <div className="flex flex-col w-full md:flex-row items-end md:justify-center gap-8 overflow-y-auto md:items-center h-full">
        <div className="bg-white shadow-md rounded w-full md:w-1/2 p-8 ">
          <div className="m-auto">
            <h1 className="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow ">
              เพิ่มผู้ใช้งาน
            </h1>
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
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mt-3">
            <p className="textinsert">
              Email<span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="shadow w-full xl:w-96 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="กรุณากรอก Email"
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
          <div className="m-auto mt-5 text-inbox">
            <button
              className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center text-inbox"
              type="button"
              style={{
                backgroundColor: "#134e4a",
                width: 150,
                justifyContent: "center",
              }}
              onClick={() => InsertDatabase()}
            >
              <p className="m-0 " style={{ marginRight: "10px" }}>
                ยืนยัน
              </p>
              <FontAwesomeIcon
                icon={faSave}
                className="mr-2  "
                style={{ fontSize: "24px" }}
              />
            </button>
          </div>
        </div>
        <div className="visible flex h-1 w-full md:h-3/5 md:w-1  rounded-full  bg-gray-500"></div>
        <div className="flex items-center w-full md:w-1/2">
          <div className=" bg-white shadow-md rounded w-full px-8 pt-6 pb-8 flex gap-5  flex-col ">
            <div className="mt-1">
              <h1 className="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow  ">
                เพิ่มผู้ใช้งานหลายคน
              </h1>
            </div>
            <div className="import-file">
              <button
                className="textimport mt-5 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                type="button"
                style={{
                  backgroundColor: "#ffffff",
                  border: "3px dashed black",
                }}
                onClick={handleClick}
              >
                <FontAwesomeIcon icon={faFileImport} className="mr-2" />
                <p className="m-0 " style={{ marginLeft: "10px" }}>
                  Import Excel File
                </p>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-1 relative">
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-xl ml-3 mt-1"
              />
              <p className="ml-3 ">{selectedFileName}</p>
            </div>
            <div className="flex flex-row justify-start">
              <div className="text-inbox ">
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
                  <p className="m-0 " style={{ marginRight: "10px" }}>
                    ยืนยัน
                  </p>
                  <FontAwesomeIcon
                    icon={faSave}
                    className="mr-2 "
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
