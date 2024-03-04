import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
export default function HeaderSort_pre() {
    return (
        <div className="flex flex-1 flex-col md:flex-row md:items-center gap-5">
            <p className="textinsert font-bold">ภาคเรียน</p>
            <div className="flex relative">
                <select
                    className="block md:w-36 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"

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
            <p className="textinsert font-bold ">ปีการศึกษา</p>
            <div className="flex relative">
                <select
                    className="block md:w-36 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"

                >
                    <option value="" disabled selected hidden>
                        ---
                    </option>
                    {[...Array(10 + 1).keys()].map((index) => {
                        const year = new Date().getFullYear() + 544 - index;
                        return <option key={year}>{year}</option>;
                    })}
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
    )
}