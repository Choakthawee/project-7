import "./regresults_ed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
const RegResultED = () => {
  return (
    <div className="bged">
      <div className="ABox">
        <div className="BBox">
          <p className="flex font-family font-bold text-4xl size-30 text-midgreen h1text-shadow mt-5 ml-5">
            ผลการลงทะเบียน
          </p>
        </div>
        <div className="CBox">
          <div className="inCBox">
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
            <p className="textinsert font-bold ml-5">ปีการศึกษา</p>
            <div className="flex relative ml-5">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                style={{ width: 150 }}
              >
                <option value="" disabled selected hidden>
                  ---
                </option>
                <option>2566</option>
                <option>2565</option>
                <option>2564</option>
                <option>2563</option>
                <option>2562</option>
                <option>2561</option>
                <option>2560</option>
                <option>2559</option>
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
        <div className="DBox"></div>
      </div>
    </div>
  );
};
export default RegResultED;
