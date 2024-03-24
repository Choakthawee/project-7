import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Secadd from "./secadd";
import axios from "axios";
import { apiurl } from "../../config";
import BranchBox from "./regcourse_edit-component/BranchBox";
import GrayBox from "./regcourse_edit-component/GrayBox";

const ScheduleEdit = () => {
  const userRole = localStorage.getItem("role_id");
  const navigate = useNavigate();
  const { idreg } = useParams();
  const [subject, setSubject] = useState({});
  const [all, setall] = useState({});
  const [N_people, setNPeople] = useState(Number);
  const [ListSelect, setListSelect] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState();
  const [select, setSelect] = useState([]);
  const [id_category, setCategory] = useState();

  useEffect(() => {
    const getapi = async () => {
      const userid = localStorage.getItem("userid");
      console.log(all);
      try {
        const dataRespone = await axios.get(
          apiurl +
            "/api/teacher/schedule_edit?user_id=" +
            userid +
            "&idreg=" +
            idreg
        );
        const data = dataRespone.data;
        console.log(data);
        setSubject(data);
        setNPeople(data.N_people);
        console.log(data.branch);
        setall(data.branch);
        setSelectedRadio(data.categoty_id);
        Object.keys(data.branch).map((key) => {
          data.branch[key].map((v, i) => {
            setSelect((data) => [...data, `${key}-${v}`]);
            console.log(`${key}-${v}`);
          });
        });
      } catch (err) {
        alert(err.response.data.msg);
      }
    };
    getapi();
  }, []);

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
      const data = {
        id: idreg,
        uid: localStorage.getItem("userid"),
        N_people: N_people,
        branch: all,
      };
      console.log(data);
    };
    handleUpdateData();
  }, [idreg, N_people, all, selectedRadio]);
  const dochangeapi = async () => {
    if (Object.keys(all).length === 0) {
      Swal.fire({
        icon: "error",
        title: "แก้ไขรายวิชาไม่สำเร็จ",
        text: "กรุณาเลือกสาขาที่จะสอน",
      });
    } else {
      try {
        const getdata = await axios.put(apiurl + "/api/teacher/update_data", {
          idSubject: idreg,
          N_people: N_people,
          branch: all,
        });
        Swal.fire("แก้ไขรายวิชาสำเร็จ", "", "success").then(() => {
          window.location.href = "/schedule";
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "แก้ไขรายวิชาไม่สำเร็จ",
          text: error.response.data.msgerror,
        });
      }
    }
  };
  const updateData = async () => {
    try {
      Swal.fire({
        icon: "warning",
        title: "ยืนยันแก้ไขรายวิชา?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "บันทึก",
        confirmButtonColor: "green",
        denyButtonText: `ไม่บันทึก`,
        showCancelButton: false,
        text: "ยืนยันที่จะแก้ไข",
        color: "gray",
      }).then((result) => {
        if (result.isConfirmed) {
          dochangeapi();
        } else if (result.isDenied) {
          Swal.fire("ข้อมูลยังไม่ถูกบันทึก", "", "error");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwab = () => {
    navigate("/schedule");
  };

  const showAlert = () => {
    Swal.fire({
      icon: "error",
      title: "ข้อผิดพลาด",
      text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
    }).then((result) => {
      if (result.isConfirmed) {
        if (userRole === "2") {
          navigate("/userinfo");
        } else if (userRole === "3") {
          navigate("/imcourse");
        }
      }
    });
  };

  if (userRole !== "1") {
    showAlert();
    return null;
  }

  return (
    <div className="flex w-full h-full min-h-screen background21">
      <div className="flex w-full items-center overflow-y-scroll justify-center p-2 lg:p-10">
        <div className="flex w-full md:w-3/4 rounded-3xl bg-white h-full p-5 sm:p-10  ">
          <div className="flex flex-col  lg:flex-col w-full">
            <div className="flex">
              <div className="flex w-full">
                <button
                  type="button"
                  className="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  style={{
                    backgroundColor: "#134e4a",
                    width: 90,
                  }}
                  onClick={handleSwab}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="mr-1"
                    style={{ fontSize: "16px" }}
                  />
                  <p className="text-lg text-center"> Back </p>
                </button>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex flex-col w-full">
                <p className="text-2xl font-bold text-midgreen mt-2 p-2">
                  แก้ไขรายวิชา
                </p>
                <div className="flex flex-col w-2/4 ">
                  <label className="text-midgreen mb-1">
                    ชื่อรายวิชาที่สอน *
                  </label>
                  <p className="bg-gray-50  text-wrap border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex p-2.5">
                    {subject.name}
                  </p>
                </div>
                <div className="flex flex-col mt-1">
                  <label className="text-midgreen mb-1">
                    รหัสวิชา : {subject.idsubject}
                  </label>
                  <label className="text-midgreen mb-1">
                    จำนวนหน่วยกิต : {subject.credit}
                  </label>
                  <label className="text-midgreen mb-1">
                    หมวดวิชา : {subject.subc}
                  </label>
                  <label className="text-midgreen mb-1">
                    หมู่เรียน : {subject.category}
                  </label>
                  <label className="text-midgreen mb-1">
                    จำนวนชั่วโมง : {subject.lecture_t}
                  </label>
                </div>
                {/* <Secadd /> */}
                {/* <GrayBox></GrayBox> */}
                <div className=" w-2/4">
                  {select.length > 0 && (
                    <BranchBox
                      setall={setall}
                      select={select}
                      textColor=" text-midgreen"
                    >
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
                          required
                          onChange={(e) => {
                            setNPeople(e.target.value);
                          }}
                        />
                      </div>
                    </BranchBox>
                  )}
                </div>
                <div className="flex items-center mt-4">
                  <button
                    type="button"
                    className="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 bg-gradient-to-tr from-green-600  via-black  to-green-950 p-2 rounded-lg"
                    onClick={updateData}
                  >
                    <p className="text-lg text-center"> ยืนยันแก้ไขรายวิชา </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEdit;
