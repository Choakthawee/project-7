import React, { useState, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { HiUserAdd } from "react-icons/hi";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  useEffect(() => {
    axios.get("http://localhost:4133/api/user")
      .then(response => {
        setUsers(response.data.message);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:4133/api/admin/delete_user/${id}`)
      .then(response => {
        axios.get("http://localhost:4133/api/user")
          .then(response => {
            setUsers(response.data.message);
          })
          .catch(error => {
            console.error("Error fetching data: ", error);
          });
      })
      .catch(error => {
        console.error("Error deleting user: ", error);
      });
  };

  return (
    <div className="flex-col flex py-10 px-10 overflow-hidden bg-white flex-1" style={{ height: "100vh" }}>
      <div className="flex">
        <p className="text-4xl font-bold h1text-shadow text-midgreen">
          ข้อมูลผู้ใช้งาน
        </p>
      </div>

      <div className="flex flex-1 bg-slate-200 mt-10 rounded-lg overflow-x-auto shadow-xl">
        <table className="h-full w-full">
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
            {currentUsers.map((user, index) => (
              <tr key={startIndex + index} className={(startIndex + index) % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="py-2 font-light text-lg text-center">{startIndex + index + 1}</td>
                <td className="py-2 font-light text-lg text-center">{user.name}</td>
                <td className="py-2 font-light text-lg text-center">{user.email}</td>
                <td className="py-2 font-light text-lg text-center">{user.rolename}</td>
                <td className="py-2 font-light text-lg text-center">
                  <button className="text-red-600 py-1 px-2 rounded-md font-light" onClick={() => handleDeleteUser(user.id)}>
                    <RiDeleteBin5Fill size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-2 mt-10 justify-center">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <FaCircleLeft size={21} color="#0a6765" className="mr-1" />
        </button>
        <p className="text-lg font-semibold text-midgreen mx-4">
          หน้า {currentPage} จาก {totalPages}
        </p>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <FaCircleRight size={21} color="#0a6765" />
        </button>
      </div>

      <div className="mt-12 flex justify-end rounded-xl flex-2 max-[320px]:justify-center">
        <Link to="/insertuser">
          <button className="bg-midgreen rounded-2xl px-4 py-4 flex flex-row shadow-xl">
            <HiUserAdd size={30} color="white" />
            <p className="text-xl font-medium text-white rounded-2xl">
              เพิ่มผู้ใช้งาน
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
