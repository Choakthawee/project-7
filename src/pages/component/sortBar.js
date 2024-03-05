import SearchingBar from "../component/searchBar";
import CourseYears from "../component/courseyear";
import Category_sub from "../component/category_sub";
import ButtonSeaching from "../component/buttonSearching";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiurl } from "../../config";
export default function SortBar({ setCurrent, url, type = 1, url1 }) {
    const [searching, setSearching] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [years, setYears] = useState("");
    const [subject_category, setSubject_category] = useState("");
    const [reset, setReset] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    useEffect(() => {
        if ((years || searchInput || subject_category) && !reset) {
            setReset(true)
        }
    }, [years, subject_category, searchInput])
    const resetSort = () => {
        if (isSearch) {
            window.location.reload();
        } else {
            setYears("")
            setSubject_category("")
            setSearchInput("")
            setReset(false)
        }
    }
    const OnSearching = async () => {
        setIsSearch(true)

        try {
            let queryString = apiurl + url1 + "?type=" + type;
            if (years !== "") {
                queryString += "&years=" + years;
            }
            if (searchInput !== "") {
                queryString += "&search=" + searchInput;
            }
            if (subject_category !== "") {
                queryString += "&category_id=" + subject_category;
            }
            console.log(queryString);
            const dataresponse = await axios.get(queryString);
            const data = dataresponse.data;
            console.log(queryString);
            setCurrent(data);
        } catch (err) {
            console.log(err);
        } finally {
            setSearching([]);
        }
    }
    return (
        <div className="flex gap-2 flex-col lg:flex-row">
            <SearchingBar searching={searching} setSearching={setSearching} searchInput={searchInput} setSearchInput={setSearchInput} url={url}></SearchingBar>
            <div className="flex flex-col gap-3 w-full md:flex-row">
                <CourseYears value={years} setYears={setYears} />
                <Category_sub value={subject_category} setSort={setSubject_category} />
                <ButtonSeaching onClick={() => { OnSearching(); }} />
                {reset === true && <div className=" flex items-end">
                    <button className=" bg-slate-500 rounded-lg text-white  mb-1" onClick={() => { resetSort() }}
                        style={{
                            backgroundColor: "#134e4a",
                            width: 110,
                            height: 35,
                        }}>Reset</button>
                </div>}
            </div>
        </div>
    );
}