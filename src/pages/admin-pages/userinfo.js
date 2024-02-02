//ข้อมูลผู้ใช้งาน (แอดมิน)
import React, { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { HiUserAdd } from "react-icons/hi";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";

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
    <div className="max-w-screen-xl mx-auto flex-col flex px-10">
      {/* หัวข้อ */}
      <div>
        <p className="text-4xl font-bold mb-4 h1text-shadow text-midgreen mt-20 flex-1">
          ข้อมูลผู้ใช้งาน
        </p>
      </div>
      {/* หัวข้อ */}

      {/* table */}
      <div className="bg-white overflow-x-auto shadow-md rounded-lg mt-12">
        <table className="min-w-full table-responsive">
          <thead>
            <tr className="column-color1 text-white">
              <th className="py-2 font-light text-xl">#</th>
              <th className="py-2 font-light text-xl">ชื่อ-นามสกุล</th>
              <th className="py-2 font-light text-xl">Email</th>
              <th className="py-2 font-light text-xl">สถานะ</th>
              <th className="py-2 font-light text-xl">แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {testUser.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
<<<<<<< HEAD
                <td className="py-2 font-light text-lg text-center">
                  {index + 1}
                </td>
                <td className="py-2 font-light text-lg text-center">
                  {user.name}
                </td>
                <td className="py-2 font-light text-lg text-center">
                  {user.email}
                </td>
                <td className="py-2 font-light text-lg text-center">
                  {user.status}
                </td>
                <td className="py-2 font-light text-lg text-center">
                  <button className=" text-red-600 py-1 px-2 rounded-md font-light">
                    <RiDeleteBin5Fill size={20} />
=======
                <td className="py-2 text-center font-light">{index + 1}</td>
                <td className="py-2 text-center font-light">{user.name}</td>
                <td className="py-2 text-center font-light">{user.email}</td>
                <td className="py-2 text-center font-light">{user.status}</td>
                <td className="py-2 text-center font-light">
                  <button className="py-1 px-2 rounded-md">
                    <MdDeleteForever size={20} color="red" />
>>>>>>> 40d558280e98809e1c9f42e8e7299f891398ef9b
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ลูกสร */}
      <div className="flex mt-10 justify-center">
        <button>
          <FaCircleLeft size={21} color="#0a6765" className="mr-1" />
        </button>
        <button>
          <FaCircleRight size={21} color="#0a6765" />
        </button>
      </div>
      {/* ลูกสร */}

      {/* ปุ่ม */}
<<<<<<< HEAD
      <div className="mt-12 flex justify-end rounded-xl">
        <button className="bg-midgreen rounded-2xl px-4 py-4 flex flex-row shadow-xl">
          <HiUserAdd size={30} color="white" />
          <p className="text-xl font-medium text-white rounded-2xl">
            เพิ่มผู้ใช้งาน
          </p>
        </button>
=======
      <div className="mt-14 button flex justify-end">
        <Link to="/insertuser">
          <button className="shadow-md bg-midgreen rounded-2xl flex flex-row px-4 py-4">
            <IoPersonAdd size={20} color="white" className="mr-2" />
            <p className="text-white">เพิ่มผู้ใช้งาน</p>
          </button>
        </Link>
>>>>>>> 40d558280e98809e1c9f42e8e7299f891398ef9b
      </div>
      {/* ปุ่ม */}
    </div>
  );
};

export default UserInfo;
