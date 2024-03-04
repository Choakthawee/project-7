import SearchingBar from "../component/searchBar";
import CourseYears from "../component/courseyear";
import Category_sub from "../component/category_sub";
import ButtonSeaching from "../component/buttonSearching";
import { useEffect, useState } from "react";
export default function SortBar({ data,setCurrent, url }) {
    const [searchInput, setSearchInput] = useState('');
    const [years, setYears] = useState();
    const [subject_category, setSubject_category] = useState();
    const [reset, setReset] = useState(false);
    useEffect(() => {
        console.log(years, subject_category, searchInput);
        if ((years || searchInput || subject_category) && !reset) {
            setReset(true)
        }
    }, [years, subject_category, searchInput])
    const resetSort = () => {
        setYears("")
        setSubject_category("")
        setSearchInput("")
        setReset(false)
    }
    return (
        <div className="flex gap-2 flex-col lg:flex-row">
            <SearchingBar searchInput={searchInput} setSearchInput={setSearchInput} url={url}></SearchingBar>
            <div className="flex flex-col gap-3 w-full md:flex-row">
                <CourseYears value={years} setYears={setYears} />
                <Category_sub value={subject_category} setSort={setSubject_category} />
                <ButtonSeaching onClick={() => { alert("โง่") }} />
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