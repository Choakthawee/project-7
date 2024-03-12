

export default function UrlboxIcon() {
    return (
        <div className=" overflow-x-auto shadow-2xl">
            <table className="border-separate w-full">
                <thead className="column-color1 text-white ">
                    <tr>
                        <th className="p-2 w-3/12">url</th>
                        <th className="p-2 w-3/12">name</th>
                        <th className="p-2 w-6/12">icon</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            /userinfo
                        </td>
                        <td>
                            ข้อมูลผู้ใช้งาน
                        </td>
                        <td>
                            <select>
                                <option>
                                    ---
                                </option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}