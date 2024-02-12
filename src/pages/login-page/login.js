//หน้า login
import React from "react";
import GoogleButton from "react-google-button";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

// import { GoogleLogin } from "react-google-login";
import "./login.css"; // import CSS file
import axios from "axios";
import { apiurl } from "../../config";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const loginGoogleAPI = async (email, urlpic) => {
    try {
      const responseData = await axios.get(
        apiurl + "/api/admin/user/single/" + email
      );
      await localStorage.setItem("email", responseData.data.email);
      await localStorage.setItem("name", responseData.data.name);
      await localStorage.setItem("role", responseData.data.role);
      console.log(responseData.data);
      if (responseData.data.id === 3) {
        navigate("/imcourse");
      } else if (responseData.data.id === 2) {
        navigate("/userinfo");
      } else if (responseData.data.id === 1) {
        navigate("/regcourse");
      }
    } catch (error) {
      console.error(error.response.data.error);
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
          <div className="invisible hidden md:visible md:grid col-span-1 items-center h-full">
            <img
              src="https://www.src.ku.ac.th/th/tp/img/Logo.png"
              alt="description_of_image"
              className="w-full p-5 ml-48"
            />
          </div>

          <div className="flex md:grid md:col-span-1 ">
            <div className="flex h-full items-center w-full">
              <div className="flex w-full justify-center h-full items-center">
                <div className="flex w-full justify-center z-40 -mt-6 md:-mt-28 mb-60 ">
                  <div className="font-style text-6xl md:text-8xl ">Login</div>
                  <div className="font-style2 text-6xl  md:text-8xl ">Login</div>
                  <div className="font-style3 text-6xl md:text-8xl">Login</div>
                </div>
                <div className="absolute w-3/4 h-1/4 min-h-36 md:w-1/4 min-w-32 md:h-1/6 md:min-h-48 bg-custom rounded-2xl z-20 flex items-center justify-center">
                  {/* <GoogleButton
                    onClick={() => {
                      loginGoogleAPI();
                    }}
                    style={{ backgroundColor: "white", color: "black" }}
                  /> */}
                  {/* <GoogleLogin
                    clientId="203314193027-hlk7l9b9oq486spq5uhcbcjm4ddchkff.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={loginGoogleAPI}
                    onFailure={loginGoogleAPI}
                    cookiePolicy={"single_host_origin"}
                  /> */}
                  <GoogleOAuthProvider clientId="203314193027-hlk7l9b9oq486spq5uhcbcjm4ddchkff.apps.googleusercontent.com">
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
                    />
                  </GoogleOAuthProvider>
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
