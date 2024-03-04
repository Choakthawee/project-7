import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiurl } from "../../config";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";

export default function CourseYears({value, setYears }) {

    const [yearopen, setYearsopen] = useState([])
    useEffect(() => {
        async function getYears() {
            try {
                const dataresponse = await axios.get(apiurl + "/api/years")
                const data = dataresponse.data;
                setYearsopen(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getYears()
    }, [])
    return (
        <div className="flex font-family font-medium flex-col gap-2">
            <div>
                <p className="text-sm font-medium ">หลักสูตร</p>
            </div>
            <div style={{ position: "relative" }}>
                <select
                    className="block appearance-none w-full  md:w-36 md:h-10 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    value={value}
           
                    onChange={(e) => setYears(e.target.value)}
                >
                    <option value={""} >
                        ---
                    </option>
                    {yearopen.map((v, i) => (
                        <option key={i} value={v.years}>{v.years}</option>
                    ))}


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
    );
}