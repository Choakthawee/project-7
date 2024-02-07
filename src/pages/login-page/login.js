//หน้า login
import React from "react";
import "./font.css";
const login = () => {
  return (
    //กรอบใหญ่
    <div className="flex border border-red-600  w-full h-screen flex-col">
      <div className="border-2 border-blue-500 w-full bg-blue-800">
        <div className="text-4xl text-center text-white mt-5 p-5 md:text-6xl ">
          ระบบจัดตารางสอน
        </div>
        <div className="bg-red-500"></div>
      </div>
      <div
        className="grid md:grid-cols-7 h-3/4 border-2 border-yellow-500 bg-cover bg-fixed relative"
        style={{
          backgroundImage:
            "url('https://scontent.fbkk23-1.fna.fbcdn.net/v/t1.15752-9/422817357_1346140809421766_9217746417310614836_n.png?_nc_cat=105&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHr5aDHQP19t40RtkKyjzmX2pSWlsCJIJTalJaWwIkglDBg2nBJtVJozWO5W4llGDNAIdzKCVNYtPIO8h8TCm9n&_nc_ohc=AbvN28-DlTcAX83Nx3b&_nc_pt=1&_nc_ht=scontent.fbkk23-1.fna&oh=03_AdS7r4MrHPTWmDCrqJ48S4TSRdSPdrzn6U1KpDC5I59E6Q&oe=65E713B2')",
        }}
      >
        <div className="invisible hidden md:visible md:grid col-span-4 ">
          <div
            className="flex relative border-2 border-red-500 h-40 mt-0 md:mt-40 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                "url('https://www.src.ku.ac.th/th/tp/img/Logo.png')",
            }}
          ></div>
        </div>
        <div className="flex md:grid md:col-span-3 border-2 border-pink-500">
          <div className="flex border-2 border-brown-500 h-full items-center">
            <div className="flex border-2 border-orange-500 w-full ">
              <div className="border-2 flex border-purple-500 w-full justify-center z-40 -mt-20 ">
                <div className="font-style text-4xl md:text-6xl">Login</div>
                <div className="font-style2 text-4xl md:text-6xl">Login</div>
                <div className="font-style3 text-4xl md:text-6xl">Login</div>
              </div>
              <div className="absolute w-full  bg-blue-800 rounded-lg h-20 z-20 "></div>
              <div className="absolute w-full h-20 bg-white rounded-lg  z-0 -mt-3"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 border-2 border-green-500 h-1/2 bg-blue-800">
        <div className="text-white text-center text-lg leading-4 mt-9 ml-48">
          ติดต่อผ่ายเทคนิค แจ้งเหตุขัดข้อง: โทร 064-590-6613 อาคารหอใน
          มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
        </div>
      </div>
    </div>
  );
};

export default login;
