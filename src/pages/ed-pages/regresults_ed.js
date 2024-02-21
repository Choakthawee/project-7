import "./regresults_ed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const RegResultED = () => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  const showAlert = () => {
    Swal.fire({
      icon: "error",
      title: "ข้อผิดพลาด",
      text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
    }).then((result) => {
      if (result.isConfirmed) {
        if (userRole === "admin") {
          navigate("/userinfo");
        } else if (userRole === "teacher") {
          navigate("/schedule");
        }
      }
    });
  };

  if (userRole !== "education department") {
    showAlert();
    return null;
  }
  return (
    <div className="bged">
      <div className="flex flex-1 flex-col">
        <div className="flex relative">
          <p className="flex font-family font-bold text-4xl size-30  text-midgreen h1text-shadow mt-10 ml-10">
            ผลการลงทะเบียน
          </p>
        </div>
        <div className="flex relative mt-5">
          <div className="flex flex-row flex-1 items-center">
            <p className="textinsert font-bold ml-10">ภาคเรียน</p>
            <div className="flex relative ml-5">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 150 }}
              >
                <option value="" disabled selected hidden>
                  ---
                </option>
                <option>ต้น</option>
                <option>ปลาย</option>
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
            <p className="textinsert font-bold ml-5">ปีการศึกษา</p>
            <div className="flex relative ml-5">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 150 }}
              >
                <option value="" disabled selected hidden>
                  ---
                </option>
                <option>2566</option>
                <option>2565</option>
                <option>2564</option>
                <option>2563</option>
                <option>2562</option>
                <option>2561</option>
                <option>2560</option>
                <option>2559</option>
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
            <div className="flex relative ml-5 mt-2">
              <button
                type="button"
                class="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                style={{
                  backgroundColor: "#134e4a",
                  width: 110,
                  height: 35,
                }}
              >
                <p className="text-lg mr-2">ค้นหา</p>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="mr-2"
                  style={{ fontSize: "18px" }}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-7 flex-col mt-10">
          <div className="flex -flex-4">
            <div className="flex flex-1 ml-10 mr-5 bg-slate-200 rounded-lg overflow-x-auto shadow-xl h-full overflow-y-auto">
              <table className=" w-full">
                <thead>
                  <tr className="column-color1 text-white">
                    <th className="py-2 font-light text-xl">#</th>
                    <th className="py-2 font-light text-xl">รหัสวิชา</th>
                    <th className="py-2 font-light text-xl">ชื่อวิชา</th>
                    <th className="py-2 font-light text-xl">หน่วยกิต</th>
                    <th className="py-2 font-light text-xl">หมู่เรียน</th>
                    <th className="py-2 font-light text-xl">อาจารย์ผู้สอน</th>
                    <th className="py-2 font-light text-xl">จำนวนนิสิต</th>
                    <th className="py-2 font-light text-xl">
                      สาขาชั้นปีที่เปิดรับ
                    </th>
                    <th className="py-2 font-light text-xl">วันที่สอน</th>
                    <th className="py-2 font-light text-xl">เวลาที่สอน</th>
                  </tr>
                </thead>

                <tbody>
                  <td className="py-2 font-light text-lg text-center">{"1"}</td>
                  <td className="py-2 font-light text-lg text-center">
                    {"03603423"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"Network Programming"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">{"3"}</td>
                  <td className="py-2 font-light text-lg text-center">
                    {"800"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"ยงเกียรติ แสวงสุข"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"1 คน"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"T-all"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"อังคาร"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"21.00-24.00"}
                  </td>
                </tbody>

                <tbody>
                  <td className="py-2 font-light text-lg text-center">{"2"}</td>
                  <td className="py-2 font-light text-lg text-center">
                    {"03603423"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"Network Programming"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">{"3"}</td>
                  <td className="py-2 font-light text-lg text-center">
                    {"801"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"ยงเกียรติ แสวงสุข"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"1 คน"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"T-all"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"เสาร์"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"21.00-24.00"}
                  </td>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-1 justify-center">
            <button>
              <FaCircleLeft size={21} color="#0a6765" className="mr-3 mt-8" />
            </button>
            <p className="text-lg font-semibold text-midgreen  mt-8">
              หน้า 1 จาก 1
            </p>
            <button>
              <FaCircleRight size={21} color="#0a6765" className="ml-3 mt-8" />
            </button>
          </div>

          <div className="flex felx-1 justify-end">
            <div className="flex relative ml-5 mt-5 mr-10">
              <button
                type="button"
                class="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                style={{
                  backgroundColor: "#134e4a",
                  width: 190,
                  height: 45,
                }}
              >
                <p className="text-lg mr-2">นำออกไฟล์ xlsx</p>
                <FontAwesomeIcon
                  icon={faFileDownload}
                  className=" ml-2"
                  style={{ fontSize: "20px" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegResultED;
