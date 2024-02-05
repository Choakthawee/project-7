import React, { useState, useRef } from "react";
import "./insertuser.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
const InsertUser = () => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Selected File:", selectedFile);
      // Perform actions with the selected file, such as reading its content
    }
  };

  const handleClick = () => {
    // Trigger a click event on the hidden file input
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
        <div class="border-display items-center justify-center bg-gray-500"></div>
        <div className="box-2 ml-1 flex-col">
          <div className="flex justify-end">
            <Link
              to="/userinfo" // Replace "/other-page" with the actual path of the page you want to navigate to
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
                style={{ fontSize: "24px", marginRight: "5px" }}
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
