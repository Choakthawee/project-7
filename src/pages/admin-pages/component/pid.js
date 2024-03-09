import { useEffect, useState } from "react";
import { apiurl } from "../../../config";
import axios from "axios";

export default function PIDbox() {
    const [data, setData] = useState(Number);
    const [Errormsg, setErrormsg] = useState();
    const [reload, setreload] = useState(true);
    useEffect(() => {
        const getapi = async () => {
            try {

                const dataresponse = await axios.get(apiurl + "/pidprocess");
                const data = dataresponse.data;
                setData(data);
            } catch (err) {
                console.log(err);
                setErrormsg(err.response.data.msg);
            }
        }
        getapi();
    }, [reload])
    return (

        <div className="flex  p-2 items-center">
            {Errormsg ? Errormsg :
                <div className=" flex gap-4 items-center">
                    <div className="bg-slate-300 p-2 pl-5 pr-5   rounded-lg">
                        {data}
                    </div>
                    <div className=" cursor-pointer active:bg-slate-400 p-2 rounded-lg" onClick={() => setreload(!reload)}>
                        reload
                    </div>
                </div>
            }

        </div>
    );
}