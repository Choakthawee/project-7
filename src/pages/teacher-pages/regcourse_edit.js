import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import "./reg-set.css";
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

const RegCourseEdit = () => {
  const userRole = localStorage.getItem("role_id");
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
  }, []);

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

  // const updateData = async () => {
  //   try {
  //     const getdata = await axios.post(
  //       apiurl + "/api/teacher/subjectsRegister",
  //       {
  //         id: ID,
  //         User_id: uid,
  //         st: st,
  //         et: et,
  //         day_id: day,
  //         sec: sec,
  //         status_id: status_id,
  //         N_people: N_people,
  //         branch: branch,
  //         category_id: category_id,
  //         Subjects_id: Subjects_id,
  //         realcredit: realcredit,
  //       }
  //     );
  //     const data = getdata.data;
  //     Swal.fire({
  //       icon: "success",
  //       title: "สำเร็จ",
  //       text: data.msg,
  //     });
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "ไม่สำเร็จ",
  //       text: error.response.data.msgerror,
  //     });
  //   }
  // };

  const updateData = async (data) => {
    try {
      const getdata = await axios.post(
        apiurl + "/api/teacher/subjectsRegister",
        data
      );
      const responseData = getdata.data;
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: responseData.msg,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ไม่สำเร็จ",
        text: error.response.data.msgerror,
      });
    }
  };

  const handleSwab = () => {
    navigate("/regcourse");
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

  const BranchCheckbox = ({ id, checked, onChange }) => {
    return (
      <div className="flex items-center me-4 justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-3"
        />
      </div>
    );
  };

  const BranchBox = ({ setall }) => {
    //เลือกสาขา
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedYears, setSelectedYears] = useState([]);
    const [selectedAll, setSelectedAll] = useState({});

    const handleBranchChange = (event) => {
      setSelectedBranch(event.target.value);
      setSelectedYears([]);
    };

    const handleYearChange = (event, year) => {
      const isChecked = event.target.checked;
      if (isChecked) {
        setSelectedYears([...selectedYears, year]);
      } else {
        setSelectedYears(selectedYears.filter((y) => y !== year));
      }
    };

    const handleConfirm = () => {
      if (selectedBranch && selectedYears.length > 0) {
        const options = selectedYears.map(
          (year) => `${selectedBranch}-${year}`
        );
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
          alert("คุณได้เลือกสาขาและปีนี้ไว้แล้ว");
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
          return updatedData;
        }
        return prevData;
      });
    };

    const handleClearAll = () => {
      setSelectedOptions([]);
      setall((prevData) => {
        const [branch] = selectedBranch.split("-");
        return { ...prevData, [branch]: [] };
      });
    };

    // const handleUpdateBranch = () => {
    //   const selectedData = {};
    //   for (const option of selectedOptions) {
    //     const [branch, year] = option.split("-");
    //     if (!selectedData[branch]) {
    //       selectedData[branch] = [];
    //     }
    //     selectedData[branch].push(Number(year));
    //   }
    //   console.log(selectedData);
    // };

    return (
      <div className="box-gray mt-1 mb-3">
        <div className="flex flex-col mt-2">
          <div>
            <label class="block mb-2 ">
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
                  <option value="" disabled selected hidden>
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
  };

  const GrayBox = ({ i, practice_t, lecture_t, exsub, sub_id }) => {
    const [ListSelect, setListSelect] = useState([]);
    const [selectedRadio, setSelectedRadio] = useState(Number);
    const [all, setall] = useState({});

    const [st, setSt] = useState([]);
    const [et, setEt] = useState([]);
    const [day, setDay] = useState([]);
    const [status_id, setStatusId] = useState([]);
    const [N_people, setNPeople] = useState([]);
    const [branch, setBranch] = useState({});
    const [category_id, setCategoryId] = useState([]);
    const [Subjects_id, setSubjectsId] = useState([]);
    const [realcredit, setRealCredit] = useState([]);

    useEffect(() => {
      console.log(all);
    }, [selectedRadio, all]);

    useEffect(() => {
      axios
        .get(apiurl + "/api/category")
        .then((response) => {
          console.log(response.data);
          setListSelect(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }, []);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await axios.get(
    //         apiurl + "/api/teacher/subjectsRegister" + id
    //       );
    //       const subjectData = response.data[0]; // สมมติว่าข้อมูลจาก API คือ object ของรายวิชาเดียว
    //       setSubjectData({
    //         credit: subjectData.credit,
    //         lecture_t: subjectData.lecture_t,
    //         practice_t: subjectData.practice_t,
    //         exsub: subjectData.exsub,
    //         sub_hour: "", // ต้องเพิ่มข้อมูลจำนวนชั่วโมงที่ต้องการเรียน
    //         selectedBranch: "", // ต้องเพิ่มข้อมูลสาขาที่เลือก
    //         selectedYears: [], // ต้องเพิ่มข้อมูลชั้นปีที่เลือก
    //         selectedOptions: [], // ต้องเพิ่มข้อมูลหมู่เรียนที่เลือก
    //         teachingSchedule: [], // ต้องเพิ่มข้อมูลตารางสอน
    //       });
    //     } catch (error) {
    //       console.error("Error fetching subject data: ", error);
    //     }
    //   };

    //   fetchData();
    // }, []);

    const handleUpdateData = () => {
      const data = {
        uid: localStorage.getItem("userid"),
        st: st,
        et: et,
        day_id: day,
        status_id: 2,
        N_people: N_people,
        branch: all,
        category_id: selectedRadio,
        Subjects_id: sub_id,
      };
      console.log(data);
      setGrayBoxData((prevData) => [...prevData, data]);
    };

    return (
      <div className="box-gray p-2">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h1 className="text-lg">หมู่เรียนที่ : {i + 1}</h1>
            <button onClick={() => handleDelete(i)}>
              <TiDelete size={28} />
            </button>
          </div>

          {exsub === 1 && (
            <div>
              <p>
                หน่วยกิต <span style={{ color: "red" }}>*</span>
              </p>
              <input
                placeholder="กรอกหน่วยกิตที่ต้องการ"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              ></input>
            </div>
          )}
          <div className="flex">
            <p>
              หมู่เรียน <span style={{ color: "red" }}>*</span> :
            </p>
            <fieldset className="flex flex-row">
              <div className="ml-2">
                {ListSelect.map((item, index) => (
                  <React.Fragment key={index}>
                    <input
                      className="mr-2"
                      type="radio"
                      name={i}
                      value={item.id}
                      onChange={(e) => setSelectedRadio(e.target.value)}
                    />
                    <label className="mr-2" htmlFor={item.id}>
                      {item.name}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </fieldset>
          </div>
          <div>
            <label className="block mb-2 ">
              จำนวนชั่วโมง <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="sub_hour"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={`โปรดระบุจำนวนชั่วโมงที่ใช้สอน ${
                lecture_t !== 0 ? "บรรยาย " + lecture_t + " ชั่วโมง" : ""
              } ${practice_t !== 0 ? "ปฏิบัติ " + practice_t : ""}`}
              required
            />
          </div>
          <div className="mt-2">
            <label className="block mb-2 ">
              วันที่ต้องการเปิดสอน
              <span style={{ color: "red" }}>*</span>
            </label>
            <div className="flex items-center">
              <div className="flex items-center justify-end">
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  style={{ width: 120, height: 40 }}
                  // value={statusSem}
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                >
                  <option value="" disabled selected hidden>
                    ---
                  </option>
                  <option value={7}>อาทิตย์</option>
                  <option value={1}>จันทร์</option>
                  <option value={2}>อังคาร</option>
                  <option value={3}>พุธ</option>
                  <option value={4}>พฤหัส</option>
                  <option value={5}>ศุกร์</option>
                  <option value={6}>เสาร์</option>
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
          <div className="flex flex-row mt-2">
            <div>
              <p>
                เวลาเริ่มสอน <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="w-32 p-1 rounded-md font-medium"
                type="time"
                value={st}
                onChange={(e) => {
                  setSt(e.target.value);
                }}
              ></input>
            </div>
            <div className="ml-5">
              <p>
                เวลาสิ้นสุดการสอน
                <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="w-32 p-1 rounded-md font-medium"
                type="time"
                value={et}
                onChange={(e) => {
                  setEt(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="mt-2">
            <label className="block mb-2 ">
              จำนวนนิสิตที่เปิดรับ
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="โปรดระบุจำนวนนิสิตที่ต้องการเปิดรับ"
              value={N_people}
              required
              onChange={(e) => {
                setNPeople(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <BranchBox setall={setall} />
          </div>
          <div>
            <button onClick={handleUpdateData}>Test</button>
          </div>
        </div>
      </div>
    );
  };

  const [data, setData] = useState([1]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const addbox = () => {
    setGrayBoxData((prevData) => {
      const newData = [...prevData, { grayBoxData }];
      return newData;
    });
  };

  if (userRole !== "1") {
    showAlert();
    return null;
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
                  {subject.credit ? subject.credit : "Error"}
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
              <div className="gap-3 flex flex-col text-lightgreen">
                <label htmlFor="add" for="add">
                  เพิ่มหมู่เรียน <span style={{ color: "red" }}>*</span>
                </label>
                <button id="add" onClick={() => addbox()}>
                  <FaCirclePlus size={20} />
                </button>
                {grayBoxData.map((val, i) => (
                  <GrayBox
                    key={val}
                    i={i}
                    exsub={subject.exsub}
                    sub_id={id}
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
export default RegCourseEdit;
