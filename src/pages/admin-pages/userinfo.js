//ข้อมูลผู้ใช้งาน (แอดมิน)
import React, { useState } from "react";

const UserInfo = () => {
  const [testUser, setTestUser] = useState([
    {
      name: "ไก่กุ๊กกกก กุ๊กไก่",
      email: "kookkai@gmail.com",
      status: "อาจารย์ผู้สอน",
    },
    {
      name: "ไข่คลุก คลุกไข่",
      email: "cookkhai@gmail.com",
      status: "อาจารย์ผู้สอน",
    },
    {
      name: "ฮอนกฮูก ตาโต",
      email: "littleowl@gmail.com",
      status: "อาจารย์ผู้สอน",
    },
    {
      name: "หอหีบ ใส่ผ้า",
      email: "boxbox2@gmail.com",
      status: "ผู้ดูแลระบบ",
    },
  ]);

  return (
    <div className="max-w-screen-xl mx-auto flex-col flex">
      {/* หัวข้อ */}
      <div>
        <p className="text-4xl font-bold mb-4 h1text-shadow text-midgreen mt-20 flex-1">
          ข้อมูลผู้ใช้งาน
        </p>
      </div>
      {/* หัวข้อ */}

      {/* table */}
      <div className="bg-white overflow-hidden shadow-md rounded-lg mt-12 flex-1">
        <table className="min-w-full">
          <thead>
            <tr className="column-color1 text-white">
              <th className="py-2 font-medium">#</th>
              <th className="py-2 font-medium">ชื่อ-นามสกุล</th>
              <th className="py-2 font-medium">Email</th>
              <th className="py-2 font-medium">สถานะ</th>
              <th className="py-2 font-medium">แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {testUser.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 text-center font-light">{index + 1}</td>
                <td className="py-2 text-center font-light">{user.name}</td>
                <td className="py-2 text-center font-light">{user.email}</td>
                <td className="py-2 text-center font-light">{user.status}</td>
                <td className="py-2 text-center font-light">
                  <button className="bg-blue-500 text-white py-1 px-2 rounded-md font-light">
                    แก้ไข
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* หัวข้อ */}
      </div>

      {/* ปุ่ม */}
      <div className="mt-14 button">
        <button>เพิ่มผู้ใช้งาน</button>
      </div>
      {/* ปุ่ม */}
    </div>
  );
};
export default UserInfo;
