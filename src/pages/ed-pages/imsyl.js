//นำเข้าหลักสูตร (ฝ่ายการศึกษา)
import "./imsyl_set.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";

const ImportSyl = () => {
  return (
    <div class="flex-1  border-blue-500 border-4">
      <div className="backgroundimsyl h-screen flex-col">
        <div class="flex-7  border-red-500 border-4">
          <h1 class="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow mt-10 ml-10 ">
            นำเข้าหลักสูตร
          </h1>
        </div>
        <div class="flex-7 border-green-500 border-4 flex-row">
          <div class="flex-7 border-yellow-500 border-4 flex-row">
            <p className="textinsert font-bold ml-5">ภาคเรียน</p>
            <div className="flex relative ml-5">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 150 }}
              >
                <option value="" disabled selected hidden>
                  ---
                </option>
                <option>ต้น</option>
                <option>ปลาย</option>
              </select>
              <FontAwesomeIcon
                icon={faArrowAltCircleDown}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "12px",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImportSyl;
