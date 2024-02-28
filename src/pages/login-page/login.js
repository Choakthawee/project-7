//หน้า login
import React from "react";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";
// import { GoogleLogin } from "react-google-login";
import "./login.css";
import axios from "axios";
import { apiurl } from "../../config";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const loginGoogleAPI = async (email, urlpic) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    try {
      const responseData = await axios.get(
        apiurl + "/api/admin/user/single/" + email
      );
      await localStorage.setItem("userid", responseData.data.id);
      await localStorage.setItem("email", responseData.data.email);
      await localStorage.setItem("name", responseData.data.name);
      await localStorage.setItem("role", responseData.data.role);
      await localStorage.setItem("role_id", responseData.data.id);
      Swal.fire({
        title: "Login Successful",
        text: "ล็อคอินสำเร็จ",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      setTimeout(() => {
        if (responseData.data.id === 3) {
          navigate("/imcourse");
        } else if (responseData.data.id === 2) {
          navigate("/userinfo");
        } else if (responseData.data.id === 1) {
          navigate("/regcourse");
        }
      }, 2000);
    } catch (error) {
      console.error(error.response.data.error);

      Swal.fire({
        title: "Login Failed",
        text: "ไม่มีผู้ใช้งานนี้ในระบบ",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="backgroundinsert">
      <div className="flex  w-full h-screen flex-col">
        <div className=" w-full bg-custom">
          <div className="text-5xl text-center text-white mt-5 p-5 md:text-7xl ">
            ระบบจัดตารางสอน
          </div>
          <div className="bg-red-500"></div>
        </div>
        <div className="grid md:grid-cols-2 h-full border-2 bg-cover bg-fixed relative">
          <div className="invisible hidden md:visible md:grid col-span-1 items-center justify-center h-full">
            <img
              src="https://www.src.ku.ac.th/th/tp/img/Logo.png"
              className="pt-24 pb-24 pl-32 pr-0 sm:ml-2 lg:ml-5 xl:ml-22 2xl:ml-24 "
            />
          </div>

          <div className="flex md:grid md:col-span-1 ">
            <div className="flex h-full items-center w-full">
              <div className="flex w-full justify-center h-full items-center">
                <div className="flex w-full justify-center z-40 -mt-6 md:-mt-28 mb-60 ">
                  <div className="font-style text-6xl md:text-8xl ">Login</div>
                  <div className="font-style2 text-6xl  md:text-8xl ">
                    Login
                  </div>
                  <div className="font-style3 text-6xl md:text-8xl">Login</div>
                </div>
                <div className="absolute w-3/4 h-1/4 min-h-36 md:w-1/4 min-w-32 md:h-1/6 md:min-h-48 bg-custom rounded-2xl z-20 flex items-center justify-center ">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const credentialResponseDecoded = jwtDecode(
                        credentialResponse.credential
                      );
                      loginGoogleAPI(
                        credentialResponseDecoded.email,
                        credentialResponseDecoded.picture
                      );
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    size="large"
                    ux_mode="popup"
                    shape="pill"
                    width="250px"
                    logo_alignment="left"
                  />
                </div>

                <div className="absolute w-3/4 h-1/4 min-h-36 md:w-1/4 min-w-32 md:h-1/6 md:min-h-48 bg-white rounded-2xl z-0 -mt-3 ml-4"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-custom">
          <div className="text-white text-center text-lg leading-5 p-12">
            ติดต่อผ่ายเทคนิค แจ้งเหตุขัดข้อง: โทร 064-590-6613 อาคารหอใน
            มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
