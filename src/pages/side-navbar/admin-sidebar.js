import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaClock,
  FaInfo,
  FaBook,
  FaChalkboard,
  FaList,
  FaUnlockAlt,
  FaUsers,
  FaClipboard,
  FaSignOutAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { Settings } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const userName = localStorage.getItem("name");
  const userRole = localStorage.getItem("role");
  const listicon = [
    {icon:<FaInfo size={20} className="max-[600px]:size-5" />},
    {icon:<FaClock size={20} className="max-[600px]:size-5" />},
    {icon:<Settings size={20} className="max-[600px]:size-5" />},
    {icon:<FaChalkboard size={24} />},
    {icon:<FaBook size={24} />},
    {icon:<FaUnlockAlt size={24} />},
    {icon:<FaUsers size={24} />},
    {icon:<FaClipboard size={24} />},
    {icon: <FaList size={24} />}
]
  const sidebarItems = {
    admin: [
      {
        path: "/userinfo",
        label: "บัญชีผู้ใช้",
        icon: listicon[0].icon,
      },
      {
        path: "/time-set",
        label: "ตั้งค่าระบบ",
        icon: listicon[1].icon,
      },
      {
        path: "/table_edit",
        label: "ตั้งค่า Database",
        icon: listicon[2].icon,
      },
    ],
    teacher: [
      {
        path: "/schedule",
        label: "ตารางสอน",
        icon: listicon[3].icon,
      },
      {
        path: "/regcourse",
        label: "ลงทะเบียนรายวิชา",
        icon:  listicon[4].icon,
      },
      {
        path: "/regresults_t",
        label: "ผลการลงทะเบียน",
        icon: listicon[7].icon,
      },
    ],
    education: [
      { path: "/imsyl", label: "นำเข้าหลักสูตร",icon: listicon[8].icon,},
      {
        path: "/imcourse",
        label: "เลือกรายวิชาที่เปิดสอน",
        icon: listicon[4].icon,
      },
      {
        path: "/sub-open",
        label: "รายวิชาที่เปิดสอน",
        icon: listicon[5].icon,
      },
      {
        path: "/regstatus",
        label: "ตรวจสอบการลงทะเบียน",
        icon: listicon[6].icon,
      },
      {
        path: "/regresults_ed",
        label: "ผลการลงทะเบียน",
        icon: listicon[7].icon,
      },
    ],
  };

  const getRole = () => {
    const userRole = localStorage.getItem("role");
    const userRole_id = localStorage.getItem("role_id");
    // Check if the user role is valid
    if (userRole && sidebarItems[userRole]) {
      return userRole;
    } else if (userRole_id === "3") {
      return "education";
    } else if (userRole_id === "2") return "admin";
    else if (userRole_id === "1") return "teacher";

    return null;
  };

  const role = getRole();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const Nav = useNavigate();

  const logout = async () => {
    try {
      const result = await Swal.fire({
        title: "คุณจะออกจากระบบใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่",
      });

      if (result.isConfirmed) {
        await Swal.fire({
          title: "Logged Out!",
          text: "คุณออกจากระบบแล้ว",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        Nav("/");
        localStorage.clear();
      }
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`flex ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <div
        className={`column-color1 px-2 py-2 flex flex-1 flex-col transition-all ${
          isSidebarCollapsed ? "w-20" : "w-60"
        }`}
      >
        <div
          className={`sidebar-toggle items-center flex mb-10 justify-end cursor-pointer mt-2 mr-2 ${
            isSidebarCollapsed ? "justify-center -mr-0" : ""
          }`}
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
        >
          <span
            className={`transform transition-all ${
              isSidebarCollapsed ? "rotate-180" : ""
            }`}
          >
            <FaBars
              size={24}
              color="white"
              className={`transition-all ${
                isSidebarCollapsed ? "size-7 -ml-1 items-center" : ""
              }`}
            />
          </span>
        </div>

        <div
          className={`flex flex-2 flex-col justify-center items-center mb-3 transition-all ${
            isSidebarCollapsed ? "opacity-0 -mb-10" : ""
          }`}
        >
          <FaUser size={40} color="white" className="mb-5" />
          <span className="text-sm text-white mb-5">สถานะ : {userRole}</span>
          <span className="text-base text-white mb-5">ชื่อ : {userName}</span>
        </div>

        {role && (
          <nav className="flex flex-1 justify-center">
            <ul className="flex flex-1 flex-col">
              {sidebarItems[role].map((item) => (
                <li key={item.path} className="mb-2">
                  <Link
                    to={userRole ? item.path : "/"}
                    className={`transition-all flex flex-1 justify-center items-center text-sm mb-2 max-[600px]:text-base ${
                      pathname.includes(item.path)
                        ? "text-white font-medium bg-gray-500 bg-opacity-20 rounded-md"
                        : "text-white font-medium hover:bg-gray-500 hover:bg-opacity-10 hover:text-gray-500 hover:rounded-md hover:font-semibold"
                    }`}
                    style={{ height: "70px" }}
                  >
                    {item.icon && (
                      <span
                        className={`items-center justify-center align-middle ${
                          isSidebarCollapsed ? "" : "mr-2"
                        }`}
                      >
                        {item.icon}
                      </span>
                    )}
                    {isSidebarCollapsed ? null : item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div
          className={`flex flex-1 justify-center items-end transition-all align-bottom ${
            isSidebarCollapsed ? "justify-center" : "justify-center"
          }`}
        >
          <div className=" flex flex-col items-end">
            <button
              type="button"
              className={`transition-all flex self-center focus:outline-none text-white bg-red-500 hover:bg-red-400  font-medium rounded-lg px-5 py-2.5 mb-2 ${
                isSidebarCollapsed ? "" : ""
              }`}
              onClick={logout}
            >
              <p
                className={`text-xl transition-all mr-3 ${
                  isSidebarCollapsed ? "" : ""
                }`}
              >
                {isSidebarCollapsed ? "" : "LOGOUT"}
              </p>
              <FaSignOutAlt
                size={isSidebarCollapsed ? "20" : "30"}
                className={`fill-red-600 ${
                  isSidebarCollapsed ? "opacity-100 -ml-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
