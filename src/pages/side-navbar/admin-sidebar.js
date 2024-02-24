import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const userName = localStorage.getItem("name");
  const userRole = localStorage.getItem("role");

  const sidebarItems = {
    admin: [
      {
        path: "/userinfo",
        label: "บัญชีผู้ใช้",
        icon: <FaInfo size={20} className="max-[600px]:size-5" />,
      },
      {
        path: "/time-set",
        label: "ตั้งค่าระบบ",
        icon: <FaClock size={20} className="max-[600px]:size-5" />,
      },
    ],
    teacher: [
      {
        path: "/schedule",
        label: "ตารางสอน",
        icon: <FaChalkboard size={24} />,
      },
      {
        path: "/regcourse",
        label: "ลงทะเบียนรายวิชา",
        icon: <FaBook size={24} />,
      },
      {
        path: "/regresults_t",
        label: "ผลการลงทะเบียน",
        icon: <FaClipboard size={24} />,
      },
    ],
    education: [
      { path: "/imsyl", label: "นำเข้าหลักสูตร", icon: <FaList size={24} /> },
      {
        path: "/imcourse",
        label: "เลือกรายวิชาที่เปิดสอน",
        icon: <FaBook size={24} />,
      },
      {
        path: "/sub-open",
        label: "รายวิชาที่เปิดสอน",
        icon: <FaUnlockAlt size={24} />,
      },
      {
        path: "/regstatus",
        label: "ตรวจสอบการลงทะเบียน",
        icon: <FaUsers size={24} />,
      },
      {
        path: "/regresults_ed",
        label: "ผลการลงทะเบียน",
        icon: <FaClipboard size={24} />,
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
    } else if (userRole_id === "2") return "admin"; else if (userRole_id === "1") return "teacher";
   

    return null;
  };

  const role = getRole();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const logout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
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
        className={`column-color1 px-2 py-2 flex flex-1 flex-col transition-all ${isSidebarCollapsed ? "w-20" : "w-60"
          }`}
      >
        <div
          className={`sidebar-toggle items-center flex mb-10 justify-end cursor-pointer mt-2 mr-2 ${isSidebarCollapsed ? "justify-center -mr-0" : ""
            }`}
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
        >
          <span
            className={`transform transition-all ${isSidebarCollapsed ? "rotate-180" : ""
              }`}
          >
            <FaBars
              size={24}
              color="white"
              className={`transition-all ${isSidebarCollapsed ? "size-7 items-center" : ""
                }`}
            />
          </span>
        </div>

        <div
          className={`flex flex-2 flex-col justify-center items-center mb-3 transition-all ${isSidebarCollapsed ? "opacity-0 -mb-9" : ""
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
                    className={`transition-all flex flex-1 justify-center items-center text-sm mb-2 max-[600px]:text-base ${pathname.includes(item.path)
                      ? "text-white font-medium bg-gray-500 bg-opacity-20 rounded-md"
                      : "text-white font-medium hover:bg-gray-500 hover:bg-opacity-10 hover:text-gray-500 hover:rounded-md hover:font-semibold"
                      }`}
                    style={{ height: "70px" }}
                  >
                    {item.icon && (
                      <span
                        className={`items-center justify-center align-middle ${isSidebarCollapsed ? "" : "mr-2"
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
          className={`flex justify-end transition-all  mb-2 align-bottom ${isSidebarCollapsed ? "justify-center ml-2 " : "justify-center"
            }`}
        >
          <Link to={userRole ? "/" : "/"} onClick={logout}>
            <button
              type="button"
              className={`transition-all flex self-center focus:outline-none text-white bg-red-500 hover:bg-red-400  font-medium rounded-lg px-5 py-2.5 mb-2 ${isSidebarCollapsed ? "opacity-0" : ""}`}
              style={{
                width: 150,
                height: 45,
              }}
            >
              <p className="text-xl transition-all mr-3">LOGOUT</p>
              <FaSignOutAlt
                size={30}
                className={`fill-red-600 ${isSidebarCollapsed ? "" : ""}`}
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
