import React, { useState, useEffect } from "react";
import "./insertuser.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { apiurl } from "../../config";
import { LockIcon } from "lucide-react";

const User_edit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(2);
  const { id } = useParams();
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();
  const Nev = useNavigate()
  const [Lock,setLock] = useState(0);
  const [datas,setData] = useState([]);
  useEffect(() => {
    const getapi = async () => {
      try {
        const getdata = await axios.get(apiurl + "/api/admin/user/" + id);
        const data = getdata.data[0];
        setName(data.name);
        setEmail(data.email);
        setStatus(data.role_id);
        if(localStorage.getItem("email")===data.email){
          setLock(1);
          alert("ไม่สามารถแก้ไขตัวเองได้")
        }
        const getdata1 = await axios.get(apiurl + "/api/setting/role");
        const data1 = getdata1.data;
        console.log(data1);
        setData(data1);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error.response.data.msgerror,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          alert(error.response.data.msgerror)
          Nev(-1);
        })
      }
    }
    getapi();
  }, [Nev,id])
  const showAlert = () => {
    Swal.fire({
      icon: "error",
      title: "ข้อผิดพลาด",
      text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
    }).then((result) => {
      if (result.isConfirmed) {
        if (userRole === "3") {
          navigate("/imcourse");
        } else if (userRole === "1") {
          navigate("/schedule");
        }
      }
    });
  };

  if (userRole !== "2") {
    showAlert();
    return null;
  }

  const updateData = async () => {
    try {
      const getdate = await axios.post(apiurl + "/api/admin/userupdate", { id: id, email: email, name: name, role_id: status })
      const data = getdate.data;
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: data.msg
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ไม่สำเร็จ",
        text: error.response.data.msgerror
      })
    }

  }


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
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
              แก้ไขบัญชีผู้ใช้
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
              className="shadow w-full xl:w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                {datas.map((v,i)=>(
                  <option key={i} value={v.id}>{v.name}</option>
                ))}
               
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
              onClick={() => {if(!Lock){updateData() }else{
                alert("ห้ามแก้จ้า")
              }}}
            >
              <p className="m-0 " style={{ marginRight: "10px" }}>
                ยืนยัน
              </p>
              {Lock===0? <FontAwesomeIcon
                icon={faSave}
                className="mr-2  "
                style={{ fontSize: "24px" }}
              /> : <LockIcon></LockIcon>}
             
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_edit;
