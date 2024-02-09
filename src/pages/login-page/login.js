//หน้า login
import React from "react";
import "./login.css"; // import CSS file
const login = () => {
  return (
    <div className="backgroundinsert">
      <div className="flex border border-red-600  w-full h-screen flex-col">
        <div className="border-2 border-blue-500 w-full bg-custom">
          <div className="text-5xl text-center text-white mt-5 p-5 md:text-7xl ">
            ระบบจัดตารางสอน
          </div>
          <div className="bg-red-500"></div>
        </div>
        <div className="grid md:grid-cols-7 h-3/4 border-2 border-yellow-500 bg-cover bg-fixed relative">
          <div className="invisible hidden md:visible md:grid col-span-3 ">
            <div className="flex relative border-2 border-red-500 h-44 w-full  ml-10 mt-0 md:mt-40  justify-center items-center ">
              <img
                src="https://www.src.ku.ac.th/th/tp/img/Logo.png"
                alt="description_of_image"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex md:grid md:col-span-4 border-2 border-pink-500">
            <div className="flex border-2 border-brown-500 h-full items-center">
              <div className="flex border-2 border-orange-500 w-full ">
                <div className="border-2 flex border-purple-500 w-full justify-center z-40 -mt-20 mb-60 ">
                  <div className="font-style text-2xl md:text-8xl mt-0 md:mt-5">
                    Login
                  </div>
                  <div className="font-style2 text-2xl md:text-8xl mt-0 md:mt-5">
                    Login
                  </div>
                  <div className="font-style3 text-2xl md:text-8xl mt-0 md:mt-5">
                    Login
                  </div>
                </div>
                <div className="absolute w-1/4 min-w-32 h-64 min-h-64 bg-custom rounded-2xl z-20 ml-56"></div>
                <div className="absolute w-1/4 min-w-32 h-64 min-h-64 bg-white rounded-2xl z-0 -mt-3 ml-64"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 border-blue-500 w-full bg-custom">
          <div className="text-white text-center text-lg leading-5 p-12">
            ติดต่อผ่ายเทคนิค แจ้งเหตุขัดข้อง: โทร 064-590-6613 อาคารหอใน
            มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
          </div>
        </div>
      </div>
    </div>
  );
};
export default login;
