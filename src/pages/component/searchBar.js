import { useEffect, useState } from "react";
import SearchTab1 from "./SearchTab1";
import { apiurl } from "../../config";
import axios from "axios";

export default function SearchingBar({
  searchInput,
  title = "วิชา/รหัสวิชา",
  setSearchInput,
  url = "/api/Searchsubject/",
  searching,
  setSearching,
  placeholder = "โปรดระบุวิชาหรือรหัสวิชา",
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (searchInput && searching) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    const delaySearch = setTimeout(() => {
      const getapiSearch = async () => {
        try {
          const dataresponse = await axios.get(apiurl + url + searchInput);
          const data = dataresponse.data;
          setSearching(data.data);
        } catch (err) {
          setSearching({ msgerror: err.response.data.error });
        } finally {
          setLoading(false);
        }
      };
      if (searchInput && searching) {
        getapiSearch();
      }
    }, 800); // 500 milliseconds delay

    return () => clearTimeout(delaySearch);
  }, [searchInput]);
  return (
    <div className="flex gap-2 flex-col ">
      <label className="block text-sm font-medium text-gray-900 dark:text-black">
        {title}
      </label>
      <input
        type="search"
        className="peer bg-gray-50 md:min-w-64 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={searchInput}
        placeholder={placeholder}
        required
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      {searching && (
        <SearchTab1
          searching={searching}
          loading={loading}
          setSearchInput={setSearchInput}
          setSearching={setSearching}
        />
      )}
    </div>
  );
}
