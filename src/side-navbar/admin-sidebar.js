// Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
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
        icon: <FaInfo size={24} className="max-[600px]:size-3" />,
      },
      {
        path: "/time-set",
        label: "ตั้งค่าระบบ",
        icon: <FaClock size={24} className="max-[600px]:size-3" />,
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

  return (
    <div className="flex">
      <div className="column-color1 p-12  max-[600px]:p-8 flex flex-1 ">
        {role && (
          <nav style={{ width: "100%" }}>
            <ul>
              {sidebarItems[role].map((item) => (
                <li key={item.path} className="mb-2">
                  <Link
                    to={item.path}
                    className={` flex items-center text-2xl mb-10 w-full h-full max-[600px]:text-xl ${
                      pathname.includes(item.path)
                        ? "text-black font-normal"
                        : "text-white font-normal"
                    }`}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
