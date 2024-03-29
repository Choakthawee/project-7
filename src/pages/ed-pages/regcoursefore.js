import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import "../teacher-pages/reg-set.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaTimes } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import { apiurl } from "../../config";
import GrayBox from "../teacher-pages/regcourse_edit-component/GrayBox";
import SearchingBar from "../component/searchBar";

const RegCourseEditFore = () => {
  const userRole = localStorage.getItem("role_id");
  const [searching, setSearching] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [subject, setSubject] = useState({});
  const [errormsg, setErrorMsg] = useState({});
  const [collectData, setCollectData] = useState({});
  const [grayBoxData, setGrayBoxData] = useState([]);

  useEffect(() => {
    const getdataApi = async () => {
      try {
        const dataRespone = await axios.get(
          apiurl + "/api/teacher/subject/" + id
        );
        const data = dataRespone.data;
        setSubject(data[0]);
        console.log(data);
      } catch (error) {
        if (error.response.data.msgerror) alert(error.response.data.msgerror);
        if (error.response.data.msgerrortime)
          alert(error.response.data.msgerrortime);
      }
    };
    getdataApi();
    localStorage.removeItem("user_idfore");
    setSearchInput("");
  }, []);
  useEffect(() => {
    console.log(grayBoxData);
  }, [grayBoxData]);
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
  const updateData = async () => {
    const userId = localStorage.getItem("user_idfore");
    if (genkey <= 0) {
      Swal.fire({
        icon: "error",
        title: "กรุณาเพิ่มหมู่เรียน",
        text: "กรุณาเพิ่มหมู่เรียนอย่างน้อย 1 หมู่เรียน",
      });
    }
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกชื่ออาจารย์",
        text: "กรุณากรอกชื่ออาจารย์ผู้สอน",
      });
    } else {
      if (
        grayBoxData.some((item) =>
          Object.values(item).some(
            (value) => value === null || value === undefined || value === ""
          )
        ) ||
        grayBoxData.some(
          (item) => !item.branch || Object.keys(item.branch).length === 0
        )
      ) {
        Swal.fire({
          icon: "error",
          title: "ไม่สำเร็จ",
          text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        });
        return;
      } else {
        try {
          const getdata = await axios.post(
            apiurl + "/api/teacher/registersubject",
            { subjects: grayBoxData, m: 1 }
          );
          const responseData = getdata.data;
          console.log(responseData);

          Swal.fire({
            icon: "success",
            title: "ยืนยันบันทึกการลงทะเบียน?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "บันทึก",
            confirmButtonColor: "green",
            denyButtonText: `ไม่บันทึก`,
            showCancelButton: false,
            text: responseData.msg,
            color: "gray",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("ลงทะเบียนรายวิชาสำเร็จ", "", "success").then(() => {
                window.location.href = "/regresults_ed";
              });
            } else if (result.isDenied) {
              Swal.fire("ข้อมูลยังไม่ถูกบันทึก", "", "error");
            }
          });
        } catch (error) {
          console.log(error);
          const strdataerror = error.response.data.error?.join(", ");
          Swal.fire({
            icon: "error",
            title: "ไม่สำเร็จ",
            text: strdataerror + "ของอาจารย์คุณลงให้",
          });
        }
      }


    }
  };

  const handleSwab = () => {
    navigate("/regresults_ed");
  };

  const handleDelete = (i) => {
    setGrayBoxData((prevData) => {
      const newData = [...prevData];
      newData.splice(i, 1);
      return newData;
    });
  };

  const SectionRadio = ({ id, checked, onChange }) => {
    return (
      <div>
        <input type="radio" name="default-radio" id={id} />
      </div>
    );
  };

  const handleCommit = () => {
    console.log(subject);
  };

  const [data, setData] = useState([1]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  const [genkey, setGenkey] = useState(Number);
  const addbox = () => {
    if (localStorage.getItem("user_idfore")) {
      setGrayBoxData((prevData) => {
        const newData = [
          ...prevData,
          {
            keys: genkey,
            uid: localStorage.getItem("user_idfore"),
            st: null,
            et: null,
            day_id: null,
            status_id: 2,
            N_people: null,
            branch: null,
            category_id: null,
            Subjects_id: id,
            realcredit: null,
          },
        ];

        return newData;
      });
      setGenkey(genkey + 1);
    } else {
      Swal.fire("เลือกอาจารย์ด้วย");
    }
  };

  if (userRole !== "1") {
    if (userRole !== "3") {
      showAlert();
      return null;
    }
  }

  return (
    <div className="background21 w-full">
      <div className="flex p-2 gap-2 w-full min-h-screen lg:h-screen flex-col lg:flex-row lg:p-10 lg:gap-10">
        <div className=" -z-6 justify-end flex text-inbox">
          <button
            className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center "
            style={{
              backgroundColor: "#134e4a",
              width: 140,
              height: "fit-content",
              textDecoration: "none",
            }}
            onClick={() => handleSwab()}
          >
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              style={{ fontSize: "24px", marginRight: "5px" }}
            />
            ย้อนกลับ
          </button>
        </div>
        {/* กล่องขาวครอบสำหรับกรอกข้อมูล */}
        <div className="flex flex-col w-full bg-white rounded-lg overflow-y-auto">
          <div className="p-4 gap-3 flex flex-col md:p-10">
            <h1 className="font-bold text-2xl text-lightgreen">
              ลงทะเบียนรายวิชา
            </h1>
            <div className="flex flex-col gap-3 text-sm font-medium text-gray-900 dark:text-black">
              <div>
                <label className="block mb-2">ชื่อรายวิชา</label>
                <p className="text-xl text-gray-300">
                  {subject.name ? subject.name : "Error"}
                </p>
              </div>
              <div className="flex ">
                <p className="mr-3">รหัสวิชา : </p>
                <p className="text-gray-300">
                  {subject.idsubject ? subject.idsubject : "Error"}
                </p>
              </div>
              <div className="flex ">
                <p className="mr-3">จำนวนหน่วยกิต :</p>
                <p className="text-gray-300">
                  {subject.credit
                    ? subject.exsub === 0
                      ? `${subject.credit} (${subject.lecture_t}-${subject.practice_t}-${subject.m_t})`
                      : subject.credit
                    : "Error"}
                </p>
              </div>
              <div className="flex ">
                <p className="mr-3">หมวดวิชา :</p>
                <p className="text-gray-300">
                  {subject.subject_category
                    ? subject.subject_category
                    : "Error"}
                </p>
              </div>
              <SearchingBar
                searching={searching}
                setSearching={setSearching}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                url={"/api/searchingnameteacher/"}
                title="กรอกชื่ออาจารย์ หรือ email"
                placeholder="ชื่อหรือemail"
              ></SearchingBar>
              <div className="gap-3 flex flex-col text-lightgreen">
                <label htmlFor="add">
                  เพิ่มหมู่เรียน <span style={{ color: "red" }}>*</span>
                </label>
                <button id="add" onClick={() => addbox()}>
                  <FaCirclePlus size={20} />
                </button>
                {grayBoxData.map((val, i) => (
                  <GrayBox
                    key={val.keys}
                    keys={val.keys}
                    data={val}
                    uid={val.uid}
                    i={i}
                    exsub={subject.exsub}
                    sub_id={id}
                    setGrayBoxData={setGrayBoxData}
                    handleDelete={handleDelete}
                  ></GrayBox>
                ))}
              </div>
              <div className="flex flex-col items-center">
                <button
                  className="bg-lightgreen text-xl text-white hover:bg-white hover:text-gray-300 font-bold py-3 px-10 rounded mt-3 items-center"
                  onClick={updateData}
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegCourseEditFore;
