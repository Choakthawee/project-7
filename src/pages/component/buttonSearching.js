import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ButtonSeaching({ onClick }) {
    return (
        <div className=" font-family items-end flex">
            <button
                type="button"
                className="flex items-center focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                style={{
                    backgroundColor: "#134e4a",
                    width: 110,
                    height: 35,
                }}
                onClick={onClick}
            >
                <p className="text-lg mr-2">ค้นหา</p>
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="mr-2"
                    style={{ fontSize: "18px" }}
                />
            </button>
        </div>
    );
}