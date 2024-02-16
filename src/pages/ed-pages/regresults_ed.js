import "./regresults_ed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
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
      <div className="ABox">
        <div className="BBox">
          <p className="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow mt-5 ml-5">
            ผลการลงทะเบียน
          </p>
        </div>
        <div className="CBox">
          <div className="inCBox">
            <p className="textinsert font-bold ml-5">ภาคเรียน</p>
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
          </div>
        </div>
        <div className="DBox">
          <div className="inDBox">
            <div className="flex flex-1 bg-slate-200 mt-10 rounded-lg overflow-x-auto shadow-xl">
              <table className="h-full w-full">
                <thead>
                  <tr className="column-color1 text-white">
                    <th className="py-2 font-light text-xl">#</th>
                    <th className="py-2 font-light text-xl">รหัสวิชา</th>
                    <th className="py-2 font-light text-xl">ชื่อวิชา</th>
                    <th className="py-2 font-light text-xl">หลักสูตร</th>
                    <th className="py-2 font-light text-xl">หน่วยกิต</th>
                    <th className="py-2 font-light text-xl">หมวดวิชา</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {currentUsers.map((user, index) => (
                  <tr
                    key={startIndex + index}
                    className={
                      (startIndex + index) % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }
                  > */}
                  <td className="py-2 font-light text-lg text-center">{"1"}</td>
                  <td className="py-2 font-light text-lg text-center">
                    {"03603423"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"Network Programming"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">
                    {"2566"}
                  </td>
                  <td className="py-2 font-light text-lg text-center">{"3"}</td>
                  <td className="py-2 font-light text-lg text-center">
                    {"เฉพาะเลือก"}
                  </td>
                  {/* </tr>
                ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegResultED;
