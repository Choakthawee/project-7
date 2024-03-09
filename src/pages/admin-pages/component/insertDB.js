import axios from "axios";
import Swal from "sweetalert2";
import { apiurl } from "../../../config";

export default async function insertBox(title, table, url) {
    const getapi = async (id, name) => {
        try {
            const dataresponse = await axios.post(apiurl + url, { id: id, name: name, table: table });
            const data = dataresponse.data;
            Swal.fire({
                icon: "success",
                text: data.msg,
                showCancelButton: true,
                confirmButtonText: "หมุนเว็บ",
                preConfirm: () => {
                    window.location.reload();
                }
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error.response.data.msgerror
            })
        }
    }
    try{
        const { value: { input1: id, input2: name } } = await Swal.fire({
            title: 'เพิ่ม' + title,
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="id">' +
                `<input id="swal-input2" class="swal2-input" placeholder="${title}">`,
            focusConfirm: false,
            preConfirm: () => {
                    const input1 = Swal.getPopup().querySelector('#swal-input1').value;
                    const input2 = Swal.getPopup().querySelector('#swal-input2').value;
                    // Return an object with the input values
                    return { input1: input1, input2: input2 };
            }
        })
        if (id && name) {
            getapi(id, name)
        }
    }catch (err){
        console.log(err);
    }
    
}