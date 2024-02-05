//หน้า login
import React from 'react';
import "./font.css";
const login = () => {
  return (
    //กรอบใหญ่
    <div
      style={{
        display: "flex",
        flex: 1,
        borderWidth: 2,
        borderColor: "red",
        height: "100vh",
        flexDirection: "column",
      }}
    > 
      <div
        style={{
          flex: 2,
          borderWidth: 2,
          borderColor: "blue",
          height: "50%",
          width: "100%",
          backgroundColor: '#0A6765',
        }}
      >
        <div style={{
          fontSize: '72px', // กำหนดขนาดข้อความเป็น 72px
          textAlign:"center",
          color: "white",
          marginTop: 20,
        }}>
          ระบบจัดตารางสอน
        </div>
        <div style={{ backgroundColor: "red" }}></div>
      </div>
      <div
        style={{
          display :"flex",
          flex:8,
          borderWidth: 2,
          borderColor: "yellow",
          backgroundImage: "url(https://scontent.fbkk23-1.fna.fbcdn.net/v/t1.15752-9/422817357_1346140809421766_9217746417310614836_n.png?_nc_cat=105&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHr5aDHQP19t40RtkKyjzmX2pSWlsCJIJTalJaWwIkglDBg2nBJtVJozWO5W4llGDNAIdzKCVNYtPIO8h8TCm9n&_nc_ohc=AbvN28-DlTcAX83Nx3b&_nc_pt=1&_nc_ht=scontent.fbkk23-1.fna&oh=03_AdS7r4MrHPTWmDCrqJ48S4TSRdSPdrzn6U1KpDC5I59E6Q&oe=65E713B2)",
          backgroundSize: "contain", // ให้รูปภาพย่อลง
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          flexDirection: "row",
          position:"relative",          
        }}
      >
        <div
        style={{
          flex: 1.4,
          borderWidth: 2,
          borderColor: "black",
        }}
        >
          <div
          style={{
            display:"flex",
            position:"relative",
            borderWidth:2,
            borderColor:"red",
            height:"40%",
            margin: 0,
            marginTop: 170,
            backgroundImage: "url(https://www.src.ku.ac.th/th/tp/img/Logo.png)",
            backgroundSize:"cover",
            backgroundPosition : "center",
            backgroundAttachment: "fixed",

          }}
          ></div>
        </div>
        <div
        style={{
          flex: 1,
          borderWidth: 2,
          borderColor: "pink",
        }}
        >
          <div 
          style={{
            flex: 1,
            borderWidth: 2,
            borderColor:"orange",
            height: "60%",
            marginTop:100,
            
          }}
          >
           
          <div
            style={{
              flex:1,
              borderWidth:2,
              borderColor:"purple",
              height: "30%",
              marginTop: 7,
            }}
            >
              <div className="font-style">
                Login
              </div>
              <div className="font-style2">
                Login
              </div>
              <div className="font-style3">
                Login
              </div>
            </div>
            <div
            style={{
              flex:1,
              borderWidth:2,
              borderColor:"brown",
              height: "40%",
              marginTop: 7,
            }}
            >
              <div
                style={{
                  position:"absolute",
                  width: '400px',
                  height: '235px',
                  backgroundColor: '#0A6765', 
                  borderRadius: '15px',
                  marginTop: -35,
                  marginLeft: 180,
                  zIndex: 2,
                }}
              >
              </div>
              <div
                style={{
                  position: "absolute",
                  width: '400px',
                  height: '235px',
                  backgroundColor: 'white', 
                  borderRadius: '15px',
                  marginTop: -50,
                  marginLeft: 195,
                  marginBottom: -200,
                  zIndex: 1,
                }}
              >
              </div>
            </div>
          </div>
        </div>
      </div>
       <div
        style={{
          display: "flex",
          flex: 1,
          borderWidth: 2,
          borderColor: "green",
          height: "50%",
          backgroundColor: '#0A6765',
        }}
      >
        <div style={{
          fontSize: '16px', 
          textAlign:"center",
          color: "white",
          lineHeight: '16px',
          marginTop: 35,
          marginLeft: 600,
        }}>
          ติดต่อผ่ายเทคนิค แจ้งเหตุขัดข้อง: โทร 064-590-6613 อาคารหอใน มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
        </div>
      </div>
    </div>
  );
};

export default login;