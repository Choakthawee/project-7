// Sidebar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaClock,
  FaInfo,
  FaBook,
  FaEdit,
  FaList,
  FaChalkboard,
  FaRegEdit,
  FaClipboard,
  FaUsers,
  FaUnlockAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  // Define sidebar items for each role
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
      { path: "/imcourse", label: "นำเข้ารายวิชา", icon: <FaBook size={24} /> },
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

  // Determine the role based on the pathname
  const getRole = () => {
    if (
      pathname.includes("/insertuser") ||
      pathname.includes("/time-set") ||
      pathname.includes("/userinfo")
    ) {
      return "admin";
    } else if (
      pathname.includes("/regcourse") ||
      pathname.includes("/regcourse_edit") ||
      pathname.includes("/regresults_t") ||
      pathname.includes("/schedule") ||
      pathname.includes("/schedule_edit")
    ) {
      return "teacher";
    } else if (
      pathname.includes("/imcourse") ||
      pathname.includes("/imsyl") ||
      pathname.includes("/regresults_ed") ||
      pathname.includes("/regstatus") ||
      pathname.includes("/sub-open")
    ) {
      return "education";
    }

    return null;
  };

  const role = getRole();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

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
        className={`column-color1 px-2 py-2 flex flex-1 flex-col transition-all ${isSidebarCollapsed ? "w-20" : "w-60"}`}
      >

        <div
          className={`sidebar-toggle items-center flex mb-10 justify-end cursor-pointer mt-2 mr-2 ${isSidebarCollapsed ? "justify-center -mr-0" : ""}`}
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
        >
          <span
            className={`transform transition-all ${isSidebarCollapsed ? "rotate-180" : ""
              }`}
          >
            <FaBars size={24} color="white" className={`transition-all ${isSidebarCollapsed ? "size-7 items-center" : ""
              }`} />
          </span>
        </div>

        <div className={`flex flex-2 flex-col justify-center items-center mb-3 transition-all ${isSidebarCollapsed ? "opacity-0" : ""
          }`}>
          <FaUser size={40} color="white" className="mb-5" />
          <span className="text-xl text-white mb-5">สถานะ : </span>
          <span className="text-xl text-white mb-5">ชื่อ : </span>
        </div>

        {role && (
          <nav className="flex flex-1 justify-center">
            <ul className="flex flex-1 flex-col">
              {sidebarItems[role].map((item) => (
                <li key={item.path} className="mb-2">
                  <Link
                    to={item.path}
                    className={`transition-all flex flex-1 justify-center items-center text-2xl mb-2 max-[600px]:text-xl ${pathname.includes(item.path)
                      ? "text-white font-medium text-xl bg-gray-500 bg-opacity-20 rounded-md"
                      : "text-white font-medium text-xl hover:bg-gray-500 hover:bg-opacity-10 hover:text-gray-500 hover:rounded-md hover:font-semibold"
                      }`}
                    style={{ height: '70px' }}
                  >
                    {item.icon && (
                      <span
                        className={`items-center justify-center align-middle ${isSidebarCollapsed ? "" : "mr-2"}`}
                      >
                        {item.icon}
                      </span>
                    )}
                    {isSidebarCollapsed ? null : item.label}
                  </Link>
                </li>
              ))
              }
            </ul >
          </nav >
        )}

        <div className={`flex justify-end transition-all mr-2 mb-2 align-bottom ${isSidebarCollapsed ? "justify-center -mr-2" : ""}`}>
          <button>
            <FaSignOutAlt size={30} className={`fill-red-600 ${isSidebarCollapsed ? "" : ""}`} />
          </button>
        </div>

      </div >
    </div >
  );
};

export default Sidebar;
