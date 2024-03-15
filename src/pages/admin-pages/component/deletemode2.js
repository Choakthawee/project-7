import axios from "axios";
import { apiurl } from "../../../config";
import Swal from "sweetalert2";
export default async function DeleteMode2(id,table,reload,foredeleteurl,deleteurl = '/api/setting/deleteall'){
    const email = await localStorage.getItem("email");
    try {
        const dataResponse = await axios.delete(apiurl + deleteurl + "?id=" + id + "&table=" + table+"&email="+email)
        const data = dataResponse.data;
        Swal.fire({ icon: "success", text: data.msg,preConfirm:()=>{
            if(reload){
                reload();
            }
        }})
    } catch (error) {
        if (error.response.data.msgerror) {
            if (foredeleteurl) {
                Swal.fire({
                    icon: "warning",
                    text: error.response.data.msgerror,
                    confirmButtonText: error.response.data.msgerrorsubmit,
                    showCancelButton: true,
                    preConfirm: async () => {
                        try {
                            const dataResponse = await axios.delete(apiurl + foredeleteurl + "/" + id)
                            const data = dataResponse.data;
                            Swal.fire({ icon: "success", text: data.msg})
                        } catch (error) {
                            if (error.response.data.msgerror) {

                                Swal.fire({
                                    icon: "error",
                                    text: error.response.data.msgerror
                                })
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    text: error.response.data.msgerrorDB
                                })
                            }

                        }
                    }
                })
            } else {
                Swal.fire({
                    icon: "warning",
                    text: error.response.data.msgerror,
                    confirmButtonText: error.response.data.msgerrorsubmit,
                })
            }

        } else {
            Swal.fire({
                icon: "error",
                text: error.response.data.msgerrorDB
            })
        }


    }

}