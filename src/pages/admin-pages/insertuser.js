//เพิ่มบัญชีผู้ใช้งาน (แอดมิน)

import "./insertuser.css";

const InsertUser = () => {
  return (
    <div>
      <div style={{ marginLeft: 50 }}>
        <h1 className="fontH1">เพิ่มผู้ใช้งาน</h1>
      </div>
      <div style={{ marginLeft: 50 }}>
        <p>
          ชื่่อ-นามสกุล<span style={{ color: "red" }}>*</span>
        </p>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Name"
          type="text"
          placeholder="กรุณากรอกชื่อ-นามสกุล"
        />
      </div>
      <div style={{ marginLeft: 50 }}>
        <p>
          Email<span style={{ color: "red" }}>*</span>
        </p>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="กรุณากรอก Email"
        />
      </div>
      <div style={{ marginLeft: 50 }}>
        <p>
          สถานะ<span style={{ color: "red" }}>*</span>
        </p>
        <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option>แอดมิน</option>
          <option>ฝ่ายการศึกษา</option>
          <option>อาจารย์</option>
        </select>
      </div>
      <div style={{ marginLeft: 50, marginTop: 10 }}>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          บันทึก
        </button>
      </div>
    </div>
  );
};
export default InsertUser;
