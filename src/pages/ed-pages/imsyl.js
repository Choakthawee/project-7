import "./imsyl_set.css";
import { faArrowRight, faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const ImportSyl = () => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  console.log(new Date().getFullYear() + 543);
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
    <div className="background">
      <div className="boxbig">
        <div className="boxsection">
          <p className="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow mt-10 ml-10">
            นำเข้าหลักสูตร
          </p>
        </div>
        <div className="boxyear_course">
          <p className="textinsert font-bold ml-10">หลักสูตร</p>
          <div className="flex relative ml-5">
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              style={{ width: 90, height: 35 }}
            >
              <option value="" disabled selected hidden>
                ---
              </option>

              {[...Array(10 + 1).keys()].map((index) => {
                const year = new Date().getFullYear() + 544 - index;
                return <option key={year}>{year}</option>;
              })}
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
        <div className="boximtoarrow">
          <div className="boximport">
            <div
              className=" flex items-center justify-center bg-gray-200 border-dashed border-gray-400 border-4 p-4 ml-10"
              style={{ width: 190, height: 50 }}
            >
              <span className="ml-6"> Import Excel Flile</span>
              <FontAwesomeIcon
                icon={faFileImport}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "54px",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  fontSize: "20px",
                }}
              />
            </div>
          </div>
          <div className="boxarrow">
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{
                position: "absolute",
                top: "50%",
                left: "-370px",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                fontSize: "20px",
              }}
            />
          </div>
        </div>
        <div className="boxbutton">
          <div className="flex relative ml-5 mt-5 mr-10">
            <button
              type="button"
              class="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
              style={{
                backgroundColor: "#134e4a",
                width: 77,
                height: 25,
              }}
            >
              <p className="text-mb mr-5">บันทึก</p>
            </button>
          </div>
        </div>
        <div className="boxtable">
          <div className="boxtable2 h-32 mr-96  ">
            <div className="flex flex-1 ml-5 mr-96 bg-slate-200 rounded-lg overflow-x-auto shadow-xl h-full overflow-y-auto ">
              <table className="w-full">
                <thead>
                  <tr className="column-color1 text-white">
                    <th className="py-2 font-light text-l ">หลักสูตร</th>
                    <th className="py-2 font-light text-l">ไฟล์</th>
                  </tr>
                </thead>

                <tbody>
                  <td className="py-2 font-light text-base text-center">
                    {"65"}
                  </td>
                  <td className="py-2 font-light text-base text-center">
                    {"course65.xlsx"}
                  </td>
                </tbody>

                <tbody>
                  <td className="py-2 font-light text-base text-center">
                    {"60"}
                  </td>
                  <td className="py-2 font-light text-base text-center">
                    {"course60.xlsx"}
                  </td>
                </tbody>
              </table>
            </div>
          </div>
          <div className="boxsuggestion">
            <p className="ml-5 text-sm mt-2">
              {" "}
              *คำแนะนำ : คลิกที่ไฟล์เพื่อดาวน์โหลด{" "}
              <FontAwesomeIcon icon={faFileImport} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImportSyl;
