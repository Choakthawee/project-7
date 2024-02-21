//แก้ไขรายวิชา หน้าตารางสอน (อาจารย์)
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
const RegResultTED = () => {
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
        } else if (userRole === "education department") {
          navigate("/imcourse");
        }
      }
    });
  };

  if (userRole !== "teacher") {
    showAlert();
    return null;
  }
  return (
    <div className="background">
      <div
        className="flex flex-1 w-screen h-screen"
        // style={{
        //   borderColor: "red",
        //   borderWidth: 5,
        // }}
      >
        <div
          className="flex flex-1 self-center bg-white w-2/3 h-4/5 ml-10 mr-10 rounded-3xl"
          //   style={{
          //     borderColor: "blue",
          //     borderWidth: 5,
          //   }}
        >
          <div className="flex">
            <div className="flex-1 border-2 border-blue-500">
              <div className="flex justify-end text-inbox">
                <Link
                  to="/userinfo"
                  className="mt-10 ml-10 mr-10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center "
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
            </div>
            <div className="flex-5 border-2 border-red-500">
              <div className="bg-white  px-8 pt-6 pb-8 mb-4">
                <div className="m-auto">
                  <h1 className="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow ">
                    แก้ไขรายวิชา
                  </h1>
                  <p className="text-gray-400 mt-3">
                    ชื่อรายวิชา<span style={{ color: "red" }}>*</span>
                  </p>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Name"
                    type="text"
                    placeholder="Network Programming"
                    style={{ width: 500 }}
                  />
                  <p className="text-gray-400 mt-3">รหัสวิชา :12311321321 </p>
                  <p className="text-gray-400">หน่วยกิต : 3 </p>
                  <p className="text-gray-400">หมวดวิชา : บังคับ</p>
                  <p className="text-green-500">เพิ่มหมู่เรียน</p>
                </div>
                <div className="mt-2"></div>
                <div className="m-auto mt-5 text-inbox">
                  <button
                    className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center text-inbox"
                    type="button"
                    style={{
                      backgroundColor: "#134e4a",
                      width: 110,
                      justifyContent: "center",
                    }}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegResultTED;
