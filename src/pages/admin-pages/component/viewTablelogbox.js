import axios from "axios";
import { useEffect, useState } from "react";
import { apiurl } from "../../../config";

export default function ViewTablelogbox({ geturl }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getapi = async () => {
            try {
                const dataresponse = await axios.get(apiurl + getapi);
                const data = dataresponse.data;
                setData(data)
            } catch (error) {
                console.log(error);
            }
        }

    }, [])
    return (
        <div className="flex">
            <div className="flex items-center w-full rounded-xl bg-gradient-to-r   from-emerald-300  to-emerald-900 ">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="p-2 text-center text-black">
                            <th className=" border rounded-[10px_0_0_0]  p-3">
                                <div className="">
                                    วันที่

                                    <div>
                                        มากไปน้อย
                                    </div>
                                </div>

                            </th>
                            <th className=" border rounded-[0_10px_0_0] p-3">
                                ข้อความ
                            </th>
                        </tr>

                    </thead>
                    <tbody className=" bg-gradient-to-tr from-emerald-100 to-emerald-400 border-[0]">
                        <tr className="">
                            <td className=" text-center">
                                sadsad
                            </td>
                            <td className="">
                                sadaspdijwoid
                            </td>
                        </tr>
                        <tr className="">
                            <td className=" text-center">
                                sadsad
                            </td>
                            <td className="">
                                sadaspdijwoid
                            </td>
                        </tr>
                        <tr className="">
                            <td className=" text-center">
                                sadsad
                            </td>
                            <td className="">
                                sadaspdijwoid
                            </td>
                        </tr>
                        <tr className="">
                            <td className=" text-center">
                                sadsad
                            </td>
                            <td className="">
                                sadaspdijwoid
                            </td>
                        </tr>
                        <tr className="">
                            <td className=" text-center">
                                sadsad
                            </td>
                            <td className="">
                                sadaspdijwoid
                            </td>
                        </tr>
                        <tr className="">
                            <td className=" text-center">
                                sadsad
                            </td>
                            <td className="">
                                sadaspdijwoid
                            </td>
                        </tr>
                        <tr className="">
                            <td className=" text-center">
                                sadsad
                            </td>
                            <td className="">
                                sadaspdijwoid
                            </td>
                        </tr>
                        <tr className="">
                            <td className=" text-center">
                                sadsad
                            </td>
                            <td className="">
                                sadaspdijwoid
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}