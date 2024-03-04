import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"
import { apiurl } from "../../config"
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons"

export default function Category_sub({ setSort }) {

    const [category, setCategory] = useState([{}])
    useEffect(() => {
        async function getapi() {
            try {
                const dataresponse = await axios.get(apiurl + "/api/subject_category");
                const data = dataresponse.data;
                setCategory(data)
            }catch (error){
                setCategory([{id:1,name:"บังคับ"},{id:2,name:"เลือก"},{id:3,name:"เอก"}])
            }
            
        }
        getapi();
    }, [])
    return (
        <div className="flex font-family font-medium flex-col">
            <div>
                <p className="text-sm font-medium mb-2">หมวดวิชา</p>
            </div>
            <div style={{ position: "relative" }}>
                <select
                    className="block appearance-none w-full  md:w-36 md:h-10 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue={""}
                >
                    <option value="" disabled hidden>
                        ---
                    </option>
                    {category.map((v,i)=>(
                        <option value={v.id}>{v.name}</option>
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
    )
}